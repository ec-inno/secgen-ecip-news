import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import ErrorMessage from '../ErrorMessage';
import useScript from '../../utils/useScript';
import { useI18nContext } from '../../context/I18n';
import config from './config';

const Share = () => {
  const { t } = useTranslation();
  const { locale } = useI18nContext();

  const [loaded, error] = useScript('//europa.eu/webtools/load.js');

  useEffect(() => {
    // Should be set manually on change of locale because smart loader can't figure.
    // Options page: https://webgate.ec.europa.eu/fpfis/wikis/display/webtools/Social+bookmarking+and+networking+-+Technical+details#Socialbookmarkingandnetworking-Technicaldetails-lang
    config.lang = locale;
  }, [locale]);

  if (error) {
    return (
      <ErrorMessage
        title={t('Share widget error')}
        error={{
          message: t('Loader script not found.'),
        }}
      />
    );
  }

  if (loaded)
    return (
      <>
        <h2 className="ecl-u-type-heading-2">{t('Share this page')}</h2>
        <div className="ecl-social-media-share">
          <script
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(config),
            }}
          />
        </div>
      </>
    );

  return '';
};

export default Share;
