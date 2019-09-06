const getPagination = ({ t, initiatives, pagination, setPagination }) => {
  const items = [];
  const itemsPerPage = 10;
  const [start, offset] = pagination.split('/');
  const itemsCount = initiatives.all
    ? Math.ceil(initiatives.all / itemsPerPage)
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
              ? `0/${itemsPerPage}`
              : `${Number(start) - itemsPerPage}/${Number(offset) -
                  itemsPerPage}`;

          setPagination(previous);
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

  /* eslint-disable-next-line compat/compat */
  Array.from({ length: itemsCount }).forEach((_, i) => {
    const label = i + 1;

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
            setPagination(marker);
          },
          variant: 'standalone',
          href: '#',
          label,
        },
      });
    }
  });

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
          setPagination(next);
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

  const config = {
    label: t('Browse initiatives'),
    items,
  };

  return config;
};

export default getPagination;
