import React from 'react';
import { useTranslation } from 'react-i18next';

// Generic
import SEO from '../components/SEO';
import SearchAdvanced from '../components/Initiative/Search/Advanced';

const FindInitiative = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO title={t('Find initiative')} />
      <section className="ecl-page-header">
        <div className="ecl-container">
          <div className="ecl-page-header__title-wrapper">
            <h1 className="ecl-page-header__title">{t('Search')}</h1>
          </div>
        </div>
      </section>
      <main className="ecl-u-pv-3xl">
        <SearchAdvanced />
      </main>
    </>
  );
};

export default FindInitiative;
