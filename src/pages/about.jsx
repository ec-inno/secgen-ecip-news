import React from 'react';
import { graphql } from 'gatsby';

import SEO from '../components/SEO';

const About = ({ data }) => {
  const { title } = data.file.childAboutJson;

  return (
    <>
      <SEO title={title} />

      <main>
        <section className="ecl-page-header">
          <div className="ecl-container">
            <div className="ecl-page-header__title-wrapper">
              <h1 className="ecl-page-header__title">{title}</h1>
              <p className="ecl-page-header__slogan ecl-u-type-paragraph ecl-u-mt-l">
                This page gives extra information about the ECI and the
                corresponding legislations.
              </p>
            </div>
          </div>
        </section>

        <div className="ecl-container ecl-u-mt-xl">
          <div className="ecl-row ecl-u-mt-l">
            <div className="ecl-col-12 ecl-col-sm-3">
              <nav>
                <div className="ecl-u-color-grey-100 ecl-u-type-m ecl-u-pv-xs">
                  PAGE CONTENTS
                </div>
                <ul className="ecl-unordered-list ecl-unordered-list--no-bullet ecl-u-pl-none ecl-u-mt-s">
                  <li className="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m">
                    <a
                      href="#inline-nav-1"
                      className="ecl-link ecl-link--standalone ecl-u-d-block"
                    >
                      What is a European citizens' initiative?
                    </a>
                  </li>
                  <li className="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m">
                    <a
                      href="#inline-nav-2"
                      className="ecl-link ecl-link--standalone ecl-u-d-block"
                    >
                      What can be proposed as a citizens' initiative?
                    </a>
                  </li>
                  <li className="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m">
                    <a
                      href="#inline-nav-3"
                      className="ecl-link ecl-link--standalone ecl-u-d-block"
                    >
                      Who can organise a citizens' initiative and how?
                    </a>
                  </li>
                  <li className="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m">
                    <a
                      href="#inline-nav-4"
                      className="ecl-link ecl-link--standalone ecl-u-d-block"
                    >
                      Who can sign up to a citizens' initiative and how?
                    </a>
                  </li>
                  <li className="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m">
                    <a
                      href="#inline-nav-5"
                      className="ecl-link ecl-link--standalone ecl-u-d-block"
                    >
                      What happens when a citizens' initiative gets one million
                      signatures?
                    </a>
                  </li>
                  <li className="ecl-unordered-list__item ecl-u-type-bold ecl-u-mt-m">
                    <a
                      href="#inline-nav-6"
                      className="ecl-link ecl-link--standalone ecl-u-d-block"
                    >
                      Want to know more about this topic?
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="ecl-col-12 ecl-col-sm-9">
              <h2
                className="ecl-u-type-heading-2 ecl-u-mt-none"
                id="inline-nav-1"
              >
                What is a European citizens' initiative?
              </h2>
              <div className="ecl-row">
                <div className="ecl-col-12 ecl-col-sm-8">
                  <figure className="ecl-media-container">
                    <img
                      className="ecl-media-container__media"
                      src="http://eci-mockups.surge.sh/media/video-image.png"
                      alt="ECI video"
                    />
                    <figcaption className="ecl-media-container__caption">
                      ECI is a participatory democracy instrument that allows
                      citizens to suggest concrete legal changes in any field
                      where the European Commission has power to propose
                      legislation, such as the environment, agriculture, energy,
                      transport or trade.
                    </figcaption>
                  </figure>
                </div>
              </div>

              <p className="ecl-u-type-paragraph">
                An initiative enables citizens from different member states to
                come together around an issue close to their heart with a view
                to influencing EU policy-making.
              </p>
              <p className="ecl-u-type-paragraph">
                To launch an initiative, it takes 7 EU citizens, living in at
                least 7 different Member States who are old enough to vote. Once
                an initiative gathers 1 million signatures with{' '}
                <a href="#" className="ecl-link">
                  minimum thresholds
                </a>{' '}
                reached in at least 7 countries, the European Commission must
                decide whether or not to take action.
              </p>
              <p className="ecl-u-type-paragraph">
                The rules and procedures governing the citizens' initiative are
                set out in an{' '}
                <a href="#" className="ecl-link">
                  EU Regulation
                </a>{' '}
                adopted by the European Parliament and the Council of the
                European Union in February 2011.
              </p>

              <h2 className="ecl-u-type-heading-2" id="inline-nav-2">
                What can be proposed as a citizens' initiative?
              </h2>
              <p className="ecl-u-type-paragraph">
                A citizens' initiative is possible in any field where the
                Commission has the power to propose legislation, for example
                environment, agriculture, transport or public health.
              </p>
              <p className="ecl-u-type-paragraph">
                <a href="#" className="ecl-link">
                  Lear more here
                </a>
              </p>

              <h2 className="ecl-u-type-heading-2" id="inline-nav-3">
                Who can organise a citizens' initiative and how?
              </h2>
              <p className="ecl-u-type-paragraph">
                In order to launch a citizens' initiative, citizens must form a
                "citizens' committee" composed of at least 7 EU citizens being
                resident in at least 7 different member states.
              </p>
              <p className="ecl-u-type-paragraph">
                The members of the citizens' committee must be EU citizens old
                enough to vote* in the European Parliament elections (18 years
                old, except in Austria &amp; Malta where the voting age is 16,
                and Greece where the voting age is 17).
              </p>
              <p className="ecl-u-type-paragraph">
                Citizens' initiatives cannot be run by organisations. However,
                organisations can promote or support initiatives provided that
                they do so with full transparency.
              </p>
              <p className="ecl-u-type-paragraph">
                The citizens' committee must register its initiative on this
                website before starting to collect statements of support from
                citizens. Once the registration is confirmed, organisers have
                one year to collect signatures.
              </p>
              <p className="ecl-u-type-paragraph">
                <em>
                  * Citizens do not need to be registered to vote, just old
                  enough.
                </em>
              </p>
              <p className="ecl-u-type-paragraph">
                <a href="#" className="ecl-link">
                  Lear more here
                </a>
              </p>

              <h2 className="ecl-u-type-heading-2" id="inline-nav-4">
                Who can sign up to a citizens' initiative and how?
              </h2>
              <p className="ecl-u-type-paragraph">
                All EU citizens (nationals of a member state) old enough to
                vote* in the European Parliament elections (18 years old, except
                in Austria &amp; Malta where the voting age is 16, and Greece
                where the voting age is 17) can sign a citizens' initiative.
              </p>
              <p className="ecl-u-type-paragraph">
                To give their support to an initiative, citizens have to fill in
                a specific statement of support form provided by the organisers,
                on paper or online. It is not possible to sign up to an
                initiative on this website.
              </p>
              <p className="ecl-u-type-paragraph">
                <em>
                  * Citizens do not need to be registered to vote, just old
                  enough.
                </em>
              </p>
              <p className="ecl-u-type-paragraph">
                <a href="#" className="ecl-link">
                  Lear more here
                </a>
              </p>

              <h2 className="ecl-u-type-heading-2" id="inline-nav-5">
                What happens when a citizens' initiative gets one million
                signatures?
              </h2>
              <p className="ecl-u-type-paragraph">
                The Commission will carefully examine the initiative. Within 3
                months after receiving the initiative:
              </p>
              <ul className="ecl-unordered-list">
                <li className="ecl-unordered-list__item">
                  Commission representatives will meet the organisers so they
                  can explain in detail the issues raised in their initiative
                </li>
                <li className="ecl-unordered-list__item">
                  the organisers will have the opportunity to present their
                  initiative at a public hearing in the European Parliament
                </li>
                <li className="ecl-unordered-list__item">
                  the Commission will adopt a formal response spelling out what
                  action it will propose in response to the citizens'
                  initiative, if any, and the reasons for doing or not doing so.
                </li>
              </ul>
              <p></p>
              <p className="ecl-u-type-paragraph">
                The response, which will take the form of a communication, will
                be formally adopted by the College of Commissioners and
                published in all official EU languages.
              </p>
              <p className="ecl-u-type-paragraph">
                The Commission is not obliged to propose legislation as a result
                of an initiative. If the Commission decides to put forward a
                legislative proposal, the normal legislative procedure kicks
                off: the Commission proposal is submitted to the legislator
                (generally the European Parliament and the Council or in some
                cases only the Council) and, if adopted, it becomes law.
              </p>
              <p className="ecl-u-type-paragraph">
                <a href="#" className="ecl-link">
                  Lear more here
                </a>
              </p>

              <div className="eci-more-info ecl-u-pa-m">
                <h2
                  className="ecl-u-type-heading-2 ecl-u-mt-none"
                  id="inline-nav-6"
                >
                  Want to know more about this topic?
                </h2>
                <ul className="ecl-unordered-list">
                  <li className="ecl-unordered-list__item">
                    Download the{' '}
                    <a href="#" className="ecl-link">
                      Guide to the European Citizens' Initiative
                    </a>
                  </li>
                  <li className="ecl-unordered-list__item">
                    <a href="#" className="ecl-link">
                      Additional link
                    </a>
                  </li>
                  <li className="ecl-unordered-list__item">
                    <a href="#" className="ecl-link">
                      Additional link
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export const query = graphql`
  query About($locale: String) {
    file(name: { eq: $locale }, relativeDirectory: { eq: "about" }) {
      childAboutJson {
        title
      }
    }
  }
`;

export default About;
