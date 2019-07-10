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
    <>
      <BackgroundImage
        Tag="section"
        className="ecl-page-banner ecl-page-banner--image-shade ecl-page-banner--centered ecl-u-mt-l"
        fluid={data.desktop.childImageSharp.fluid}
        backgroundColor="#000"
      >
        <div className="ecl-container ecl-page-banner__container">
          <div className="ecl-page-banner__content">
            <h1 className="ecl-page-banner__title">
              Want to learn and collaborate?
            </h1>
            <Button
              className="ecl-page-banner__button"
              variant="call"
              label="Join the forum"
              icon={icon}
              iconPosition="after"
            />
          </div>
        </div>
      </BackgroundImage>
    </>
  );
};

export default ForumBanner;
