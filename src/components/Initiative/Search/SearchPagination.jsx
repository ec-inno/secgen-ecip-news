import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import queryContext from '@eci/context/Query';

import Pagination from '../../Pagination';

const SearchPagination = ({ results }) => {
  const { t } = useTranslation();
  const { query, dispachQuery } = useContext(queryContext);
  const { pagination } = query;

  const items = [];
  const itemsPerPage = 10;
  const [start, offset] = pagination.split('/');
  const itemsCount = results.recordsFound
    ? Math.ceil(results.recordsFound / itemsPerPage)
    : 0;

  // If not on first page.
  if (Number(offset) !== itemsPerPage) {
    items.push({
      isPrevious: true,
      ariaLabel: t('Go to previous page'),
      link: {
        onClick: e => {
          e.preventDefault();

          const previous =
            Number(start) - 1 === itemsPerPage
              ? // First page.
                `0/${itemsPerPage}`
              : // Any other previous.
                `${Number(start) - itemsPerPage}/${Number(offset) -
                  itemsPerPage}`;

          dispachQuery({ type: 'paginate', pagination: previous });
        },
        variant: 'standalone',
        href: '#',
        label: t('Previous'),
        iconPosition: 'before',
        icon: {
          shape: 'ui--corner-arrow',
          size: 'xs',
          transform: 'rotate-270',
        },
      },
    });
  }

  for (let i = 0; i < itemsCount; i += 1) {
    const label = String(i + 1);

    const marker =
      i === 0
        ? `${i}/${itemsPerPage}`
        : `${i * itemsPerPage + 1}/${(i + 1) * itemsPerPage}`;

    if (marker === pagination) {
      items.push({
        isCurrent: true,
        ariaLabel: `${t('Page')} ${label}`,
        label,
      });
    } else {
      items.push({
        ariaLabel: `${t('Go to page')} ${label}`,
        link: {
          onClick: e => {
            e.preventDefault();
            dispachQuery({ type: 'paginate', pagination: marker });
          },
          variant: 'standalone',
          href: '#',
          label,
        },
      });
    }
  }

  if (Number(offset) / itemsPerPage < itemsCount) {
    items.push({
      isNext: true,
      ariaLabel: t('Go to next page'),
      link: {
        onClick: e => {
          e.preventDefault();

          const from =
            Number(start) === 0
              ? itemsPerPage + 1
              : Number(start) + itemsPerPage;
          const to = Number(offset) + itemsPerPage;
          const next = `${from}/${to}`;

          dispachQuery({ type: 'paginate', pagination: next });
        },
        variant: 'standalone',
        href: '#',
        label: t('Next'),
        iconPosition: 'after',
        icon: {
          shape: 'ui--corner-arrow',
          size: 'xs',
          transform: 'rotate-90',
        },
      },
    });
  }

  return <Pagination label={t('Browse initiatives')} items={items} />;
};

export default SearchPagination;
