import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import getCurrentLanguage from '../utils/getCurrentLanguage';

import Button from '../components/Button';

const ForumBanner = ({ location }) => {
  const currentLanguage = getCurrentLanguage(location);

  const icon = {
    shape: 'ui--corner-arrow',
    size: 'xs',
    transform: 'rotate-90',
  };

  const data = useStaticQuery(graphql`
    query ForumBanner {
      desktop: file(relativePath: { eq: "bg-forum.png" }) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 4160) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      allFile(filter: { relativeDirectory: { eq: "forumbanner" } }) {
        edges {
          node {
            name
            childForumbannerJson {
              message
              button
            }
          }
        }
      }
    }
  `);

  const languageData = data.allFile.edges.find(
    node => node.node.name === currentLanguage
  );

  const { childForumbannerJson } = languageData.node;
  const { message, button } = childForumbannerJson;

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
              <h1 className="ecl-page-banner__title">{message}</h1>
              <Button
                className="ecl-page-banner__button"
                variant="call"
                label={button}
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
