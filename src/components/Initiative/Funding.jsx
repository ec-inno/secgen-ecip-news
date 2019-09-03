import React from 'react';
import PropTypes from 'prop-types';

import Document from './Document';

const Funding = ({ funding }) => {
  if (!funding) return '';

  return (
    <>
      <h2 className="ecl-u-type-heading-2">Sources of support and funding</h2>
      {funding.lastUpdate && (
        <p className="ecl-u-type-paragraph">
          Last update: {funding.lastUpdate}
        </p>
      )}

      <table className="eci-table ecl-u-type-paragraph">
        <tbody>
          <tr>
            <th>Name of sponsor</th>
            <th>
              Date<sup>[1]</sup>
            </th>
            <th>
              Amount in EUR<sup>[2]</sup>
            </th>
          </tr>
          {funding.sponsors
            ? funding.sponsors.map((sponsor, key) => {
                return (
                  <tr className={key % 2 === 1 ? 'dark-row' : ''} key={key}>
                    <td>{sponsor.name}</td>
                    <td>{sponsor.date}</td>
                    <td>{sponsor.amount}</td>
                  </tr>
                );
              })
            : ''}
        </tbody>
      </table>
      {funding.totalAmount && (
        <p className="ecl-u-type-paragraph ecl-u-type-bold">
          Total amount of support and funding: €{funding.totalAmount}
        </p>
      )}
      <p className="ecl-u-type-paragraph-s">
        [1] Date when the contribution was received. In case of in kind
        contributions, date when the in kind contribution started.
        <br />
        [2] Actual amount of funding provided or estimated value of in kind
        contribution.
      </p>
      {funding.document && (
        <p className="ecl-u-type-paragraph ecl-u-type-bold">
          Further information on support and funding:
          <Document file={funding.document} />
        </p>
      )}
    </>
  );
};

Funding.propTypes = {
  funding: PropTypes.shape({
    lastUpdate: PropTypes.string,
    totalAmount: PropTypes.number,
    sponsors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        date: PropTypes.string,
        amount: PropTypes.number,
      })
    ),
  }),
};

export default Funding;
