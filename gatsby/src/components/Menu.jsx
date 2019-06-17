import React from 'react';

const Menu = () => {
  return (
    <nav className="eci-menu">
      <div className="ecl-container">
        <ul className="eci-menu__list">
          <li className="eci-menu__option eci-menu__option--is-selected">
            <a href="#" className="eci-menu__link ecl-link">
              Home
            </a>
          </li>
          <li className="eci-menu__option">
            <a href="#" className="eci-menu__link ecl-link">
              News
            </a>
          </li>
          <li className="eci-menu__option">
            <a href="#" className="eci-menu__link ecl-link">
              How it works
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
