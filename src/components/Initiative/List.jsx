import React from 'react';
import classnames from 'classnames';
import { chunk } from 'lodash';

import Item from '../Initiative/Item';
import New from '../Initiative/New';

const List = ({ initiatives, location }) => {
  const itemsPerRow = 3;
  const rowClass = 'ecl-row';

  const filter = 'OPEN';
  let items = 8;

  const filtered = initiatives
    .filter(initiative => initiative.searchEntry.status === filter)
    .slice(0, items);

  const groups = Math.ceil(filtered.length / itemsPerRow);

  return chunk(filtered, itemsPerRow).map((group, k) => {
    const groupLength = group.length;
    // If it's either the first or last item, do not add 'md'.
    const rowSpacing =
      k === 0 || k + 1 === groups ? 'ecl-u-mt-l' : 'ecl-u-mt-md-l';

    const classNames = classnames(rowClass, rowSpacing);

    return (
      <div className={classNames} key={k}>
        {group.map((item, key) => {
          const list = [];

          list.push(
            <div
              key={key}
              className="ecl-col-sm-12 ecl-col-md-4 ecl-u-mt-s ecl-u-mt-md-none"
            >
              <Item key={key} item={item} />
            </div>
          );

          if (k + 1 === groups && key + 1 === groupLength) {
            list.push(<New key={key + 1} location={location} />);
          }

          return list;
        })}
      </div>
    );
  });
};

export default List;
