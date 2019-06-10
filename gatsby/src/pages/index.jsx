import React from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate, withPrefix } from 'gatsby';
import { getUserLangKey } from 'ptz-i18n';

// Homepage placeholder for `/` which redirects to default language.
// Inspired by https://github.com/mccrodp/gatsby-starter-contentful-i18n/blob/master/src/pages/index.js
const RedirectIndex = props => {
  // Skip build, Browsers only
  if (typeof window !== 'undefined') {
    const { langs, defaultLangKey } = props.data.site.siteMetadata.languages;
    const langKey = getUserLangKey(langs, defaultLangKey);
    const homeUrl = withPrefix(`/${langKey}/`);

    navigate(homeUrl);
  }

  // It's recommended to add your SEO solution in here for bots
  // eg. https://github.com/ahimsayogajp/ahimsayoga-gatsby/blob/master/src/pages/index.js#L22
  return <div />;
};

RedirectIndex.propTypes = {
  data: PropTypes.object,
};

export default RedirectIndex;

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
  }
`;
