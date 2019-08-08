import React from 'react';
import { Link } from 'gatsby';

import getCurrentLanguage from '../utils/getCurrentLanguage';

import SEO from '../components/SEO';

// Update title and body to use dynamic content coming from Drupal's menu.
const Sitemap = ({ location }) => {
  const currentLanguage = getCurrentLanguage(location);

  return (
    <>
      <SEO title="Sitemap" location={location} />

      <main>
        <div className="ecl-container">
          <div className="ecl-row ecl-u-mt-l">
            <div className="ecl-col-sm-12 ecl-col-md-12">
              <h1 className="ecl-u-type-heading-1">Sitemap</h1>
              <ul class="ecl-unordered-list">
                <li class="ecl-unordered-list__item">
                  <Link
                    to={`/${currentLanguage}/`}
                    className="ecl-link ecl-link--standalone"
                  >
                    Home
                  </Link>
                </li>
                <li class="ecl-unordered-list__item">
                  <Link
                    to={`/${currentLanguage}/news`}
                    className="ecl-link ecl-link--standalone"
                  >
                    News
                  </Link>
                </li>
                <li class="ecl-unordered-list__item">
                  <Link
                    to={`/${currentLanguage}/how-to-start`}
                    className="ecl-link ecl-link--standalone"
                  >
                    How to start
                  </Link>
                </li>
                <li class="ecl-unordered-list__item">
                  <Link
                    to={`/${currentLanguage}/faq`}
                    className="ecl-link ecl-link--standalone"
                  >
                    FAQ
                  </Link>
                </li>
                <li class="ecl-unordered-list__item">
                  <Link
                    to={`/${currentLanguage}/contact`}
                    className="ecl-link ecl-link--standalone"
                  >
                    Contact
                  </Link>
                </li>
                <li class="ecl-unordered-list__item">
                  <Link
                    to={`/${currentLanguage}/sitemap`}
                    className="ecl-link ecl-link--standalone"
                  >
                    Sitemap
                  </Link>
                </li>
                <li class="ecl-unordered-list__item">
                  <Link
                    to={`/${currentLanguage}/communication-material`}
                    className="ecl-link ecl-link--standalone"
                  >
                    Communication material
                  </Link>
                </li>
                <li class="ecl-unordered-list__item">
                  <Link
                    to={`/${currentLanguage}/how-it-works`}
                    className="ecl-link ecl-link--standalone"
                  >
                    How it works
                  </Link>
                  <ul class="ecl-unordered-list">
                    <li class="ecl-unordered-list__item">
                      <Link
                        to={`/${currentLanguage}/how-it-works/regulatory-framework`}
                        className="ecl-link ecl-link--standalone"
                      >
                        Regulatory framework
                      </Link>
                    </li>
                    <li class="ecl-unordered-list__item">
                      <Link
                        to={`/${currentLanguage}/how-it-works/implementation-national-level`}
                        className="ecl-link ecl-link--standalone"
                      >
                        Implementation national level
                      </Link>
                    </li>
                    <li class="ecl-unordered-list__item">
                      <Link
                        to={`/${currentLanguage}/how-it-works/data-protection`}
                        className="ecl-link ecl-link--standalone"
                      >
                        Data protection
                      </Link>
                    </li>
                    <li class="ecl-unordered-list__item">
                      <Link
                        to={`/${currentLanguage}/how-it-works/history`}
                        className="ecl-link ecl-link--standalone"
                      >
                        History
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Sitemap;
