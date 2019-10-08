const getPaginationItems = ({ pagesCount, pageCurrent, sectionBase, t }) => {
  if (!sectionBase || !t) return [];

  const items = [];

  if (pageCurrent !== 0) {
    const previous = pageCurrent === 1 ? '' : `/${pageCurrent}`;

    items.push({
      isPrevious: true,
      ariaLabel: t('Go to previous page'),
      link: {
        variant: 'standalone',
        href: `${sectionBase}${previous}`,
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

  for (let i = 0; i < pagesCount; i += 1) {
    const displayNum = i + 1;
    const label = String(displayNum);

    if (i === pageCurrent) {
      items.push({
        isCurrent: true,
        ariaLabel: `${t('Page')} ${label}`,
        label,
      });
    } else {
      items.push({
        ariaLabel: `${t('Go to page')} ${label}`,
        link: {
          variant: 'standalone',
          href: displayNum === 1 ? sectionBase : `${sectionBase}/${displayNum}`,
          label,
        },
      });
    }
  }

  if (pagesCount !== pageCurrent + 1) {
    const next = pageCurrent === 0 ? 2 : pageCurrent + 2; // /news === /news/1

    items.push({
      isNext: true,
      ariaLabel: t('Go to next page'),
      link: {
        variant: 'standalone',
        href: `${sectionBase}/${next}`,
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

  return items;
};

export default getPaginationItems;
