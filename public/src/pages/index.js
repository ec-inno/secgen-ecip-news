import React from "react"

const Homepage = ({ data }) => {
  const initiatives = data.allInitiatives.edges
  return initiatives.map(initiativeNode => {
    const { node } = initiativeNode

    return (
      <p
        key={node.id}
        className="ecl-paragraph"
        dangerouslySetInnerHTML={{
          __html: node.field_main_objectives.processed,
        }}
      />
    )
  })
}

export const query = graphql`
  {
    allInitiatives {
      edges {
        node {
          id
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
