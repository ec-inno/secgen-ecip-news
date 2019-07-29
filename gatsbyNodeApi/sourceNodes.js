const sourceNodes = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type node__faq implements Node {
      title: String
      langcode: String
      translations: [Path!]!
      relationships: FaqEntryRelationship!
    }
    type FaqEntryRelationship {
      field_faq_entries: [FaqEntry]
    }
    type FaqEntry implements Node {
      title: String
      field_answer: ProcessedField
      langcode: String!
      translations: [Path!]!
    }
    type node__oe_news implements Node {
      title: String
      path: Path!
      oe_teaser: ProcessedField!
      oe_summary: ProcessedField!
      field_source: LinkField!
      langcode: String!
      oe_publication_date: Date
      body: ProcessedField!
      translations: [Path!]!
    }
    type Path {
      alias: String!
      langcode: String!
    }
    type ProcessedField {
      processed: String!
    }
    type LinkField {
      title: String
      uri: String
    }
    type NodeTranslation implements Node {
      title: String
      path: Path!
      langcode: String
      translations: [Path!]!
    }
  `;

  return createTypes(typeDefs);
};

module.exports = sourceNodes;
