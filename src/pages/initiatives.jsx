import React, { useState, useEffect } from 'react';
import axios from 'axios';
import has from 'lodash/has';
import isArray from 'lodash/isArray';

import getDefaultLanguage from '../utils/getDefaultLanguage';

// Generic
import Icon from '../components/Icon';
// import Spinner from '../components/Spinner/Spinner';

// Sub-components
import Progress from '../components/Initiative/Progress';

// Partials
// This is a client-side page in Gatsby => no `location` parameter.
import TopMessage from '../components/TopMessage';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ForumBanner from '../components/ForumBanner';
import Footer from '../components/Footer/FooterLanguage';

const Initiative = ({ location }) => {
  // Because the Initiatives API does not provide a way to filter content by language.
  // We pick the default.
  const defaultLanguage = getDefaultLanguage();
  const hash = location.hash || '#';
  const parts = hash.slice(1).split('-');

  const [initiativeData, setData] = useState({});

  if (parts && parts.length) {
    const endpoint =
      process.env.NODE_ENV === 'development'
        ? '/initiative'
        : 'https://ec.europa.eu/citizens-initiative/services/initiative';

    const [status, year, number] = parts;

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(`${endpoint}/details/${year}/${number}`);

        const rDate = new Date(result.data.initiative.registrationDate);
        const rDay = rDate.getUTCDate();
        const rMonth = rDate.getUTCMonth();
        const rYear = rDate.getUTCFullYear();
        const dateRegistration = `${rDay}-${rMonth + 1}-${rYear}`;
        console.log('result', result);

        console.log(
          Array.isArray(
            result.data.initiative.initiativeLanguages.initiativeLanguage
          )
        );

        let details = {};

        if (
          has(result, 'data.initiative.initiativeLanguages.initiativeLanguage')
        ) {
          // Sometimes `data.initiative.initiativeLanguages.initiativeLanguage` is an array.
          if (
            isArray(
              result.data.initiative.initiativeLanguages.initiativeLanguage
            )
          ) {
            details = result.data.initiative.initiativeLanguages.initiativeLanguage.find(
              l => l['@code'] === defaultLanguage
            );
          }

          // Other times it's a "special" structure, a nested single-value object with 1 translation.
          if (
            result.data.initiative.initiativeLanguages.initiativeLanguage[
              '@code'
            ] === defaultLanguage
          ) {
            details =
              result.data.initiative.initiativeLanguages.initiativeLanguage;
          }
        }

        console.log('details', details);

        const initiative = {
          title: details.title,
          status: result.data.initiative.status,
          dateRegistration,
          dateDeadline: 'N/A',
          number: result.data.initiative.registrationNumber,
        };

        setData(initiative);
      };

      fetchData();
    }, []);
  }

  return (
    <>
      <TopMessage />
      <Header />
      <Menu />
      <section className="ecl-page-header">
        <div className="ecl-container">
          <div className="ecl-page-header__title-wrapper">
            <h1 className="ecl-page-header__title">
              {initiativeData.title ? initiativeData.title : '...'}
            </h1>
          </div>
          <ul className="ecl-u-d-flex ecl-u-pl-none ecl-u-mv-l ecl-u-type-m ecl-page-header__info-list">
            <li className="ecl-page-header__info-item">
              <div className="ecl-u-d-flex">
                <Icon
                  shape="general--organigram"
                  className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
                />
                Current status:{' '}
                {initiativeData.status ? initiativeData.status : '...'}
              </div>
              <div className="ecl-u-d-flex ecl-u-mt-xs">
                <Icon
                  className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
                  shape="general--edit"
                />
                Commission registration number:{' '}
                {initiativeData.number ? initiativeData.number : '...'}
              </div>
            </li>
            <li className="ecl-u-ml-l ecl-page-header__info-item">
              <div className="ecl-u-d-flex">
                <Icon
                  className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
                  shape="general--calendar"
                />
                Deadline:{' '}
                {initiativeData.dateDeadline
                  ? initiativeData.dateDeadline
                  : '...'}
              </div>
              <div className="ecl-u-d-flex ecl-u-mt-xs">
                <Icon
                  className="ecl-u-mr-xs ecl-page-header__info-icon ecl-icon--s"
                  shape="general--calendar"
                />
                Date of registration:{' '}
                {initiativeData.dateRegistration
                  ? initiativeData.dateRegistration
                  : '...'}
              </div>
            </li>
            <li className="ecl-u-ml-l ecl-page-header__info-item">
              <a
                href="#"
                target="_blank"
                type="submit"
                className="ecl-button ecl-button--call"
              >
                <span className="ecl-button__container">
                  <span className="ecl-button__label" data-ecl-label="true">
                    Support this initiative
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>
      <main className="ecl-u-pv-xl">
        <div className="ecl-container">
          <div className="ecl-row">
            <div className="ecl-col-sm-12 ecl-col-md-4">
              <Progress />
            </div>
          </div>
        </div>
      </main>
      <ForumBanner />
      <Footer />
    </>
  );
};

export default Initiative;
