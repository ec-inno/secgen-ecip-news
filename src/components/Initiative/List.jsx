import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { chunk } from 'lodash';

import Placeholder from '../Initiative/Placeholder';
import Item from '../Initiative/Item';
import New from '../Initiative/New';

const ALL = 'ALL';
const OPEN = 'OPEN';
const SUCCESSFUL = 'SUCCESSFUL';

const List = ({ location }) => {
  // Use proxy in development or actual endpoint in production.
  const endpoint =
    process.env.NODE_ENV === 'development'
      ? '/initiative'
      : 'https://ec.europa.eu/citizens-initiative/services/initiative';

  const page = [];
  const itemsPerRow = 3;
  const rowClass = 'ecl-row';

  const [filter, setFilter] = useState(OPEN);
  const [initiatives, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPageDefault = 8;
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Get all each time to display numbers.
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

  // Do not work with results of the side effect directly.
  const allInitiatives = [...initiatives];

  const allCount = allInitiatives.length;
  const ongoingCount = allInitiatives.filter(
    initiative => initiative.searchEntry['@status'] === OPEN
  ).length;
  const answeredCount = allInitiatives.filter(
    initiative => initiative.searchEntry['@status'] === SUCCESSFUL
  ).length;

  const filtered =
    filter === ALL
      ? allInitiatives
      : allInitiatives.filter(
          initiative => initiative.searchEntry['@status'] === filter
        );

  const filteredCopy = [...filtered];

  const results = filtered.splice(0, itemsPerPage);

  page.push(
    <div className="ecl-u-mv-xl">
      <ul className="eci-menu__list">
        <li
          className={
            filter === OPEN
              ? 'eci-menu__option eci-menu__option--is-selected'
              : 'eci-menu__option'
          }
        >
          <a
            onClick={e => {
              e.preventDefault();
              setItemsPerPage(itemsPerPageDefault);
              setFilter(OPEN);
            }}
            href="#"
            className="eci-menu__link ecl-link"
          >
            Ongoing {ongoingCount ? `(${ongoingCount})` : ''}
          </a>
        </li>
        <li
          className={
            filter === SUCCESSFUL
              ? 'eci-menu__option eci-menu__option--is-selected'
              : 'eci-menu__option'
          }
        >
          <a
            onClick={e => {
              e.preventDefault();
              setItemsPerPage(itemsPerPageDefault);
              setFilter(SUCCESSFUL);
            }}
            href="#"
            className="eci-menu__link ecl-link"
          >
            Answered {answeredCount ? `(${answeredCount})` : ''}
          </a>
        </li>
        <li
          className={
            filter === ALL
              ? 'eci-menu__option eci-menu__option--is-selected'
              : 'eci-menu__option'
          }
        >
          <a
            onClick={e => {
              e.preventDefault();
              setItemsPerPage(20);
              setFilter(ALL);
            }}
            href="#"
            className="eci-menu__link ecl-link"
          >
            All initiatives {allCount ? `(${allCount})` : ''}
          </a>
        </li>
      </ul>
    </div>
  );

  const groups = Math.ceil(results.length / itemsPerRow);

  if (isLoading) return <Placeholder location={location} />;

  chunk(results, itemsPerRow).map((group, k) => {
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

  if (results.length < filteredCopy.length) {
    page.push(
      <div className="ecl-row ecl-u-mt-l">
        <div className="ecl-col-sm-12 ecl-col-md-12">
          <nav className="ecl-pagination" aria-label="Pagination">
            <ul className="ecl-pagination__list">
              <li className="ecl-pagination__item ecl-pagination__item--next">
                <a
                  onClick={e => {
                    e.preventDefault();
                    const newItemsPerPage = itemsPerPage * 2 + 1;
                    setItemsPerPage(newItemsPerPage);
                  }}
                  aria-label="Go to next page"
                  href="#"
                  className="ecl-pagination__link ecl-link ecl-link--standalone ecl-link--icon ecl-link--icon-after"
                >
                  <span className="ecl-link__label">See more initiatives</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }

  return page;
};

export default List;
