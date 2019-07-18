import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

// ECL native component.
import Footer from './Footer';

import getCurrentLanguage from '../../utils/getCurrentLanguage';

const FooterLanguage = ({ location }) => {
  const lang = getCurrentLanguage(location);

  const data = useStaticQuery(graphql`
    query Footer {
      allFile(filter: { relativeDirectory: { eq: "footer" } }) {
        edges {
          node {
            name
            childFooterJson {
              identity {
                title
                info {
                  variant
                  label
                  href
                }
              }
              sections {
                title
                items {
                  link {
                    variant
                    label
                    href
                  }
                  before
                }
              }
              common {
                label
                links {
                  variant
                  label
                  href
                }
              }
            }
          }
        }
      }
    }
  `);

  const languageData = data.allFile.edges.find(node => node.node.name === lang);
  const { childFooterJson } = languageData.node;
  return <Footer className="ecl-footer--custom" {...childFooterJson} />;
};

export default FooterLanguage;