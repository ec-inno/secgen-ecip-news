import React, { Fragment } from "react"
import Layout from "../components/Layout"

const Homepage = ({ data }) => {
  const initiatives = data.allInitiatives.edges

  return (
    <Layout>
      {initiatives.map(initiativeNode => {
        const { node } = initiativeNode
        const { id, title, field_main_objectives } = node

        return (
          <Fragment>
            <h2 class="ecl-u-type-heading-2">{title}</h2>
            <p
              key={id}
              className="ecl-paragraph"
              dangerouslySetInnerHTML={{
                __html: field_main_objectives.processed,
              }}
            />
          </Fragment>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  {
    allInitiatives {
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
        }
      }
    }
  }
`

export default Homepage
