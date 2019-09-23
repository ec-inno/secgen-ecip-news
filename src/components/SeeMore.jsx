import React from 'react';
import PropTypes from 'prop-types';

const SeeMore = ({ label, ariaLabel, onClick }) => (
  <div className="ecl-row ecl-u-mt-l">
    <div className="ecl-col-sm-12 ecl-col-md-12">
      <nav className="ecl-pagination" aria-label="Pagination">
        <ul className="ecl-pagination__list">
          <li className="ecl-pagination__item ecl-pagination__item--next">
            <a
              onClick={onClick}
              aria-label={ariaLabel}
              href="#"
              className="ecl-pagination__link ecl-link ecl-link--standalone ecl-link--icon ecl-link--icon-after"
            >
              <span className="ecl-link__label">{label}</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

SeeMore.propTypes = {
  ariaLabel: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

SeeMore.defaultProps = {
  ariaLabel: '',
  label: '',
  onClick: () => {},
};

export default SeeMore;
