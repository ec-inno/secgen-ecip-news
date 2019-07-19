import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { chunk } from 'lodash';

import getInitiatives from '../../utils/getInitiatives';

import Item from '../Initiative/Item';
import Message from '../Message';
import New from '../Initiative/New';
import Pagination from './Pagination';
import Placeholder from '../Initiative/Placeholder';

const ALL = 'ALL';
const OPEN = 'OPEN';
const SUCCESSFUL = 'SUCCESSFUL';

const List = ({ location }) => {
  const endpoint =
    process.env.NODE_ENV === 'development'
      ? '/initiative'
      : 'https://ec.europa.eu/citizens-initiative/services/initiative';

  const page = [];
  const itemsPerRow = 3;
  const rowClass = 'ecl-row';

  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageIsVisible, setErrorMessageVisibility] = useState(false);
  const [filter, setFilter] = useState(OPEN);
  const [initiatives, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPageDefault = 8;
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let initiativesFromService = [];

        // On netlify.com, which is test environment, use a function.
        if (location.origin && location.origin.includes('netlify.com')) {
          initiativesFromService = await axios.get(
            `${location.origin}/.netlify/functions/initiatives`
          );
          results = await getInitiatives(endpoint);
          initiativesFromService = results.initiatives;
        }
        // Otherwise make requests as usual.
        else {
          initiativesFromService = await getInitiatives(endpoint);
        }

        setData(initiativesFromService);
      } catch (error) {
        setErrorMessage(error.message);
        setErrorMessageVisibility(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const errorComponentConfig = {
    variant: 'error',
    icon: {
      shape: 'notifications--error',
      size: 'l',
    },
    close: {
      variant: 'ghost',
      label: 'Close',
      icon: {
        shape: 'ui--close',
        size: 's',
      },
    },
  };

  page.push(
    <Message
      className={errorMessageIsVisible ? '' : 'hidden'}
      onClose={() => setErrorMessageVisibility(false)}
      title="Issue fetching initiatives"
      description={errorMessage}
      {...errorComponentConfig}
    />
  );

  if (isLoading) {
    page.push(<Placeholder location={location} />);
    return page;
  }

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

  const resultsAll = [...filtered];

  const resultsPage = filtered.splice(0, itemsPerPage);

  page.push(
    <div className={errorMessage ? 'hidden' : 'ecl-u-mv-xl'}>
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

  const groups = Math.ceil(resultsPage.length / itemsPerRow);

  chunk(resultsPage, itemsPerRow).map((group, k) => {
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

  if (resultsPage.length < resultsAll.length) {
    page.push(
      <Pagination
        onClick={e => {
          e.preventDefault();
          const newItemsPerPage = itemsPerPage * 2 + 1;
          setItemsPerPage(newItemsPerPage);
        }}
      />
    );
  }

  return page;
};

export default List;
