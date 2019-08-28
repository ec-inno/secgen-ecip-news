import React, { useState, useEffect } from 'react';
import axios from 'axios';
import has from 'lodash/has';

// Generic utils.
import getCurrentLanguage from '../utils/getCurrentLanguage';
import getDefaultLanguage from '../utils/getDefaultLanguage';

// Generic
import SEO from '../components/SEO';
import Message from '../components/Message';
import Share from '../components/Share';

// Sub-components, keep out of /src/pages.
import Meta from '../components/Initiative/Meta';
import Details from '../components/Initiative/Details';
import Progress from '../components/Initiative/Progress';

const Initiative = ({ location }) => {
  const language = getCurrentLanguage(location) || getDefaultLanguage();

  const { GATSBY_INITIATIVES_API: api } = process.env;

  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageIsVisible, setErrorMessageVisibility] = useState(false);
  const [initiativeData, setInitiativeData] = useState({});

  useEffect(() => {
    const fetchInitiative = async () => {
      const initiativeId = location.hash.substr(1, location.hash.length);
      const endpoint = `${api}/register/details/${initiativeId}`;

      try {
        const response = await axios.get(endpoint);
        setInitiativeData(response.data);
      } catch (error) {
        console.error(`Error while fetching data about initiative #{1}`, error);
        setErrorMessage(error.message);
        setErrorMessageVisibility(true);
      }
    };

    fetchInitiative();
  }, [language]);

  if (errorMessage) {
    const errorComponentConfig = {
      variant: 'error',
      icon: {
        shape: 'notifications--error',
        size: 'l',
      },
      close: {
        variant: 'ghost',
        label: 'Close',
        icon: {
          shape: 'ui--close',
          size: 's',
        },
      },
    };

    return (
      <div className="ecl-container ecl-u-mt-l">
        <Message
          className={errorMessageIsVisible ? '' : 'hidden'}
          onClose={() => setErrorMessageVisibility(false)}
          title={`Issue while getting data about initiative ${1}`}
          description={errorMessage}
          {...errorComponentConfig}
        />
      </div>
    );
  }

  const languageSpecificData = initiativeData.linguisticVersions
    ? Object.values(initiativeData.linguisticVersions).find(
        version => version.languageCode.toLowerCase() === language
      )
    : {};

  return (
    <>
      <SEO
        location={location}
        title={
          has(languageSpecificData, 'title')
            ? languageSpecificData.title
            : '...'
        }
      />

      <section className="ecl-page-header">
        <div className="ecl-container">
          <div className="ecl-page-header__title-wrapper">
            <h1 className="ecl-page-header__title">
              {has(languageSpecificData, 'title')
                ? languageSpecificData.title
                : '...'}
            </h1>
          </div>
          <Meta initiativeData={initiativeData} />
        </div>
      </section>
      <main className="ecl-u-pv-xl">
        <div className="ecl-container">
          <div className="ecl-row">
            <div className="ecl-col-sm-12 ecl-col-md-4">
              <Progress initiativeData={initiativeData} location={location} />
            </div>
            <div className="ecl-col-sm-12 ecl-col-md-8">
              <Details
                languageSpecificData={languageSpecificData}
                initiativeData={initiativeData}
                location={location}
              />
              <Share />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Initiative;
