import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'gatsby';

const Menu = ({ items, location }) => {
  if (!items || items.length === 0) {
    return '';
  }

  const locationParts =
    location && location.pathname
      ? location.pathname.split('/').filter(p => p)
      : [];
  const urlPath = locationParts[1];

  return (
    <nav className="eci-menu">
      <div className="ecl-container">
        <ul className="eci-menu__list">
          {items.map(item => {
            const { id, label, href } = item;

            let classActive = '';

            if (
              // Home page.
              (urlPath === undefined &&
                // Without trailing slash.
                location.pathname.replace(/\/$/, '') === href) ||
              // Internal pages.
              (urlPath && href.includes(urlPath))
            ) {
              classActive = 'eci-menu__option--is-selected';
            }

            const classNames = classnames(classActive, 'eci-menu__option');

            return (
              <li className={classNames} key={id}>
                <Link to={href} className="eci-menu__link ecl-link">
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

Menu.defaultProps = {
  items: [],
  location: {},
};

export default Menu;
