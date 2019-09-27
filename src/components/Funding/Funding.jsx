import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import FileDownload from '../FileDownload';

const Funding = ({ funding }) => {
  if (!funding) return '';

  const hasSponsors = funding.sponsors && funding.sponsors.length !== 0;
  const hasTotalAmount = Boolean(
    funding.totalAmount && Number(funding.totalAmount) !== 0
  );

  // Double-check if's worth showing this section.
  if (
    !funding.lastUpdate &&
    !funding.document &&
    !hasSponsors &&
    !hasTotalAmount
  ) {
    return '';
  }

  const { t } = useTranslation();

  return (
    <>
      <h2 className="ecl-u-type-heading-2">
        {t('Sources of support and funding')}
      </h2>
      {funding.lastUpdate && (
        <p className="ecl-u-type-paragraph">
          {t('Last update')}
          {': '}
          {funding.lastUpdate}
        </p>
      )}

      {hasSponsors && (
        <table className="eci-table ecl-u-type-paragraph">
          <tbody>
            <tr>
              <th>{t('Name of sponsor')}</th>
              <th>
                {t('Date')}
                <sup>[1]</sup>
              </th>
              <th>
                {t('Amount in EUR')}
                <sup>[2]</sup>
              </th>
            </tr>

            {funding.sponsors.map((sponsor, key) => (
              <tr className={key % 2 === 1 ? 'dark-row' : ''} key={key}>
                <td>{sponsor.name}</td>
                <td>{sponsor.date}</td>
                <td>{sponsor.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {hasTotalAmount && (
        <p className="ecl-u-type-paragraph ecl-u-type-bold">
          {t('Total amount of support and funding')}
          {': '}€{funding.totalAmount}
        </p>
      )}
      {hasSponsors && (
        <p className="ecl-u-type-paragraph-s">
          [1]{' '}
          {t(
            'Date when the contribution was received. In case of in kind contributions, date when the in kind contribution started.'
          )}
          <br />
          [2]{' '}
          {t(
            'Actual amount of funding provided or estimated value of in kind contribution.'
          )}
        </p>
      )}
      {funding.document && (
        <p className="ecl-u-type-paragraph ecl-u-type-bold">
          {t('Further information on support and funding')}:
          <FileDownload file={funding.document} />
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
