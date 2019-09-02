import React, { Component } from 'react';
import { I18nextProvider } from 'react-i18next';

import I18nECI from '../context/I18n';
import setupI18next from './setupI18next';

const withI18next = () => Comp => {
  class I18nHOC extends Component {
    constructor(props) {
      super(props);

      this.i18n = setupI18next();
      this.changeLanguage();
    }

    changeLanguage = () => {
      const { pageContext } = this.props;

      this.addResources(pageContext);
      this.i18n.changeLanguage(pageContext.locale);
    };

    // @see https://www.i18next.com/overview/api#resource-handling
    // `translation` is the default NS we use consistently.
    addResources = pageContext => {
      if (pageContext && pageContext.localeData) {
        const { locale: lng, localeData } = pageContext;

        if (!this.i18n.hasResourceBundle(lng, 'translation')) {
          this.i18n.addResourceBundle(lng, 'translation', localeData);
        }
      }
    };

    componentDidUpdate(prevProps) {
      if (this.props.pageContext.locale !== prevProps.pageContext.locale) {
        this.changeLanguage();
      }
    }

    render() {
      return (
        <I18nextProvider i18n={this.i18n}>
          <I18nECI.Provider
            value={{
              locale: this.props.pageContext.locale,
              location: this.props.location,
            }}
          >
            <Comp {...this.props} />
          </I18nECI.Provider>
        </I18nextProvider>
      );
    }
  }

  return I18nHOC;
};

export default withI18next;
