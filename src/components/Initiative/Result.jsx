import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import axios from 'axios';
import { Link } from 'gatsby';
import { useTranslation } from 'react-i18next';

import Icon from '../Icon';
import defaultImage from '../assets/images/default-image.png';
import formatStatus from '../../utils/formatStatus';

const Result = ({ title, href, status, pubRegNum, logo }) => {
  const { t } = useTranslation();
  const [logoData, setLogoData] = useState('');
  const { GATSBY_INITIATIVES_API: api } = process.env;

  const hasLogo = logo && logo.id && logo.mimeType;

  useEffect(() => {
    if (hasLogo) {
      axios
        .get(`${api}/register/logo/${logo.id}`, {
          responseType: 'arraybuffer',
        })
        .then(r => {
          const data = Buffer.from(r.data, 'binary').toString('base64');
          setLogoData(data);
        })
        .catch(e => {
          console.error(`Failed to fetch logo ${logo.id}`, e);
        });
    }
  }, []);

  const background = hasLogo
    ? `data:${logo.mimeType};base64,${logoData}`
    : defaultImage;

  return (
    <article className="ecl-u-d-flex ecl-u-border-bottom ecl-u-border-color-grey-15 ecl-u-pv-m">
      <div className="ecl-u-flex-grow-1">
        <div className="ecl-u-type-prolonged-m ecl-u-type-bold ecl-u-mt-xs">
          <Link
            to={href}
            className="ecl-u-type-prolonged-m ecl-u-type-bold ecl-link"
          >
            {title}
          </Link>
        </div>
        <ul className="ecl-u-mt-m ecl-unordered-list ecl-unordered-list--no-bullet">
          <li className="ecl-u-d-flex ecl-u-align-items-center ecl-u-type-color-grey-75 ecl-unordered-list__item">
            <Icon className="ecl-icon--m" shape="general--organigram" />
            <span className="ecl-u-type-s ecl-u-ml-s">
              {t('Current status')}
              {': '}
              {formatStatus(status)}
            </span>
          </li>
          <li className="ecl-u-d-flex ecl-u-align-items-center ecl-u-type-color-grey-75 ecl-unordered-list__item">
            <Icon className="ecl-icon--m" shape="general--edit" />
            <span className="ecl-u-type-s ecl-u-ml-s">
              {t('Registration number')}
              {': '}
              {pubRegNum}
            </span>
          </li>
        </ul>
      </div>
      <div
        role="img"
        aria-label={title}
        className="ecl-u-media-ratio-3-2 ecl-u-flex-shrink-0 ecl-u-ml-xl ecl-u-d-lg-none"
        style={{
          backgroundImage: `url('${background}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          height: '5rem',
          width: '7.5rem',
        }}
      ></div>
      <div
        role="img"
        aria-label={title}
        className="ecl-u-media-ratio-3-2 ecl-u-flex-shrink-0 ecl-u-ml-xl ecl-u-d-none ecl-u-d-lg-block"
        style={{
          backgroundImage: `url('${background}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          height: '8.75rem',
          width: '13.125rem',
        }}
      ></div>
    </article>
  );
};

Result.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  status: PropTypes.string,
  pubRegNum: PropTypes.string,
  logo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    mimeType: PropTypes.string,
    size: PropTypes.number,
  }),
};

export default Result;
