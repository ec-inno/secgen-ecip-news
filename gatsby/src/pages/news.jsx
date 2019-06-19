import React from 'react';
import { graphql } from 'gatsby';

const News = ({ data }) => {
  const { title } = data.file.childNewsJson;

  return (
    <main>
      <section class="ecl-page-header">
        <div class="ecl-container">
          <div class="ecl-page-header__title-wrapper">
            <h1 class="ecl-page-header__title">{title}</h1>
            <p class="ecl-page-header__slogan ecl-u-type-paragraph ecl-u-mt-l">
              Access the latest news from ECI.
            </p>
          </div>
        </div>
      </section>

      <div class="ecl-container ecl-u-mt-xl">
        <div class="ecl-row ecl-u-mt-l">
          <div class="ecl-col-12 ecl-col-sm-3">
            <nav>
              <div class="ecl-u-color-grey-100 ecl-u-type-m ecl-u-pv-xs">
                PAGE CONTENTS
              </div>
              <ul class="ecl-unordered-list ecl-unordered-list--no-bullet ecl-u-pl-none ecl-u-mt-s">
                <li class="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m">
                  <a
                    href="#inline-nav-1"
                    class="ecl-link ecl-link--standalone ecl-u-d-block"
                  >
                    Launching European citizens’ initiatives just got easier
                  </a>
                </li>
                <li class="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m">
                  <a
                    href="#inline-nav-2"
                    class="ecl-link ecl-link--standalone ecl-u-d-block"
                  >
                    ECI Day 2019 focuses on digital democracy
                  </a>
                </li>
                <li class="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m">
                  <a
                    href="#inline-nav-3"
                    class="ecl-link ecl-link--standalone ecl-u-d-block"
                  >
                    Webinar 3: New rules for the European Citizens’ Initiative
                    as of 2020
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div class="ecl-col-12 ecl-col-sm-9">
            <h3 class="ecl-u-type-heading-3" id="inline-nav-1">
              Launching European citizens’ initiatives just got easier
            </h3>
            <p class="ecl-u-type-paragraph-s">09.05.2019</p>
            <p class="ecl-u-type-paragraph">
              The European Parliament and the Council adopted changes to the
              European Citizens’ Initiative on 17 April that will make it easier
              to launch such actions and gather signatures thanks to a new free,
              central online system. The updated rules – which take effect on 1
              January 2020 – also include more help for organisers, translation
              of initiatives into all EU languages within certain limits and
              more flexibility on starting dates.
            </p>
            <p class="ecl-u-type-paragraph">
              News source:{' '}
              <a href="http://ec.europa.eu/citizens-initiative/public/welcome">
                http://ec.europa.eu/citizens-initiative/public/welcome
              </a>
            </p>

            <h3 class="ecl-u-type-heading-3" id="inline-nav-2">
              ECI Day 2019 focuses on digital democracy
            </h3>
            <p class="ecl-u-type-paragraph-s">09.05.2019</p>
            <p class="ecl-u-type-paragraph">
              The European Parliament and the Council adopted changes to the
              European Citizens’ Initiative on 17 April that will make it easier
              to launch such actions and gather signatures thanks to a new free,
              central online system. The updated rules – which take effect on 1
              January 2020 – also include more help for organisers, translation
              of initiatives into all EU languages within certain limits and
              more flexibility on starting dates.
            </p>
            <p class="ecl-u-type-paragraph">
              News source:{' '}
              <a href="http://ec.europa.eu/citizens-initiative/public/welcome">
                http://ec.europa.eu/citizens-initiative/public/welcome
              </a>
            </p>

            <h3 class="ecl-u-type-heading-3" id="inline-nav-3">
              Webinar 3: New rules for the European Citizens’ Initiative as of
              2020
            </h3>
            <p class="ecl-u-type-paragraph-s">09.05.2019</p>
            <p class="ecl-u-type-paragraph">
              The European Parliament and the Council adopted changes to the
              European Citizens’ Initiative on 17 April that will make it easier
              to launch such actions and gather signatures thanks to a new free,
              central online system. The updated rules – which take effect on 1
              January 2020 – also include more help for organisers, translation
              of initiatives into all EU languages within certain limits and
              more flexibility on starting dates.
            </p>
            <p class="ecl-u-type-paragraph">
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
