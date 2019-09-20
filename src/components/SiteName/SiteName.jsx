import React from 'react';
import { useTranslation } from 'react-i18next';

const SiteName = () => {
  const { t } = useTranslation();

  return (
    <div className="ecl-container ecl-u-pb-m ecl-u-type-xl ecl-u-type-bold">
      <span>{t('European')}</span>
      <span className="ecl-u-ml-2xs">{t("Citizens'")}</span>
      <span className="ecl-u-ml-2xs">{t('Initiative')}</span>
    </div>
  );
};

export default SiteName;
