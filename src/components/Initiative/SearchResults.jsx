import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { chunk } from 'lodash';

import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getDefaultLanguage from '../../utils/getDefaultLanguage';

import SearchForm from './SearchFormAdvanced';
import Item from './Item';
import Message from '../Message';
import New from './New';
import Pagination from './Pagination';

const SearchResults = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();
  const translation = require(`../../../translations/initiative/${language}.json`);

  const { GATSBY_INITIATIVES_API: api } = process.env;

  const page = [];
  const itemsPerRow = 3;
  const itemsPerPageDefault = 8;
  const rowClass = 'ecl-row';

  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageIsVisible, setErrorMessageVisibility] = useState(false);
  const [filters, setFilters] = useState({});
  const [initiatives, setInitiatives] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);

  useEffect(() => {
    const fetchData = async () => {
      const lang = language.toUpperCase(); // Accepted values in service match the list in Gatsby, it's ensured.
      const endpoint = `${api}/register/search/ALL/${lang}/0/${itemsPerPage}`;

      try {
        const response = await axios.post(endpoint, filters);
        setInitiatives(response.data);
      } catch (error) {
        setErrorMessage(error.message);
        setErrorMessageVisibility(true);
      }
    };

    fetchData();
  }, [filters, itemsPerPage]);

  page.push(<SearchForm setFilters={setFilters} location={location} />);

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

  // When no results, return tabs as well, they are filters.
  if (!initiatives.entries) return page;

  const groups = Math.ceil(initiatives.entries.length / itemsPerRow);

  chunk(initiatives.entries, itemsPerRow).map((group, k) => {
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
              <Item key={key} item={item} location={location} />
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

  // Needs update when information about results is correst
  // @see https://webgate.ec.europa.eu/CITnet/jira/browse/INNO-1689
  if (itemsPerPage < initiatives.all) {
    page.push(
      <Pagination
        location={location}
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

export default SearchResults;