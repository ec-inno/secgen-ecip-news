import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { chunk } from 'lodash';

import { useI18nContext } from '@eci/context/I18n';
import useInitiativesSearchApi from '@eci/utils/useInitiativesSearchApi';

import SearchForm from './Form';

import Card from '../../../Card';
import ErrorMessage from '../../../ErrorMessage';
import New from '../../../NewInitiative';
import SeeMore from '../../../SeeMore';
import Spinner from '../../../Spinner';

const SearchBasic = () => {
  const { t } = useTranslation();
  const { locale: language } = useI18nContext();

  const itemsPerRow = 3;
  const itemsPerPageDefault = 8;
  const rowClass = 'ecl-row';

  const [section, setSection] = useState('LATEST'); // LATEST, ONGOING, ANSWERED, ALL. Refused are not to be shown on home page by spec.
  const [filters, setFilters] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);

  const query = { filters, section, language, pagination: `0/${itemsPerPage}` };
  const { results, isLoading, error } = useInitiativesSearchApi({ query });

  const hasEntries = results.entries && results.entries.length;
  const groups = hasEntries
    ? Math.ceil(results.entries.length / itemsPerRow)
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
              {t('Ongoing')} {results.ongoing && `(${results.ongoing})`}
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
              {t('Answered')} {results.answered && `(${results.answered})`}
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
              {t('All initiatives')} {results.all && `(${results.all})`}
            </a>
          </li>
        </ul>
      </div>
      {section !== 'LATEST' && (
        <div className="ecl-u-pa-m eci-filter ecl-u-mv-xl">
          <SearchForm setFilters={setFilters} />
          <p className="ecl-u-type-paragraph ecl-u-mb-none">
            <Link className="ecl-link" to={`/${language}/find-initiative`}>
              {t('Get more filters')}
            </Link>
          </p>
        </div>
      )}
      {isLoading && <Spinner />}
      <ErrorMessage
        title={t('An error occurred while fetching results.')}
        error={error}
      />
      {hasEntries ? (
        chunk(results.entries, itemsPerRow).map((group, k) => {
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
                    <Card
                      key={key}
                      item={item}
                      logo={item.logo}
                      title={item.title}
                      status={item.status}
                      href={`/${language}/initiatives/#${item.id}`}
                      totalSupporters={item.totalSupporters}
                      supportLink={item.supportLink}
                    />
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
            <New />
          </div>
        </div>
      )}
      {isLoading && <Spinner />}
      {itemsPerPage < results[section.toLowerCase()] && (
        <SeeMore
          ariaLabel={t('Go to next page')}
          label={t('See more initiatives')}
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

export default SearchBasic;
