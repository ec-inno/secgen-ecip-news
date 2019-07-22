import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import getCurrentLanguage from '../utils/getCurrentLanguage';

const SiteName = ({ location }) => {
  const currentLanguage = getCurrentLanguage(location);

  const data = useStaticQuery(graphql`
    query SiteName {
      allFile(filter: { relativeDirectory: { eq: "sitename" } }) {
        edges {
          node {
            name
            childSitenameJson {
              european
              citizens
              initiative
            }
          }
        }
      }
    }
  `);

  const languageData = data.allFile.edges.find(
    node => node.node.name === currentLanguage
  );

  const { childSitenameJson } = languageData.node;
  const { european, citizens, initiative } = childSitenameJson;

  return (
    <div className="ecl-container ecl-u-pb-m ecl-u-type-xl ecl-u-type-bold">
      <span>{european}</span>
      <span className="ecl-u-ml-2xs">{citizens}</span>
      <span className="ecl-u-ml-2xs">{initiative}</span>
    </div>
  );
};

export default SiteName;
