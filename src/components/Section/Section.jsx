import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ title, children }) => {
  if (!children) return '';

  return (
    <>
      {title && <h2 className="ecl-u-type-heading-2">{title}</h2>}
      {children}
    </>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};

export default Section;
