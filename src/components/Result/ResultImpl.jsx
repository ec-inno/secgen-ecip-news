import React from 'react';
import PropTypes from 'prop-types';

import { useLogoApi } from '@eci/utils/useLogoApi';

import defaultImage from '../assets/images/default-image.png';
import Result from './Result';

const ResultImpl = ({ title, href, status, pubRegNum, logo }) => {
  if (logo && logo.id && logo.mimeType) {
    const { data } = useLogoApi(logo.id);

    return (
      <Result
        title={title}
        href={href}
        status={status}
        pubRegNum={pubRegNum}
        background={`data:${logo.mimeType};base64,${data}`}
      />
    );
  }

  return (
    <Result
      title={title}
      href={href}
      status={status}
      pubRegNum={pubRegNum}
      background={defaultImage}
    />
  );
};

ResultImpl.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  status: PropTypes.string,
  pubRegNum: PropTypes.string,
  logo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    mimeType: PropTypes.string,
    size: PropTypes.number,
  }),
};

export default ResultImpl;
