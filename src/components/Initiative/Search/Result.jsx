import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

const Result = ({ title, href, pubRegNum }) => {
  const { t } = useTranslation();

  return (
    <article className="ecl-u-type-m ecl-u-mt-l ecl-u-pb-l ecl-u-pb-lg-m">
      <Link
        to={href}
        className="ecl-u-type-prolonged-m ecl-u-type-bold ecl-link"
      >
        {title}
      </Link>
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
