import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Head = ({ name, title, description, titleTemplate, htmlAttributes }) => {
  const { t } = useTranslation();

  const nameDefault = t('Site name');
  const titleDefault = t("European citizens' initiative");
  const descriptionDefault = t(
    'This site is a participatory democracy instrument that allows citizens to suggest concrete legal changes in any field where the European Commission has power to propose legislation, such as the environment, agriculture, energy, transport or trade.'
  );

  const seo = {
    name: name || nameDefault,
    title: title || titleDefault,
    description: description || descriptionDefault,
    htmlAttributes: htmlAttributes || {},
  };

  const template = titleTemplate || `%s | ${seo.name}`;

  return (
    <>
      <Helmet
        title={seo.title}
        titleTemplate={template}
        htmlAttributes={seo.htmlAttributes}
      >
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

export default Head;

Head.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  titleTemplate: PropTypes.string,
  htmlAttributes: PropTypes.object,
};

Head.defaultProps = {
  name: '',
  title: '',
  description: '',
  titleTemplate: '',
  htmlAttributes: {},
};
