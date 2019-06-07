import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Add pre-built ECL CSS.
import '@ecl/ec-preset-website/dist/styles/ecl-ec-preset-website.css';

// Frequently changing, yet totally static partials related to EC branding.
import Header from './partials/Header';
import Footer from './partials/Footer';

const Layout = ({ children, pageHeader }) => (
  <Fragment>
    <Header />
    {pageHeader}
    <main className="ecl-u-pv-xl">
      <div className="ecl-container">
        <div className="ecl-row">
          <div className="ecl-col-sm-12">{children}</div>
        </div>
      </div>
    </main>
    <Footer />
  </Fragment>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
