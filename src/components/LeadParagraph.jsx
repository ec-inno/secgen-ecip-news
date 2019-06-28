import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const LeadParagraph = ({ intro, linkText, linkPath }) => (
  <div className="ecl-row ecl-u-mt-l">
    <div className="ecl-col-sm-12 ecl-col-md-12 ecl-u-mv-m">
      <p className="ecl-u-type-paragraph-lead">{intro}</p>
      <Link
        className="ecl-u-type-xl ecl-link ecl-link--standalone"
        to={linkPath}
      >
        {linkText}
      </Link>
    </div>
  </div>
);

LeadParagraph.propTypes = {
  intro: PropTypes.string,
  linkText: PropTypes.string,
  linkPath: PropTypes.string,
};

LeadParagraph.defaultProps = {
  intro: '',
  linkText: '',
  linkPath: '',
};

export default LeadParagraph;
