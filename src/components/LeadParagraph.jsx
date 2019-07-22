import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Icon from '../components/Icon';

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
      <p className="ecl-u-type-paragraph ecl-u-mt-l ecl-u-d-flex ecl-u-justify-content-between">
        <span className="ecl-u-d-flex ecl-u-align-items-center">
          <Icon className="ecl-u-mr-xs" shape="general--file" />
          300 registration requests
        </span>
        <span className="ecl-u-d-flex ecl-u-align-items-center">
          <Icon className="ecl-u-mr-xs" shape="general--edit" />
          50 initiatives registered
        </span>
        <span className="ecl-u-d-flex ecl-u-align-items-center">
          <Icon className="ecl-u-mr-xs" shape="ui--check-filled" />4 successful
          initiatives
        </span>
      </p>
    </div>
    <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mv-m">
      <figure className="ecl-media-container">
        <img
          className="ecl-media-container__media"
          src="http://eci-mockups.surge.sh/media/video-image.png"
          alt="ECI video"
        />
        <figcaption className="ecl-media-container__caption">
          The European Citizens' Initiative in video.
        </figcaption>
      </figure>
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
