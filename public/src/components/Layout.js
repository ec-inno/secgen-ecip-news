import React, { Fragment } from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { StaticQuery, graphql } from "gatsby"

// Add pre-built ECL CSS.
import "@ecl/ec-preset-website/dist/styles/ecl-ec-preset-website.css"

// Frequently changing, yet totally static partials related to EC branding.
import Header from "./partials/Header"
import PageHeader from "./partials/PageHeader"
import Footer from "./partials/Footer"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Fragment>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: "description", content: "" },
            { name: "keywords", content: "" },
          ]}
        />
        <Header />
        <PageHeader siteTitle={data.site.siteMetadata.title} />
        <main className="ecl-u-pv-xl">
          <div className="ecl-container">
            <div className="ecl-row">
              <div className="ecl-col-sm-12">{children}</div>
            </div>
          </div>
        </main>
        <Footer />
      </Fragment>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout
