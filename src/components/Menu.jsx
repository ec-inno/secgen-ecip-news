import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import classnames from 'classnames';
import { Link } from 'gatsby';

import getDefaultLanguage from '../utils/getDefaultLanguage';

const Menu = ({ location }) => {
  if (!location) {
    const defaultLanguage = getDefaultLanguage();
    const data = require(`../data/menu/${defaultLanguage}.json`);
    const { links } = data;

    return (
      <nav className="eci-menu">
        <div className="ecl-container">
          <ul className="eci-menu__list">
            {links && links.length ? (
              links.map((link, key) => {
                const { label, href } = link;

                return (
                  <li className="eci-menu__option" key={key}>
                    <Link
                      to={
                        // If the user has left a base path, correct it, as there's always a language.
                        href === '/'
                          ? `/${defaultLanguage}`
                          : `/${defaultLanguage}${href}`
                      }
                      className="eci-menu__link ecl-link"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="eci-menu__option eci-menu__option--is-selected">
                <a
                  href={`/${defaultLanguage}`}
                  className="eci-menu__link ecl-link"
                >
                  Home
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }

  const locations = location.pathname.split('/').filter(p => p);
  const [language, path] = locations;

  const data = useStaticQuery(graphql`
    query Menu {
      allFile(filter: { relativeDirectory: { eq: "menu" } }) {
        edges {
          node {
            name
            childMenuJson {
              links {
                label
                href
              }
            }
          }
        }
      }
    }
  `);

  const languageData = data.allFile.edges.find(
    node => node.node.name === language
  );

  const { childMenuJson } = languageData.node;
  const { links } = childMenuJson;

  return (
    <nav className="eci-menu">
      <div className="ecl-container">
        <ul className="eci-menu__list">
          {links && links.length ? (
            links.map((link, key) => {
              const { label, href } = link;
              let classActive = '';

              if (
                // In case of home page.
                (href === '/' && path === undefined) ||
                // Or any other internal one.
                (path && href.includes(path))
              ) {
                classActive = 'eci-menu__option--is-selected';
              }

              const classNames = classnames(classActive, 'eci-menu__option');

              return (
                <li className={classNames} key={key}>
                  <Link
                    to={
                      // If the user has left a base path, correct it, as there's always a language.
                      href === '/' ? `/${language}` : `/${language}${href}`
                    }
                    className="eci-menu__link ecl-link"
                  >
                    {label}
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="eci-menu__option eci-menu__option--is-selected">
              <a href={`/${language}`} className="eci-menu__link ecl-link">
                Home
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
