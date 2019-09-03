import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const SoS = ({ submission }) => {
  if (!submission) return '';

  const { t } = useTranslation();

  return (
    <>
      <h2 className="ecl-u-type-heading-2">
        {t(
          'Number of statements of support collected as reported by the organisers'
        )}
      </h2>
      <table className="eci-table ecl-u-type-paragraph">
        <tbody>
          {submission.entry
            ? submission.entry.map((e, key) => {
                return (
                  <tr key={key}>
                    <td>{e.countryCodeType}</td>
                    <td>
                      {e.afterSubmission ? `${e.total}<sup>*</sup>` : e.total}
                    </td>
                  </tr>
                );
              })
            : ''}
          {submission.totalSignatures && (
            <tr className="ecl-u-type-bold">
              <td>{t('Total number of signatories')}</td>
              <td>{submission.totalSignatures}</td>
            </tr>
          )}
        </tbody>
      </table>
      <p className="ecl-u-type-paragraph-s">
        *{' '}
        {t(
          'Certificates received after the time of submission. Figures not included in the total number of signatories.'
        )}
      </p>
    </>
  );
};

SoS.propTypes = {
  submission: PropTypes.shape({
    totalSignatures: PropTypes.number,
    entry: PropTypes.arrayOf(
      PropTypes.shape({
        countryCodeType: PropTypes.string,
        total: PropTypes.number,
        afterSubmission: PropTypes.bool,
      })
    ),
  }),
};

export default SoS;
