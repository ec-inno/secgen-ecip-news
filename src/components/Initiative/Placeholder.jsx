import React from 'react';

import defaultImage from '../assets/default-image.png';
import New from './New';

const Placeholder = ({ location }) => {
  return (
    <div className="loading-opacity">
      <div className="ecl-row ecl-u-mt-l">
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <div
                className="ecl-card__image"
                alt="card image"
                style={{ backgroundImage: `url(${defaultImage})` }}
              ></div>
            </header>
          </article>
        </div>
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <div
                className="ecl-card__image"
                alt="card image"
                style={{ backgroundImage: `url(${defaultImage})` }}
              ></div>
            </header>
          </article>
        </div>
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <div
                className="ecl-card__image"
                alt="card image"
                style={{ backgroundImage: `url(${defaultImage})` }}
              ></div>
            </header>
          </article>
        </div>
      </div>
      <div className="ecl-row ecl-u-mt-md-l">
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <div
                className="ecl-card__image"
                alt="card image"
                style={{ backgroundImage: `url(${defaultImage})` }}
              ></div>
            </header>
          </article>
        </div>
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <div
                className="ecl-card__image"
                alt="card image"
                style={{ backgroundImage: `url(${defaultImage})` }}
              ></div>
            </header>
          </article>
        </div>
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <div
                className="ecl-card__image"
                alt="card image"
                style={{ backgroundImage: `url(${defaultImage})` }}
              ></div>
            </header>
          </article>
        </div>
      </div>
      <div className="ecl-row ecl-u-mt-md-l">
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <div
                className="ecl-card__image"
                alt="card image"
                style={{ backgroundImage: `url(${defaultImage})` }}
              ></div>
            </header>
          </article>
        </div>
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <div
                className="ecl-card__image"
                alt="card image"
                style={{ backgroundImage: `url(${defaultImage})` }}
              ></div>
            </header>
          </article>
        </div>
        <New location={location} />
      </div>
    </div>
  );
};

export default Placeholder;
