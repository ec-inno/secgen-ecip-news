import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import PageHeader from '../components/partials/PageHeader';

const InitiativeTemplate = ({ data }) => {
  const { initiatives: node } = data;
  const {
    title,
    field_date,
    field_subject_matter,
    field_main_objectives,
  } = node;

  return (
    <Layout pageHeader={<PageHeader title={title} />}>
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
    </Layout>
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
    }
  }
`;

export default InitiativeTemplate;
