import React from "react"

import logo from "../assets/logo--en.svg"

const Header = () => (
  <header className="ecl-site-header">
    <div className="ecl-site-header__container ecl-container">
      <div className="ecl-site-header__banner">
        <a
          className="ecl-link ecl-link--standalone"
          href="http://ec.europa.eu/"
          aria-label="European Commission"
        >
          <img
            alt="European Commission logo"
            title="European Commission"
            className="ecl-site-header__logo-image"
            src={logo}
          />
        </a>
        <div className="ecl-site-header__selector" />
      </div>
    </div>
  </header>
)

export default Header
