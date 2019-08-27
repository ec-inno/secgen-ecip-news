import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';

import addSlugs from '../utils/addSlugs';
import getCurrentLanguage from '../utils/getCurrentLanguage';
import getDefaultLanguage from '../utils/getDefaultLanguage';

import SEO from '../components/SEO';

const BasicPage = ({ data, location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();

  const translation = require(`../../translations/basicpage/${language}.json`);
  const { title, oe_summary, body } = data.nodeOePage;

  const [bodyProcessed, setBody] = useState('');
  const [inpageItems, setInpageItems] = useState('');

  useEffect(() => {
    const processData = async () => {
      const processed = await addSlugs(body.processed);
      setBody(processed);

      const regex = new RegExp(/<h2[^>]*id=["'](.*?)["']>(.*?)<\/h2>/gi);
      const headings = processed.match(regex);
      // Global flag is wanted but the stateful nature of the regex - not.
      // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex
      regex.lastIndex = 0;
      const results = {};

      for (let item in headings) {
        const parts = regex.exec(headings[item]);
        regex.lastIndex = 0;

        // 1 is the id attribute value and 2 is the contents of the tag.
        results[parts[1]] = parts[2];
      }

      setInpageItems(results);
    };

    processData();
  }, []);

  return (
    <>
      <SEO title={title} />
      <main>
        <section className="ecl-page-header">
          <div className="ecl-container">
            <div className="ecl-page-header__title-wrapper">
              <h1 className="ecl-page-header__title">{title}</h1>
              <p className="ecl-page-header__slogan ecl-u-type-paragraph ecl-u-mt-l">
                <p
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
                  {translation.inpage_title}
                </div>
              </nav>
              <ul className="ecl-unordered-list ecl-unordered-list--no-bullet ecl-u-pl-none ecl-u-mt-s">
                {inpageItems &&
                  Object.keys(inpageItems).map((heading, key) => {
                    return (
                      <li
                        key={key}
                        className="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m"
                      >
                        <a
                          href={`#${heading}`}
                          className="ecl-link ecl-link--standalone ecl-u-d-block"
                        >
                          {inpageItems[heading]}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div className="ecl-col-12 ecl-col-sm-9">
              <p
                className="ecl-u-type-paragraph"
                dangerouslySetInnerHTML={{
                  __html: bodyProcessed,
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const query = graphql`
  query getBasicPage($locale: String!, $alias: String!) {
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
