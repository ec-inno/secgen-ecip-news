import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import getCurrentLanguage from '../utils/getCurrentLanguage';
import getDefaultLanguage from '../utils/getDefaultLanguage';

const TopMessage = ({ location }) => {
  if (!location) {
    const defaultLanguage = getDefaultLanguage();
    const data = require(`../data/topmessage/${defaultLanguage}.json`);
    const { message } = data;

    return (
      <div className="eci-menu" id="top">
        <div className="ecl-container">{message}</div>
      </div>
    );
  }

  const currentLanguage = getCurrentLanguage(location);

  const data = useStaticQuery(graphql`
    query TopMessage {
      allFile(filter: { relativeDirectory: { eq: "topmessage" } }) {
        edges {
          node {
            name
            childTopmessageJson {
              message
            }
          }
        }
      }
    }
  `);

  const languageData = data.allFile.edges.find(
    node => node.node.name === currentLanguage
  );

  const { childTopmessageJson } = languageData.node;
  const { message } = childTopmessageJson;

  return (
    <div className="eci-menu" id="top">
      <div className="ecl-container">{message}</div>
    </div>
  );
};

export default TopMessage;
