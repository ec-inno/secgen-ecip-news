import React, { Component, Fragment } from 'react';
import { graphql } from 'gatsby';

import { Context } from '../Context';

class InitiativeTemplate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { set, data: contextData } = this.context;
    const { translations: currentTranslations } = contextData;
    const { initiatives: node } = this.props.data;
    const {
      title,
      field_date,
      field_subject_matter,
      field_main_objectives,
      translations,
    } = node;

    if (
      currentTranslations &&
      currentTranslations.length === 0 &&
      translations.length
    ) {
      set({ translations });
    }

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
      </Fragment>
    );
  }
}

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

InitiativeTemplate.contextType = Context;

export default InitiativeTemplate;
