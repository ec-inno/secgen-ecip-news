module.exports = {
  // Used by gatsby-source-drupal-jsonapi-eci plugin for iterating language-specific endpoints.
  langs: ['en', 'bg', 'fr'],
  // For possible redirects. Used by gatsby-plugin-i18n.
  defaultLangKey: 'en',
  // As close as possible to https://github.com/ec-europa/europa-component-library/blob/v2-dev/src/systems/ec/specs/components/language-list/demo/data--splash.js.
  languages: [
    { lang: 'bg', label: 'български' },
    { lang: 'en', label: 'English' },
    { lang: 'fr', label: 'français' },
  ],
};
