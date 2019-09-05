import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Result = ({ title, href, pubRegNum }) => {
  if (!title) return '';

  const { t } = useTranslation();

  return (
    <article className="ecl-u-type-m ecl-u-mt-l ecl-u-pb-l ecl-u-pb-lg-m">
      <a
        href={href}
        className="ecl-u-type-prolonged-m ecl-u-type-bold ecl-link"
      >
        {title}
      </a>
      <p className="ecl-u-type-paragraph-m ecl-u-type-color-grey ecl-u-mv-none">
        {t('Registration number')}
        {': '}
        {pubRegNum}
      </p>
    </article>
  );
};

Result.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  pubRegNum: PropTypes.string,
};

export default Result;
