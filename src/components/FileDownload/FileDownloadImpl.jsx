import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import mime from 'mime';

import { useI18nContext } from '@eci/context/I18n';
import formatBytes from '@eci/utils/formatBytes';
import { useDocumentApi, getResource } from '@eci/utils/useDocumentApi';
import getLanguages from '@eci/utils/getLanguages';

import Link from '../Link/LinkGatsby';
import ErrorMessage from '../ErrorMessage';
import { FileDownload } from './FileDownload';

const FileDownloadImpl = ({ file }) => {
  if (!file || Object.keys(file).length === 0) return '';
  if (!file.id && (!file.otherLanguages || file.otherLanguages.length === 0))
    return '';

  const { location } = useI18nContext();
  const { t } = useTranslation();
  const langsT = getLanguages(t);

  const { otherLanguages, language: fileLanguage } = file;

  const langT = langsT.find(l => l.value === fileLanguage);
  const language = langT ? langT.label : '';

  const languages = otherLanguages
    ? otherLanguages.map(language => {
        let urlPath = '';
        let pathParts = [];

        const translation = langsT.find(l => l.value === language);

        pathParts = location.pathname.split('/').filter(p => p);

        pathParts.shift();

        urlPath = pathParts.join('/');
        urlPath = `/${translation.value}/${urlPath}/`;

        if (location.hash) {
          urlPath += location.hash;
        }

        // Link attributes for the component's spread.
        return { label: translation.label, href: urlPath };
      })
    : [];

  if (!file.id && languages.length) {
    return (
      <p className="ecl-u-type-paragraph">
        {t('Other languages available')}:{' '}
        {languages.map((attr, key) => [
          key > 0 && ', ',
          <Link {...attr} key={key} />,
        ])}
      </p>
    );
  }

  const { error } = useDocumentApi(file.id);
  const resource = getResource(file.id);

  let meta = '';

  const title = file.name ? file.name : '';

  if (file.size) {
    meta += formatBytes(file.size);
  }

  if (file.mimeType) {
    meta += ' - ';
    meta += mime.getExtension(file.mimeType).toUpperCase();
  }

  if (Object.keys(error).length !== 0) {
    return <ErrorMessage title={t('File service error')} error={error} />;
  }

  return (
    <FileDownload
      title={title}
      language={language}
      meta={meta}
      download={{ label: t('Download'), href: resource }}
      icon={{ shape: 'general--copy', size: '2xl' }}
    />
  );
};

FileDownloadImpl.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string,
    language: PropTypes.string,
    otherLanguages: PropTypes.arrayOf(PropTypes.string),
    mimeType: PropTypes.string,
    id: PropTypes.number,
    size: PropTypes.number,
  }),
};

export default FileDownloadImpl;
