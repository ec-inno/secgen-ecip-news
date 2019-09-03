import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'gatsby';
import axios from 'axios';
import classnames from 'classnames';
import { chunk } from 'lodash';

import config from '../config';
import I18nContext from '../../../context/I18n';

import Card from '../Card';
import Message from '../../Message';
import New from '../New';
import Pagination from '../Pagination';
import SearchForm from './FormBasic';
import Spinner from '../../Spinner';

const Basic = () => {
  const { t } = useTranslation();
  const { locale } = useContext(I18nContext);
  const { GATSBY_INITIATIVES_API: api } = process.env;

  const itemsPerRow = 3;
  const itemsPerPageDefault = 8;
  const rowClass = 'ecl-row';

  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageIsVisible, setErrorMessageVisibility] = useState(false);
  const [section, setSection] = useState('LATEST'); // LATEST, ONGOING, ANSWERED, ALL
  const [filters, setFilters] = useState({});
  const [initiatives, setInitiatives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);

  useEffect(() => {
    setIsLoading(true);
    const lang = locale.toUpperCase(); // Accepted values in service match the list in Gatsby, it's ensured.
    const endpoint = `${api}/register/search/${section}/${lang}/0/${itemsPerPage}`;

    axios
      .post(endpoint, filters)
      .then(response => {
        setInitiatives(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setErrorMessage(error.message);
        setErrorMessageVisibility(true);
        setIsLoading(false);
      });
  }, [section, filters, itemsPerPage]);

  const hasEntries = initiatives.entries && initiatives.entries.length;
  const groups = hasEntries
    ? Math.ceil(initiatives.entries.length / itemsPerRow)
    : null;

  return (
    <>
      <div className="ecl-u-mv-xl">
        <ul className="eci-menu__list">
          <li
            key="latest"
            className={
              section === 'LATEST'
                ? 'eci-menu__option eci-menu__option--is-selected'
                : 'eci-menu__option'
            }
          >
            <a
              onClick={e => {
                e.preventDefault();
                setItemsPerPage(itemsPerPageDefault);
                setSection('LATEST');
              }}
              href="#"
              className="eci-menu__link ecl-link"
            >
              {t('Latest')}
            </a>
          </li>
          <li
            key="ongoing"
            className={
              section === 'ONGOING'
                ? 'eci-menu__option eci-menu__option--is-selected'
                : 'eci-menu__option'
            }
          >
            <a
              onClick={e => {
                e.preventDefault();
                setItemsPerPage(itemsPerPageDefault);
                setSection('ONGOING');
              }}
              href="#"
              className="eci-menu__link ecl-link"
            >
              {t('Ongoing')} {initiatives.ongoing && `(${initiatives.ongoing})`}
            </a>
          </li>
          <li
            key="answered"
            className={
              section === 'ANSWERED'
                ? 'eci-menu__option eci-menu__option--is-selected'
                : 'eci-menu__option'
            }
          >
            <a
              onClick={e => {
                e.preventDefault();
                setItemsPerPage(itemsPerPageDefault);
                setSection('ANSWERED');
              }}
              href="#"
              className="eci-menu__link ecl-link"
            >
              {t('Answered')}{' '}
              {initiatives.answered && `(${initiatives.answered})`}
            </a>
          </li>
          <li
            key="all"
            className={
              section === 'ALL'
                ? 'eci-menu__option eci-menu__option--is-selected'
                : 'eci-menu__option'
            }
          >
            <a
              onClick={e => {
                e.preventDefault();
                setItemsPerPage(20);
                setSection('ALL');
              }}
              href="#"
              className="eci-menu__link ecl-link"
            >
              {t('All initiatives')} {initiatives.all && `(${initiatives.all})`}
            </a>
          </li>
        </ul>
      </div>
      <div className="ecl-u-pa-m eci-filter ecl-u-mv-xl">
        <SearchForm setFilters={setFilters} />
        <p className="ecl-u-type-paragraph ecl-u-mb-none">
          <Link className="ecl-link" to={`/${locale}/find-initiative`}>
            {t('Get more filters')}
          </Link>
        </p>
      </div>
      {isLoading && <Spinner />}
      <Message
        className={errorMessageIsVisible ? '' : 'hidden'}
        onClose={() => setErrorMessageVisibility(false)}
        title={t('An error occurred while fetching initiatives.')}
        description={errorMessage}
        {...config.error}
      />
      {hasEntries ? (
        chunk(initiatives.entries, itemsPerRow).map((group, k) => {
          const groupLength = group.length;
          // If it's either the first or last item, do not add 'md'.
          const rowSpacing =
            k === 0 || k + 1 === groups ? 'ecl-u-mt-l' : 'ecl-u-mt-md-l';

          const classNames = classnames(rowClass, rowSpacing);

          return (
            <div className={classNames} key={k}>
              {group.map((item, key) => {
                const list = [];

                list.push(
                  <div
                    key={key}
                    className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none"
                  >
                    <Card key={key} item={item} />
                  </div>
                );

                if (k + 1 === groups && key + 1 === groupLength) {
                  list.push(<New key={key + 1} />);
                }

                return list;
              })}
            </div>
          );
        })
      ) : (
        <div className="ecl-row">
          <div className="ecl-col-sm-12 ecl-col-md-12">
            <p className="ecl-u-type-paragraph">
              {t('There are no initiatives meeting current filter criteria.')}
            </p>
          </div>
        </div>
      )}
      {isLoading && <Spinner />}
      {itemsPerPage < initiatives[section.toLowerCase()] && (
        <Pagination
          onClick={e => {
            e.preventDefault();
            const newItemsPerPage = itemsPerPage * 2 + 1;
            setItemsPerPage(newItemsPerPage);
          }}
        />
      )}
    </>
  );
};

export default Basic;