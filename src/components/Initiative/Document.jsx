import React from 'react';
import PropTypes from 'prop-types';
import mime from 'mime';

import formatBytes from '../../utils/formatBytes';

import Icon from '../Icon';

const Document = ({ file }) => {
  const { GATSBY_INITIATIVES_API: api } = process.env;

  if (!file) return '';

  return (
    <div class="ecl-file" data-ecl-file>
      <div class="ecl-file__container">
        <Icon
          className="ecl-file__icon ecl-icon ecl-icon--2xl"
          shape="general--copy"
        />

        <div class="ecl-file__info">
          <div class="ecl-file__title">{file.name}</div>
          {file.mimeType && file.size && (
            <div class="ecl-file__meta">
              ({formatBytes(file.size)} -{' '}
              {mime.getExtension(file.mimeType).toUpperCase()})
            </div>
          )}
        </div>
        <a
          href={`${api}/register/document/${file.id}`}
          class="ecl-link ecl-link--standalone"
          download
        >
          <span class="ecl-link__label">Download</span>{' '}
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
