import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import getCountries from '@eci/utils/getCountries';

const SoSReport = ({ submission }) => {
  if (!submission) return '';

  const hasEntries = submission.entry && submission.entry.length !== 0;
  const hasTotalSignatures = Boolean(
    submission.totalSignatures && Number(submission.totalSignatures) > 1
  );

  if (!hasEntries && !hasTotalSignatures) return '';

  const { t } = useTranslation();
  const countries = getCountries(t);

  return (
    <>
      <h2 className="ecl-u-type-heading-2">
        {t(
          'Number of statements of support collected as reported by the organisers'
        )}
      </h2>
      <table className="eci-table ecl-u-type-paragraph">
        <tbody>
          {hasEntries &&
            submission.entry.map((e, key) => {
              const code = e.countryCodeType.toLowerCase();
              const country = countries[code] || code;

              return (
                <tr key={key}>
                  <td>{country}</td>
                  <td>
                    {e.afterSubmission ? `${e.total}<sup>*</sup>` : e.total}
                  </td>
                </tr>
              );
            })}
          {hasTotalSignatures && (
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

SoSReport.propTypes = {
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

export default SoSReport;
