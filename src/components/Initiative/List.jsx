import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { chunk } from 'lodash';

import Placeholder from '../Initiative/Placeholder';
import Item from '../Initiative/Item';
import New from '../Initiative/New';

const List = ({ location }) => {
  // Use proxy in development or actual endpoint in production.
  const endpoint =
    process.env.NODE_ENV === 'development'
      ? '/initiative'
      : 'https://ec.europa.eu/citizens-initiative/services/initiative';

  const page = [];
  const itemsPerRow = 3;
  const rowClass = 'ecl-row';

  const [filter, setFilter] = useState('ALL');
  const [initiatives, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const results = await axios.get(`${endpoint}/get/all`);

      const initiatives = await Promise.all(
        results.data.initiative.map(async basic => {
          const year = basic['@year'];
          const number = basic['@number'];

          if (year && number) {
            const result = await axios.get(
              `${endpoint}/details/${year}/${number}`
            );
            const { initiative: additional } = result.data;

            return {
              year,
              number,
              ...basic,
              ...additional,
            };
          }

          return basic;
        })
      );

      setData(initiatives);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // The statistics below are calculated on render because service does not provide `_count`.
  const allCount = initiatives.length;
  const ongoingCount = initiatives.filter(
    initiative => initiative.searchEntry['@status'] === 'OPEN'
  ).length;
  const answeredCount = initiatives.filter(
    initiative => initiative.searchEntry['@status'] === 'SUCCESSFUL'
  ).length;

  // The filtering below should ideally be possible from the service.
  // If it is, someday, pass `filter` to the `useEffect` to use service calls on change of filter.
  const initiativesResults =
    filter === 'ALL'
      ? initiatives
      : initiatives.filter(
          initiative => initiative.searchEntry['@status'] === filter
        );

  page.push(
    <div className="ecl-u-mv-xl">
      <ul className="eci-menu__list">
        <li
          className={
            filter === 'ALL'
              ? 'eci-menu__option eci-menu__option--is-selected'
              : 'eci-menu__option'
          }
        >
          <a
            onClick={e => {
              e.preventDefault();
              setFilter('ALL');
            }}
            href="#"
            className="eci-menu__link ecl-link"
          >
            All initiatives {allCount ? `(${allCount})` : ''}
          </a>
        </li>
        <li
          className={
            filter === 'OPEN'
              ? 'eci-menu__option eci-menu__option--is-selected'
              : 'eci-menu__option'
          }
        >
          <a
            onClick={e => {
              e.preventDefault();
              setFilter('OPEN');
            }}
            href="#"
            className="eci-menu__link ecl-link"
          >
            Ongoing {ongoingCount ? `(${ongoingCount})` : ''}
          </a>
        </li>
        <li
          className={
            filter === 'SUCCESSFUL'
              ? 'eci-menu__option eci-menu__option--is-selected'
              : 'eci-menu__option'
          }
        >
          <a
            onClick={e => {
              e.preventDefault();
              setFilter('SUCCESSFUL');
            }}
            href="#"
            className="eci-menu__link ecl-link"
          >
            Answered {answeredCount ? `(${answeredCount})` : ''}
          </a>
        </li>
      </ul>
    </div>
  );

  const groups = Math.ceil(initiativesResults.length / itemsPerRow);

  if (isLoading) return <Placeholder location={location} />;

  chunk(initiativesResults, itemsPerRow).map((group, k) => {
    const groupLength = group.length;
    // If it's either the first or last item, do not add 'md'.
    const rowSpacing =
      k === 0 || k + 1 === groups ? 'ecl-u-mt-l' : 'ecl-u-mt-md-l';

    const classNames = classnames(rowClass, rowSpacing);

    page.push(
      <div className={classNames} key={k}>
        {group.map((item, key) => {
          const list = [];

          list.push(
            <div
              key={key}
              className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none"
            >
              <Item key={key} item={item} />
            </div>
          );

          if (k + 1 === groups && key + 1 === groupLength) {
            list.push(<New key={key + 1} location={location} />);
          }

          return list;
        })}
      </div>
    );
  });

  return page;
};

export default List;
