import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import Button from '../components/Button';

const ForumBanner = () => {
  const icon = {
    shape: 'ui--corner-arrow',
    size: 'xs',
    transform: 'rotate-90',
  };

  const data = useStaticQuery(graphql`
    query {
      desktop: file(relativePath: { eq: "bg-forum.png" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 4160) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <section className="ecl-page-banner ecl-page-banner--centered ecl-u-mt-l">
      <BackgroundImage
        Tag="div"
        className="ecl-page-banner__image"
        fluid={data.desktop.childImageSharp.fluid}
        backgroundColor="#000"
      >
        <div className="eci-gatsby-image-shade">
          <div
            className="ecl-container ecl-page-banner__container"
            style={{ top: '10%' }}
          >
            <div className="ecl-page-banner__content">
              <h1 className="ecl-page-banner__title">
                Want to learn and collaborate?
              </h1>
              <Button
                className="ecl-page-banner__button"
                variant="call"
                label={'Join the forum'}
                icon={icon}
                iconPosition="after"
              />
            </div>
          </div>
        </div>
      </BackgroundImage>
    </section>
  );
};

export default ForumBanner;
