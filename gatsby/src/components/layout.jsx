import React from 'react';
import PropTypes from 'prop-types';
import { graphql, StaticQuery } from 'gatsby';

// Add pre-built ECL CSS.
import '@ecl/ec-preset-website/dist/styles/ecl-ec-preset-website.css';

import { ContextProvider } from '../Context';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, location }) => {
  // Homepage is a the splash page with languages.
  if (location.pathname === '/') return children;

  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              languages {
                languages {
                  lang
                  label
                }
              }
            }
          }
        }
      `}
      render={data => {
        const { languages } = data.site.siteMetadata.languages;

        return (
          <ContextProvider>
            <Header languages={languages} location={location} />
            <main className="ecl-u-pv-xl">
              <div className="ecl-container">
                <div className="ecl-row">
                  <div className="ecl-col-sm-12">{children}</div>
                </div>
              </div>
            </main>
            <Footer />
          </ContextProvider>
        );
      }}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
