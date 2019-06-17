import React from 'react';

const NewsLatest = () => {
  return (
    <section className="ecl-u-mt-xl">
      <h2 className="ecl-u-type-heading-2">Latest news</h2>
      <ul className="ecl-unordered-list">
        <li className="ecl-unordered-list__item">
          <a href="#" className="ecl-u-d-block ecl-link ecl-link--standalone">
            <strong>New regulation available</strong>
          </a>
          <p className="ecl-paragraph">
            The new Regulation on the European citizens initiative has been
            published in the Official Journal of the EU. The new rules will
            apply as of 2020.
          </p>
        </li>
        <li className="ecl-unordered-list__item">
          <a href="#" className="ecl-u-d-block ecl-link ecl-link--standalone">
            <strong>Take the initiative!</strong>
          </a>
          <p className="ecl-paragraph">
            Join the #EUTakeTheInitiative campaign team at the Democracy Alive!
            Festival in Texel, The Netherlands. From 11-13 April we will be
            celebrating European democracy!
          </p>
        </li>
        <li className="ecl-unordered-list__item">
          <a href="#" className="ecl-u-d-block ecl-link ecl-link--standalone">
            <strong>European Citizens’ Initiative workshop</strong>
          </a>
          <p className="ecl-paragraph">
            Come and take the initiative at the European Citizens’ Initiative
            knowledge-sharing workshop in Paris on 8 November.
          </p>
        </li>
      </ul>
      <p className="ecl-u-type-paragraph">
        <a href="news.html" className="ecl-link ecl-link--standalone">
          See more news
        </a>
      </p>
    </section>
  );
};

export default NewsLatest;
