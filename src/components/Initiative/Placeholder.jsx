import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import New from './New';

const Placeholder = ({ location }) => {
  const data = useStaticQuery(graphql`
    query Placeholder {
      desktop: file(relativePath: { eq: "default-image.png" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 4160) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <div className="loading-opacity">
      <p className="ecl-paragraph">Fetching data about initiatives ...</p>
      <div className="ecl-row ecl-u-mt-l">
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <BackgroundImage
                Tag="div"
                className="ecl-card__image ecl-card__image--fixed"
                fluid={data.desktop.childImageSharp.fluid}
                backgroundColor="#000"
              />
            </header>
          </article>
        </div>
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <BackgroundImage
                Tag="div"
                className="ecl-card__image ecl-card__image--fixed"
                fluid={data.desktop.childImageSharp.fluid}
                backgroundColor="#000"
              />
            </header>
          </article>
        </div>
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <BackgroundImage
                Tag="div"
                className="ecl-card__image ecl-card__image--fixed"
                fluid={data.desktop.childImageSharp.fluid}
                backgroundColor="#000"
              />
            </header>
          </article>
        </div>
      </div>
      <div className="ecl-row ecl-u-mt-md-l">
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <BackgroundImage
                Tag="div"
                className="ecl-card__image ecl-card__image--fixed"
                fluid={data.desktop.childImageSharp.fluid}
                backgroundColor="#000"
              />
            </header>
          </article>
        </div>
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <BackgroundImage
                Tag="div"
                className="ecl-card__image ecl-card__image--fixed"
                fluid={data.desktop.childImageSharp.fluid}
                backgroundColor="#000"
              />
            </header>
          </article>
        </div>
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <BackgroundImage
                Tag="div"
                className="ecl-card__image ecl-card__image--fixed"
                fluid={data.desktop.childImageSharp.fluid}
                backgroundColor="#000"
              />
            </header>
          </article>
        </div>
      </div>
      <div className="ecl-row ecl-u-mt-md-l">
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <BackgroundImage
                Tag="div"
                className="ecl-card__image ecl-card__image--fixed"
                fluid={data.desktop.childImageSharp.fluid}
                backgroundColor="#000"
              />
            </header>
          </article>
        </div>
        <div className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none">
          <article className="ecl-card">
            <header className="ecl-card__header">
              <BackgroundImage
                Tag="div"
                className="ecl-card__image ecl-card__image--fixed"
                fluid={data.desktop.childImageSharp.fluid}
                backgroundColor="#000"
              />
            </header>
          </article>
        </div>
        <New location={location} />
      </div>
    </div>
  );
};

export default Placeholder;
