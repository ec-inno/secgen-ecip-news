import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { chunk } from 'lodash';

import I18nContext from '../../context/I18n';

import useTranslations from '../../utils/useTranslations';
import getInitiatives from '../../utils/getInitiatives';

import Item from '../Initiative/Item';
import Message from '../Message';
import New from '../Initiative/New';
import Pagination from './Pagination';
import Spinner from '../Spinner/Spinner';

const ALL = 'ALL';
const OPEN = 'OPEN';
const SUCCESSFUL = 'SUCCESSFUL';

const List = () => {
  const { location, locale } = useContext(I18nContext);
  const translation = useTranslations('initiative');

  // Scenario when online: either a proxy or production.
  let endpoint =
    process.env.NODE_ENV === 'development'
      ? '/initiative'
      : 'https://ec.europa.eu/citizens-initiative/services/initiative';

  // When offline, requires that you have running local server with cached data.
  // Refer to /docs/InitiativesAPI.md for more information.
  endpoint = process.env.GATSBY_OFFLINE ? 'http://localhost:4000' : endpoint;

  const page = [];
  const itemsPerRow = 3;
  const itemsPerPageDefault = 8;
  const rowClass = 'ecl-row';

  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageIsVisible, setErrorMessageVisibility] = useState(false);
  const [filter, setFilter] = useState(OPEN);
  const [initiatives, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        let initiativesFromService = [];

        // On netlify.com, which is test environment, use a function.
        if (location.origin && location.origin.includes('netlify.com')) {
          const results = await axios.get(
            `${location.origin}/.netlify/functions/initiatives`
          );
          initiativesFromService = results.data.initiatives;
        }
        // Otherwise make requests as usual.
        else {
          initiativesFromService = await getInitiatives(endpoint);
        }

        const initiatives = initiativesFromService
          // Should not display rejected initiatives.
          .filter(r => r.searchEntry['@status'] !== 'REJECTED')
          // Will filter those with content available in the given language.
          .filter(initiative => {
            const { initiativeLanguage } = initiative.initiativeLanguages;
            const content = Array.isArray(initiativeLanguage)
              ? initiativeLanguage.filter(l => l['@code'] === locale)
              : initiativeLanguage['@code'] === locale;
            if (content) return content;
          })
          // Merge fields:
          // - Provides content in the given language.
          // - Gets title, status, etc. fields on first level, rather than searchEntry, facilitating single item visualization.
          .map(initiative => {
            let additional = {};
            const { initiativeLanguage } = initiative.initiativeLanguages;

            if (Array.isArray(initiativeLanguage)) {
              const lang = initiativeLanguage.filter(
                l => l['@code'] === locale
              );
              additional = lang[0];
            } else {
              additional = initiativeLanguage;
            }

            return Object.assign({}, initiative, additional);
          });

        setData(initiatives);
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
      label: translation.close,
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
      title={translation.error_getting_initiatives}
      description={errorMessage}
      {...errorComponentConfig}
    />
  );

  if (isLoading) {
    page.push(
      <div>
        {translation.fetching_initiatives}
        <Spinner />
      </div>
    );
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
            {translation.ongoing} {ongoingCount && `(${ongoingCount})`}
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
            {translation.answered} {answeredCount && `(${answeredCount})`}
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
            {translation.all_initiatives} {allCount && `(${allCount})`}
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
            list.push(<New key={key + 1} />);
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
