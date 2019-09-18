import React from 'react';

import useScript from '../../utils/useScript';
import config from './config';

const Share = () => {
  const [loaded, error] = useScript('//europa.eu/webtools/load.js');

  if (error) {
    return (
      <p className="ecl-u-type-paragraph">{`Couldn't load share widget ${error}`}</p>
    );
  }

  if (loaded)
    return (
      <>
        <h2 className="ecl-u-type-heading-2">Share this page</h2>
        <div className="ecl-social-media-share">
          <script
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(config),
            }}
          />
        </div>
      </>
    );

  return '';
};

export default Share;
