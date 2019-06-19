import React from 'react';
import { graphql } from 'gatsby';

const News = ({ data }) => {
  const { title } = data.file.childNewsJson;

  return (
    <main>
      <section className="ecl-page-header">
        <div className="ecl-container">
          <div className="ecl-page-header__title-wrapper">
            <h1 className="ecl-page-header__title">{title}</h1>
            <p className="ecl-page-header__slogan ecl-u-type-paragraph ecl-u-mt-l">
              Access the latest news from ECI.
            </p>
          </div>
        </div>
      </section>

      <div className="ecl-container ecl-u-mt-xl">
        <div className="ecl-row ecl-u-mt-l">
          <div className="ecl-col-12 ecl-col-sm-3">
            <nav>
              <div className="ecl-u-color-grey-100 ecl-u-type-m ecl-u-pv-xs">
                PAGE CONTENTS
              </div>
              <ul className="ecl-unordered-list ecl-unordered-list--no-bullet ecl-u-pl-none ecl-u-mt-s">
                <li className="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m">
                  <a
                    href="#inline-nav-1"
                    className="ecl-link ecl-link--standalone ecl-u-d-block"
                  >
                    Launching European citizens’ initiatives just got easier
                  </a>
                </li>
                <li className="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m">
                  <a
                    href="#inline-nav-2"
                    className="ecl-link ecl-link--standalone ecl-u-d-block"
                  >
                    ECI Day 2019 focuses on digital democracy
                  </a>
                </li>
                <li className="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m">
                  <a
                    href="#inline-nav-3"
                    className="ecl-link ecl-link--standalone ecl-u-d-block"
                  >
                    Webinar 3: New rules for the European Citizens’ Initiative
                    as of 2020
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="ecl-col-12 ecl-col-sm-9">
            <h3 className="ecl-u-type-heading-3" id="inline-nav-1">
              Launching European citizens’ initiatives just got easier
            </h3>
            <p className="ecl-u-type-paragraph-s">09.05.2019</p>
            <p className="ecl-u-type-paragraph">
              The European Parliament and the Council adopted changes to the
              European Citizens’ Initiative on 17 April that will make it easier
              to launch such actions and gather signatures thanks to a new free,
              central online system. The updated rules – which take effect on 1
              January 2020 – also include more help for organisers, translation
              of initiatives into all EU languages within certain limits and
              more flexibility on starting dates.
            </p>
            <p className="ecl-u-type-paragraph">
              News source:{' '}
              <a href="http://ec.europa.eu/citizens-initiative/public/welcome">
                http://ec.europa.eu/citizens-initiative/public/welcome
              </a>
            </p>

            <h3 className="ecl-u-type-heading-3" id="inline-nav-2">
              ECI Day 2019 focuses on digital democracy
            </h3>
            <p className="ecl-u-type-paragraph-s">09.05.2019</p>
            <p className="ecl-u-type-paragraph">
              The European Parliament and the Council adopted changes to the
              European Citizens’ Initiative on 17 April that will make it easier
              to launch such actions and gather signatures thanks to a new free,
              central online system. The updated rules – which take effect on 1
              January 2020 – also include more help for organisers, translation
              of initiatives into all EU languages within certain limits and
              more flexibility on starting dates.
            </p>
            <p className="ecl-u-type-paragraph">
              News source:{' '}
              <a href="http://ec.europa.eu/citizens-initiative/public/welcome">
                http://ec.europa.eu/citizens-initiative/public/welcome
              </a>
            </p>

            <h3 className="ecl-u-type-heading-3" id="inline-nav-3">
              Webinar 3: New rules for the European Citizens’ Initiative as of
              2020
            </h3>
            <p className="ecl-u-type-paragraph-s">09.05.2019</p>
            <p className="ecl-u-type-paragraph">
              The European Parliament and the Council adopted changes to the
              European Citizens’ Initiative on 17 April that will make it easier
              to launch such actions and gather signatures thanks to a new free,
              central online system. The updated rules – which take effect on 1
              January 2020 – also include more help for organisers, translation
              of initiatives into all EU languages within certain limits and
              more flexibility on starting dates.
            </p>
            <p className="ecl-u-type-paragraph">
              News source:{' '}
              <a href="http://ec.europa.eu/citizens-initiative/public/welcome">
                http://ec.europa.eu/citizens-initiative/public/welcome
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export const query = graphql`
  query News($locale: String) {
    file(name: { eq: $locale }, relativeDirectory: { eq: "news" }) {
      childNewsJson {
        title
      }
    }
  }
`;

export default News;
