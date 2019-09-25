import React from 'react';
import PropTypes from 'prop-types';

import File from '../File';

const FileSection = ({ title, file }) => {
  if (!file || Object.keys(file).length === 0) return '';

  return (
    <>
      {title && <h2 className="ecl-u-type-heading-2">{title}</h2>}
      <File file={file} />
    </>
  );
};

FileSection.propTypes = {
  title: PropTypes.string,
  file: PropTypes.shape(File.propTypes),
};

export default FileSection;
