import React, { useState, useEffect } from 'react';
import has from 'lodash/has';

// Generic utils.
import getCurrentLanguage from '../../utils/getCurrentLanguage';
import getInitiativeStatusLabel from '../../utils/getInitiativeStatusLabel';

// Page-specific utilities
// When components need more than a few attributes, keep config params out.
import config from './config';
import getInitiativeData from './getInitiativeData';

// Generic
import SEO from '../../components/SEO';
import Icon from '../../components/Icon';
import Message from '../../components/Message';

// Sub-components, keep out of /src/pages.
import Progress from '../../components/Initiative/Progress';

// Partials
import TopMessage from '../../components/TopMessage';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import ForumBanner from '../../components/ForumBanner';
import Footer from '../../components/Footer/FooterLanguage';

const Initiative = ({ location }) => {
  const currentLanguage = getCurrentLanguage(location);

  const [initiativeData, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const initiative = await getInitiativeData({ location });
      setData(initiative);
    };

    fetchData();
  }, [currentLanguage]);

  return (
    <>
      <SEO
        title={has(initiativeData, 'title') ? initiativeData.title : '...'}
        location={location}
      />
      <TopMessage location={location} />
      <Header location={location} />
      <Menu location={location} />
      <section className="ecl-page-header">
        <div className="ecl-container">
          <div className="ecl-page-header__title-wrapper">
            <h1 className="ecl-page-header__title">
              {has(initiativeData, 'title') ? initiativeData.title : '...'}
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
                {initiativeData.status
                  ? getInitiativeStatusLabel(initiativeData.status)
                  : '...'}
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
              <Progress initiative={initiativeData} />
            </div>
            <div className="ecl-col-sm-12 ecl-col-md-8">
              {initiativeData.status === 'REGISTERED' ? (
                <>
                  <p className="ecl-u-type-paragraph ecl-u-type-bold">
                    Only a part(s) of this initiative has(ve) been registered.
                    Please read the Commission Decision for the scope of the
                    registered initiative.
                  </p>
                  <Message
                    title="Disclaimer"
                    description={
                      'The contents on this page are the sole responsibility of the organisers of the initiatives. The texts reflect solely the views of their authors and can in no way be taken to reflect the views of the European Commission.'
                    }
                    {...config.message}
                  />
                </>
              ) : (
                ''
              )}
              {initiativeData.subjectMatter ? (
                <>
                  <h2 className="ecl-u-type-heading-2">Subject-matter</h2>
                  <p
                    className="ecl-u-type-paragraph"
                    dangerouslySetInnerHTML={{
                      __html: initiativeData.subjectMatter,
                    }}
                  />
                </>
              ) : (
                ''
              )}
              {initiativeData.objectives ? (
                <>
                  <h2 className="ecl-u-type-heading-2">Objectives</h2>
                  <ul className="ecl-u-type-paragraph">
                    {initiativeData.objectives.split(/\n/).map((line, key) => (
                      <li
                        key={key}
                        className="ecl-u-type-paragraph"
                        dangerouslySetInnerHTML={{
                          __html: line,
                        }}
                      />
                    ))}
                  </ul>
                </>
              ) : (
                ''
              )}
              {initiativeData.legalBase ? (
                <>
                  <h2 className="ecl-u-type-heading-2">
                    Provisions of the Treaties considered relevant by the
                    organisers
                  </h2>
                  <p
                    className="ecl-u-type-paragraph"
                    dangerouslySetInnerHTML={{
                      __html: initiativeData.legalBase,
                    }}
                  />
                </>
              ) : (
                ''
              )}
              {initiativeData.website ? (
                <>
                  <h2 className="ecl-u-type-heading-2">Website</h2>
                  <p className="ecl-u-type-paragraph">
                    <a
                      href={initiativeData.website}
                      className="ecl-link"
                      target="_blank"
                    >
                      {initiativeData.website}
                    </a>
                  </p>
                </>
              ) : (
                ''
              )}
              {initiativeData.organisers ? (
                <>
                  <h2 className="ecl-u-type-heading-2">
                    Organisers / Members of citizens' committee:
                  </h2>
                  <ul className="ecl-u-type-paragraph">
                    {has(initiativeData, 'organisers.reps')
                      ? initiativeData.organisers.reps.map((rep, key) => (
                          <li key={`r-${key}`}>
                            Representative: {rep.fullname}
                            {rep.email ? ` - ${rep.email}` : ''}
                          </li>
                        ))
                      : ''}
                    {has(initiativeData, 'organisers.subs')
                      ? initiativeData.organisers.subs.map((sub, key) => (
                          <li key={`s-${key}`}>
                            Substitute: {sub.fullname}
                            {sub.email ? ` - ${sub.email}` : ''}
                          </li>
                        ))
                      : ''}
                    {has(initiativeData, 'organisers.members') ? (
                      <li key="m-0">
                        Members:{' '}
                        {initiativeData.organisers.members
                          .map(m => m.fullname)
                          .join(', ')}
                      </li>
                    ) : (
                      ''
                    )}
                  </ul>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </main>
      <ForumBanner location={location} />
      <Footer location={location} />
    </>
  );
};

export default Initiative;
