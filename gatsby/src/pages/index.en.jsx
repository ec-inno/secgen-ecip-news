import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import PageHeader from '../components/partials/PageHeader';

const Homepage = ({ data }) => {
  const { title, description } = data.site.siteMetadata;
  const initiatives = data.allInitiatives.edges;

  return (
    <Layout
      pageHeader={
        <PageHeader siteTitle={title} siteDescription={description} />
      }
    >
      {initiatives.map(initiativeNode => {
        const { node } = initiativeNode;
        const { id, title, field_main_objectives, path } = node;
        const { alias, langcode } = path;

        return (
          <Fragment key={id}>
            <Link
              to={`/${langcode}${alias}`}
              className="ecl-link ecl-link--standalone"
            >
              <h2 className="ecl-u-type-heading-2">{title}</h2>
            </Link>
            <p
              key={id}
              className="ecl-paragraph"
              dangerouslySetInnerHTML={{
                __html: field_main_objectives.processed,
              }}
            />
          </Fragment>
        );
      })}
    </Layout>
  );
};

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
    allInitiatives(
      filter: { id: { regex: "//en//" }, langcode: { eq: "en" } }
    ) {
      edges {
        node {
          id
          title
          field_main_objectives {
            processed
          }
          field_subject_matter {
            processed
          }
          path {
            alias
            langcode
          }
        }
      }
    }
  }
`;

export default Homepage;
