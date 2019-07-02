import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';

const HowTo = ({ data }) => {
  const { title, body } = data.file.childHowToJson;

  return (
    <>
      <SEO title={title} />

      <main>
        <div className="ecl-container">
          <div className="ecl-row ecl-u-mt-l">
            <div className="ecl-col-sm-12 ecl-col-md-12">
              <h1 className="ecl-u-type-heading-1">{title}</h1>
              <p className="ecl-u-type-paragraph-lead ecl-u-mv-none">{body}</p>
            </div>
          </div>
          <div className="ecl-u-mt-l">
            <div className="ecl-col-sm-12 ecl-col-md-12"></div>
          </div>
        </div>
      </main>
    </>
  );
};

export const query = graphql`
  query HowTo($locale: String) {
    file(name: { eq: $locale }, relativeDirectory: { eq: "how-to" }) {
      childHowToJson {
        title
        body
      }
    }
  }
`;

export default HowTo;
