import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import slugify from 'slugify';

import ForumBanner from '../components/ForumBanner';

const BasicPage = ({ data, location }) => {
  const { inpage_title } = data.file.childBasicpageJson;
  const { title, oe_summary, body } = data.nodeOePage;

  return (
    <>
      <main>
        <section className="ecl-page-header">
          <div className="ecl-container">
            <div className="ecl-page-header__title-wrapper">
              <h1 className="ecl-page-header__title">{title}</h1>
              <p class="ecl-page-header__slogan ecl-u-type-paragraph ecl-u-mt-l">
                <div
                  className="ecl-u-type-paragraph"
                  dangerouslySetInnerHTML={{
                    __html: oe_summary.processed,
                  }}
                />
              </p>
            </div>
          </div>
        </section>

        <div className="ecl-container ecl-u-mt-xl">
          <div className="ecl-row ecl-u-mt-l">
            <div className="ecl-col-12 ecl-col-sm-3">
              <nav>
                <div className="ecl-u-color-grey-100 ecl-u-type-m ecl-u-pv-xs">
                  {inpage_title}
                </div>
              </nav>
            </div>

            <div className="ecl-col-12 ecl-col-sm-9">
              <div
                className="ecl-u-type-paragraph"
                dangerouslySetInnerHTML={{
                  __html: body.processed,
                }}
              />
            </div>
          </div>
        </div>
      </main>
      <ForumBanner location={location} />
    </>
  );
};

export const query = graphql`
  query getBasicPage($locale: String!, $alias: String!) {
    file(name: { eq: $locale }, relativeDirectory: { eq: "basicpage" }) {
      childBasicpageJson {
        inpage_title
      }
    }
    nodeOePage(path: { alias: { eq: $alias }, langcode: { eq: $locale } }) {
      title
      oe_summary {
        processed
      }
      body {
        processed
      }
    }
  }
`;

export default BasicPage;
