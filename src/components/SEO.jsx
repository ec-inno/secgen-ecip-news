import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import getTranslations from '../utils/getTranslations';

const SEO = ({ name, title, description, titleTemplate }) => {
  const translation = getTranslations('seo');

  const {
    name: nameDefault,
    title: defaultTitle,
    description: defaultDescription,
  } = translation;

  const seo = {
    name: name || nameDefault,
    title: title || defaultTitle,
    description: description || defaultDescription,
  };

  const template = titleTemplate || `%s | ${seo.name}`;

  return (
    <>
      <Helmet title={seo.title} titleTemplate={template}>
        <meta name="description" content={seo.description} />
        {seo.title && <meta property="og:title" content={seo.title} />}
        {seo.description && (
          <meta property="og:description" content={seo.description} />
        )}
        {seo.title && <meta name="twitter:title" content={seo.title} />}
        {seo.description && (
          <meta name="twitter:description" content={seo.description} />
        )}
      </Helmet>
    </>
  );
};

export default SEO;

SEO.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  titleTemplate: PropTypes.string,
};

SEO.defaultProps = {
  name: '',
  title: '',
  description: '',
  titleTemplate: '',
};
