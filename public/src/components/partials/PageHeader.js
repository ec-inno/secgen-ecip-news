import React from "react"

const PageHeader = ({ siteTitle }) => (
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
            <a
              href="/"
              className="ecl-breadcrumb__link ecl-link ecl-link--standalone"
            >
              Home
            </a>
          </li>
        </ol>
      </nav>
      <h1 className="ecl-page-header__title">{siteTitle}</h1>
      <p className="ecl-page-header__description">
        This site is a participatory democracy instrument that allows citizens
        to suggest concrete legal changes in any field where the European
        Commission has power to propose legislation, such as the environment,
        agriculture, energy, transport or trade.
      </p>
    </div>
  </div>
)

export default PageHeader
