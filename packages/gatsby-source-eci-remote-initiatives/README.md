# gatsby-source-eci-remote-initiatives

Source plugin to fetch data from an external RESTful API and create content in Gatsby.js.

## Usage

Enable the plugin in your `gatsby-config.js` file:

```js
{
  resolve: "gatsby-source-eci-remote-initiatives",
  options: {
    endpoint: "http://ec.europa.eu/citizens-initiative/services/initiative"
  }
}
```

Make a GraphQL query and use the data in your component:

```js
import React from 'react';
import { graphql } from 'gatsby';

const Initiatives = ({ data }) => {
  const initiatives = data.allInitiatives.nodes;
  return <></>;
};

export const query = graphql`
  query getAllInitiatives {
    allInitiatives {
      nodes {
        id
        year
        number
        registrationNumber
        registrationDate
        fundingSponsors {
          total
        }
        organisers {
          organiser {
            fullname
            email
            role
          }
        }
        searchEntry {
          title
          withdrawnOn
          status
          registrationNumber
          deadlineForCollection
          closedOn
        }
      }
    }
  }
`;

export default Initiatives;
```
