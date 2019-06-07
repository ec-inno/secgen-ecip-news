import React from "react"
import { Link } from "gatsby"

const PageHeader = ({ siteTitle, siteDescription, title, description }) => (
  <div className="ecl-page-header">
    <div className="ecl-container">
      <nav
        className="ecl-page-header__breadcrumb ecl-breadcrumb"
        aria-label="You are here:"
        data-ecl-breadcrumb="true"
      >
        <ol className="ecl-breadcrumb__container">
          <li
            className="ecl-breadcrumb__segment"
            data-ecl-breadcrumb-item="static"
            aria-hidden="false"
          >
            <Link
              to="/"
              className="ecl-breadcrumb__link ecl-link ecl-link--standalone"
            >
              Home
            </Link>
          </li>
        </ol>
      </nav>
      <h1 className="ecl-page-header__title">{title ? title : siteTitle}</h1>
      <p className="ecl-page-header__description">
        {description ? description : siteDescription}
      </p>
    </div>
  </div>
)

export default PageHeader
