import React from 'react';
import { useTranslation } from 'react-i18next';

const TopMessage = () => {
  const { t } = useTranslation();

  return (
    <div className="eci-menu" id="top">
      <div className="ecl-container">
        {t('An official website of the European union')}
      </div>
    </div>
  );
};

export default TopMessage;
