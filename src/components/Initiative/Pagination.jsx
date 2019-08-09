import React from 'react';

import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../utils/getDefaultLanguage';

const Pagination = ({ onClick, location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../../translations/initiative/${language}.json`);

  return (
    <div className="ecl-row ecl-u-mt-l">
      <div className="ecl-col-sm-12 ecl-col-md-12">
        <nav className="ecl-pagination" aria-label="Pagination">
          <ul className="ecl-pagination__list">
            <li className="ecl-pagination__item ecl-pagination__item--next">
              <a
                onClick={onClick}
                aria-label={translation.next_page}
                href="#"
                className="ecl-pagination__link ecl-link ecl-link--standalone ecl-link--icon ecl-link--icon-after"
              >
                <span className="ecl-link__label">{translation.see_more}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
