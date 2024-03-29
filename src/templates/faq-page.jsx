import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { graphql } from 'gatsby';
import slugify from 'slugify';

import Head from '../components/Head';
import Accordion2 from '../components/Accordion/Accordion2';
import Accordion2Item from '../components/Accordion/Accordion2Item';

const FaqPage = ({ data }) => {
  const { t } = useTranslation();

  const { edges: faqSections } = data.allNodeFaqSection;

  const toggleItem = id => {
    document.getElementById(`${id}-content`).toggleAttribute('hidden');
  };
  const hasFaqs = Object.keys(faqSections).length !== 0;

  return (
    <>
      <Head title={t('FAQ')} description={t('FAQ intro')} />
      <main>
        <section className="ecl-page-header">
          <div className="ecl-container">
            <div className="ecl-page-header__title-wrapper">
              <h1 className="ecl-page-header__title">{t('FAQ')}</h1>
              <p className="ecl-page-header__slogan ecl-u-type-paragraph ecl-u-mt-l">
                {t('FAQ intro')}
              </p>
            </div>
          </div>
        </section>

        <div className="ecl-container ecl-u-mt-xl">
          <div className="ecl-row ecl-u-mt-l">
            {hasFaqs && (
              <>
                <div className="ecl-col-12 ecl-col-sm-3">
                  <nav>
                    <div className="ecl-u-color-grey-100 ecl-u-type-m ecl-u-pv-xs">
                      {t('Page contents').toUpperCase()}
                    </div>
                    <ul className="ecl-unordered-list ecl-unordered-list--no-bullet ecl-u-pl-none ecl-u-mt-s">
                      {faqSections.map((item, i) => {
                        const { node } = item;
                        const { title } = node;

                        return (
                          <li
                            key={i}
                            className="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m"
                          >
                            <a
                              href={`#${slugify(title, { lower: true })}`}
                              className="ecl-link ecl-link--standalone ecl-u-d-block"
                            >
                              {title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>
                <div className="ecl-col-12 ecl-col-sm-9">
                  {faqSections.map((faqSection, sectionIndex) => {
                    return (
                      <Fragment key={sectionIndex}>
                        <h2
                          className={`ecl-u-type-heading-2 ${
                            sectionIndex === 0 ? 'ecl-u-mt-none' : ''
                          }`}
                          id={`${slugify(faqSection.node.title, {
                            lower: true,
                          })}`}
                        >
                          {faqSection.node.title}
                        </h2>
                        <Accordion2>
                          {faqSection.node.relationships.field_faq_entries.map(
                            (faqSectionItem, sectionItemIndex) => {
                              return (
                                <Accordion2Item
                                  key={sectionItemIndex}
                                  id={`faq-item-${sectionIndex}-${sectionItemIndex}`}
                                  level={1}
                                  toggle={{
                                    label: faqSectionItem.title,
                                    iconShape: 'ui--plus',
                                  }}
                                  onClick={() =>
                                    toggleItem(
                                      `faq-item-${sectionIndex}-${sectionItemIndex}`
                                    )
                                  }
                                >
                                  <span
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        faqSectionItem.field_answer.processed,
                                    }}
                                  />
                                </Accordion2Item>
                              );
                            }
                          )}
                        </Accordion2>
                      </Fragment>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export const query = graphql`
  query getFaqPage($locale: String!, $languageRegex: String!) {
    allNodeFaqSection(
      filter: { id: { regex: $languageRegex }, langcode: { eq: $locale } }
    ) {
      edges {
        node {
          title
          relationships {
            field_faq_entries {
              title
              field_answer {
                processed
              }
            }
          }
        }
      }
    }
  }
`;

export default FaqPage;
