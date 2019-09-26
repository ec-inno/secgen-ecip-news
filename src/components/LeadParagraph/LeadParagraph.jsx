import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import Counter from '../Counter';
import Video from '../Video';

const LeadParagraph = ({ text, label, href }) => (
  <div className="ecl-row ecl-u-mt-l">
    <div className="ecl-col-sm-12 ecl-col-md-8 ecl-u-mv-m">
      <p className="ecl-u-type-paragraph-lead ecl-u-mt-none">{text}</p>
      <Link className="ecl-u-type-xl ecl-link ecl-link--standalone" to={href}>
        {label}
      </Link>
      <Counter />
    </div>
    <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mv-m">
      <Video />
    </div>
  </div>
);

LeadParagraph.propTypes = {
  text: PropTypes.string,
  label: PropTypes.string,
  href: PropTypes.string,
};

LeadParagraph.defaultProps = {
  text: '',
  label: '',
  href: '',
};

export default LeadParagraph;
