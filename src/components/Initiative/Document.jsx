import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import mime from 'mime';

import formatBytes from '../../utils/formatBytes';

import Icon from '../Icon';

const Document = ({ file }) => {
  if (!file) return '';

  const { t } = useTranslation();
  const { GATSBY_INITIATIVES_API: api } = process.env;

  return (
    <div className="ecl-file" data-ecl-file>
      <div className="ecl-file__container">
        <Icon
          className="ecl-file__icon ecl-icon ecl-icon--2xl"
          shape="general--copy"
        />

        <div className="ecl-file__info">
          <div className="ecl-file__title">{file.name}</div>
          {file.mimeType && file.size && (
            <div className="ecl-file__meta">
              ({formatBytes(file.size)} -{' '}
              {mime.getExtension(file.mimeType).toUpperCase()})
            </div>
          )}
        </div>
        <a
          href={`${api}/register/document/${file.id}`}
          className="ecl-link ecl-link--standalone"
          download
        >
          <span className="ecl-link__label">{t('Download')}</span>{' '}
          <Icon
            className="ecl-icon ecl-icon--fluid ecl-link__icon"
            shape="ui--download"
          />
        </a>
      </div>
    </div>
  );
};

Document.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string,
    mimeType: PropTypes.string,
    id: PropTypes.number,
    size: PropTypes.number,
  }),
};

export default Document;
