import React from 'react';
import classnames from 'classnames';
import { chunk } from 'lodash';

import Item from '../Initiative/Item';

const List = ({ initiatives }) => {
  const rowClass = 'ecl-row';
  const groups = Math.ceil(initiatives.length / 3);

  return chunk(initiatives, 3).map((group, k) => {
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
};

export default List;
