/**
 * If this component gets cases of more than 1 language.
 * @see https://github.com/ec-europa/europa-component-library/blob/v2-dev/src/systems/ec/implementations/react/components/file/src/FileDownload.jsx
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import mime from 'mime';

import formatBytes from '../../utils/formatBytes';

import Icon from '../Icon';

const File = ({ file }) => {
  if (!file || Object.keys(file).length === 0) return '';

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
            className="ecl-icon--fluid ecl-link__icon"
            shape="ui--download"
          />
        </a>
      </div>
    </div>
  );
};

File.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string,
    mimeType: PropTypes.string,
    id: PropTypes.number,
    size: PropTypes.number,
  }),
};

export default File;
