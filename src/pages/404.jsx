import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'gatsby';

import SEO from '../components/SEO';

const NotFound = ({ pageContext: { locale } }) => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        title={t('Page not found title')}
        description={t('Page not found description')}
      />

      <main>
        <div className="ecl-container">
          <div className="ecl-row ecl-u-mt-l">
            <div className="ecl-col-sm-12 ecl-col-md-12">
              <h1 className="ecl-u-type-heading-1">
                {t('Page not found title')}
              </h1>
              <p className="ecl-u-type-paragraph">
                {t('There is nothing here.')}{' '}
                <Link to={`/${locale}`}>{t('Go home')}</Link>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
