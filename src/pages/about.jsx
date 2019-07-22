import React from 'react';
import { graphql } from 'gatsby';
import slugify from 'slugify';

import SEO from '../components/SEO';
import ForumBanner from '../components/ForumBanner';

const About = ({ data, location }) => {
  const { title, intro, inpage_title, items } = data.file.childAboutJson;

  const links = items.map(item => ({
    title: item.title,
    href: slugify(item.title, {
      lower: true,
    }),
  }));

  return (
    <>
      <SEO title={title} />

      <main>
        <section className="ecl-page-header">
          <div className="ecl-container">
            <div className="ecl-page-header__title-wrapper">
              <h1 className="ecl-page-header__title">{title}</h1>
              <p className="ecl-page-header__slogan ecl-u-type-paragraph ecl-u-mt-l">
                {intro}
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
                {links.length ? (
                  <ul className="ecl-unordered-list ecl-unordered-list--no-bullet ecl-u-pl-none ecl-u-mt-s">
                    {links.map((link, key) => (
                      <li
                        key={key}
                        className="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m"
                      >
                        <a
                          href={`#${link.href}`}
                          className="ecl-link ecl-link--standalone ecl-u-d-block"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ''
                )}
              </nav>
            </div>

            <div className="ecl-col-12 ecl-col-sm-9">
              {items.length ? (
                <>
                  {items.map((item, itemKey) => {
                    const html = [];

                    html.push(
                      <h2
                        key={`t-${itemKey}`}
                        className="ecl-u-type-heading-2 ecl-u-mt-none"
                        id={slugify(item.title, { lower: true })}
                      >
                        {item.title}
                      </h2>
                    );

                    if (item.media && item.media.length) {
                      item.media.forEach((mediaItem, mediaKey) => {
                        const { src, alt, caption } = mediaItem;

                        html.push(
                          <div key={`r-${mediaKey}`} className="ecl-row">
                            <div className="ecl-col-12 ecl-col-sm-8">
                              <figure className="ecl-media-container">
                                <img
                                  className="ecl-media-container__media"
                                  src={src}
                                  alt={alt}
                                />
                                <figcaption className="ecl-media-container__caption">
                                  {caption}
                                </figcaption>
                              </figure>
                            </div>
                          </div>
                        );
                      });
                    }

                    if (item.body) {
                      html.push(
                        <div
                          key={`p-${itemKey}`}
                          className="ecl-paragraph"
                          dangerouslySetInnerHTML={{
                            __html: item.body,
                          }}
                        />
                      );
                    }

                    if (item.wrapper) {
                      return (
                        <div key={`w-${itemKey}`} className={item.wrapper}>
                          {html}
                        </div>
                      );
                    }
                    return html;
                  })}
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </main>
      <ForumBanner location={location} />
    </>
  );
};

export const query = graphql`
  query About($locale: String) {
    file(name: { eq: $locale }, relativeDirectory: { eq: "about" }) {
      childAboutJson {
        title
        intro
        inpage_title
        items {
          title
          media {
            src
            alt
            caption
          }
          body
          wrapper
        }
      }
    }
  }
`;

export default About;
