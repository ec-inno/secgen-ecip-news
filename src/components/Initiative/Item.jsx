import React from 'react';

const InitiativeItem = ({ item }) => {
  return (
    <article className="ecl-card">
      <header className="ecl-card__header">
        <a href="home-ongoing.html" className="ecl-tag ecl-u-f-r eci-tag">
          {item.searchEntry['@status']}
        </a>
        <div
          className="ecl-card__image"
          alt="card image"
          // style="background-image: url('media/initiatives/eat_original-en.png');"
        ></div>
        <h1 className="ecl-card__title">
          <a level="1" href="#" className="ecl-link ecl-link--standalone">
            {item.searchEntry.title}
          </a>
        </h1>
      </header>
      <section className="ecl-card__body">
        <p className="ecl-u-type-paragraph ecl-u-mv-none">900 supporters</p>
        <ul className="ecl-card__link-container">
          <li className="ecl-card__link-item">
            <a
              href="#"
              className="ecl-card__link ecl-link ecl-link--standalone"
            >
              Support this initiative
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default InitiativeItem;
