import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

const InitiativeTemplate = ({ data }) => {
  const { initiatives: node } = data;
  const {
    title,
    field_date,
    field_subject_matter,
    field_main_objectives,
    translations,
  } = node;

  return (
    <Fragment>
      <h1>{title}</h1>
      <p className="ecl-paragraph">Date: {field_date}</p>
      <h3 className="ecl-u-type-heading-3">Subject matter</h3>
      <p
        className="ecl-paragraph"
        dangerouslySetInnerHTML={{
          __html: field_subject_matter.processed,
        }}
      />
      <h3 className="ecl-u-type-heading-3">Main objectives</h3>
      <p
        className="ecl-paragraph"
        dangerouslySetInnerHTML={{
          __html: field_main_objectives.processed,
        }}
      />
      {translations ? (
        <ul className="ecl-unordered-list">
          {translations.map(translation => (
            <li className="ecl-unordered-list__item" key={translation.langcode}>
              <Link to={`/${translation.langcode}${translation.alias}`}>
                {translation.langcode}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        ''
      )}
    </Fragment>
  );
};

export const query = graphql`
  query getInitiative($alias: String!, $langcode: String!) {
    initiatives(path: { alias: { eq: $alias }, langcode: { eq: $langcode } }) {
      title
      field_date
      field_subject_matter {
        processed
      }
      field_main_objectives {
        processed
      }
      translations {
        alias
        langcode
      }
    }
  }
`;

export default InitiativeTemplate;
