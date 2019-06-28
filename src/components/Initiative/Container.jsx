import React from 'react';
import axios from 'axios';
import classnames from 'classnames';
import { chunk } from 'lodash';

import Item from '../Initiative/Item';

class InitiativeContainer extends React.Component {
  state = {
    items: [],
    isLoading: true,
  };

  async componentDidMount() {
    const results = await axios.get('/initiative/get/open');

    const { initiative } = results.data;

    this.setState({ items: initiative, isLoading: false });
  }

  render() {
    const { isLoading, items } = this.state;

    if (isLoading) return <div>Loading initiatives ...</div>;

    const rowClass = 'ecl-row';
    const groups = Math.ceil(items.length / 3);

    return chunk(items, 3).map((group, k) => {
      // If it's either the first or last item, do not add 'md'.
      const rowSpacing =
        k === 0 || k + 1 === groups
          ? 'ecl-row ecl-u-mt-l'
          : 'ecl-row ecl-u-mt-md-l';

      const classNames = classnames(rowClass, rowSpacing);

      return (
        <div className={classNames} key={k}>
          {group.map((item, key) => (
            <div
              key={key}
              className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none"
            >
              <Item key={key} item={item} />
            </div>
          ))}
        </div>
      );
    });
  }
}

export default InitiativeContainer;
