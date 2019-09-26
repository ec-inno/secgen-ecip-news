import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import mime from 'mime';

import formatBytes from '@eci/utils/formatBytes';
import { useDocumentApi, getResource } from '@eci/utils/useDocumentApi';

import ErrorMessage from '../ErrorMessage';
import { FileDownload } from './FileDownload';

const FileDownloadImpl = ({ file }) => {
  if (!file || Object.keys(file).length === 0) return '';
  if (!file.id) return '';

  const { t } = useTranslation();
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
      language=""
      meta={meta}
      download={{ label: t('Download'), href: resource }}
      icon={{ shape: 'general--copy', size: '2xl' }}
    />
  );
};

FileDownloadImpl.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string,
    mimeType: PropTypes.string,
    id: PropTypes.number,
    size: PropTypes.number,
  }),
};

export default FileDownloadImpl;
