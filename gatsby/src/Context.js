import React from 'react';

const contextStore = {
  data: {
    LanguageListOverlayIsHidden: true,
    translations: [],
  },
  set: () => {},
};

const Context = React.createContext(contextStore);

const { Consumer, Provider } = Context;

// Taken from https://www.gatsbyjs.org/packages/gatsby-plugin-layout/#passing-data-from-layout-to-page--from-page-to-layout
class ContextProvider extends React.Component {
  constructor() {
    super();

    this.setData = this.setData.bind(this);
    this.state = {
      ...contextStore,
      set: this.setData,
    };
  }

  setData(newData) {
    this.setState(state => ({
      data: {
        ...state.data,
        ...newData,
      },
    }));
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export { Context, Consumer as default, ContextProvider };
