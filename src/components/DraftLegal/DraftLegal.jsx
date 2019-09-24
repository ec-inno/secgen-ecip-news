import React from 'react';
import { useTranslation } from 'react-i18next';

import File from '../File';

const DraftLegal = ({ file }) => {
  if (!file || Object.keys(file).length === 0) return '';

  const { t } = useTranslation();

  return (
    <>
      <h2 className="ecl-u-type-heading-2">{t('Draft legal act')}</h2>
      <File file={file} />
    </>
  );
};

export default DraftLegal;
