import React from 'react';
import PropTypes from 'prop-types';

import upperCaseFirstChar from '@eci/utils/upperCaseFirstChar';
import { useLogoApi } from '@eci/utils/useLogoApi';

import Card from './Card';
import defaultImage from '../assets/images/default-image.png';

const CardImpl = ({
  title,
  status,
  logo,
  href,
  totalSupporters,
  supportLink,
}) => {
  if (logo && logo.id && logo.mimeType) {
    const { data } = useLogoApi(logo.id);

    return (
      <Card
        title={title}
        href={href}
        status={upperCaseFirstChar(status)}
        totalSupporters={totalSupporters}
        supportLink={supportLink}
        background={`data:${logo.mimeType};base64,${data}`}
      />
    );
  }

  return (
    <Card
      title={title}
      href={href}
      status={upperCaseFirstChar(status)}
      totalSupporters={totalSupporters}
      supportLink={supportLink}
      background={defaultImage}
    />
  );
};

CardImpl.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  status: PropTypes.string,
  totalSupporters: PropTypes.number,
  supportLink: PropTypes.string,
  logo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    mimeType: PropTypes.string,
    size: PropTypes.number,
  }),
};

export default CardImpl;
