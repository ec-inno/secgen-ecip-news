import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';

import addSlugs from '../utils/addSlugs';

import Head from '../components/Head';

const BasicPage = ({ data }) => {
  const { t } = useTranslation();

  const { title, oe_summary, body } = data.nodeOePage;

  const [bodyProcessed, setBody] = useState('');
  const [inpageItems, setInpageItems] = useState({});

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

  const hasHeadings = Object.keys(inpageItems).length !== 0;

  return (
    <>
      <Head title={title} />
      <main>
        <section className="ecl-page-header">
          <div className="ecl-container">
            <div className="ecl-page-header__title-wrapper">
              <h1 className="ecl-page-header__title">{title}</h1>
              <div
                className="ecl-page-header__slogan ecl-u-type-paragraph ecl-u-mt-l"
                dangerouslySetInnerHTML={{
                  __html: oe_summary.processed,
                }}
              />
            </div>
          </div>
        </section>

        <div className="ecl-container ecl-u-mt-xl">
          <div className="ecl-row ecl-u-mt-l">
            {hasHeadings && (
              <div className="ecl-col-12 ecl-col-sm-3">
                <nav>
                  <div className="ecl-u-color-grey-100 ecl-u-type-m ecl-u-pv-xs">
                    {t('Page contents').toUpperCase()}
                  </div>
                </nav>
                <ul className="ecl-unordered-list ecl-unordered-list--no-bullet ecl-u-pl-none ecl-u-mt-s">
                  {Object.keys(inpageItems).map((heading, key) => (
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
                  ))}
                </ul>
              </div>
            )}

            <div
              className={
                hasHeadings
                  ? 'ecl-col-12 ecl-col-sm-9'
                  : 'ecl-col-12 ecl-col-sm-12'
              }
            >
              <div
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
  query getBasicPage($langcode: String!, $alias: String!) {
    nodeOePage(path: { alias: { eq: $alias }, langcode: { eq: $langcode } }) {
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
