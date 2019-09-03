import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Counter from '../components/Initiative/Counter';
import Video from '../components/Video';

const LeadParagraph = ({ intro, linkText, linkPath }) => (
  <div className="ecl-row ecl-u-mt-l">
    <div className="ecl-col-sm-12 ecl-col-md-8 ecl-u-mv-m">
      <p className="ecl-u-type-paragraph-lead ecl-u-mt-none">{intro}</p>
      <Link
        className="ecl-u-type-xl ecl-link ecl-link--standalone"
        to={linkPath}
      >
        {linkText}
      </Link>
      <Counter />
    </div>
    <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mv-m">
      <Video />
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
