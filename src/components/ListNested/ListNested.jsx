import React from 'react';
import Item from './Item';

const ListNested = ({ list }) => {
  if (!list || Object.keys(list).length === 0) {
    return '';
  }

  return (
    <ul className="ecl-unordered-list">
      {Object.keys(list)
        .sort()
        .map((item, id) => (
          <Item item={list[item]} key={id} id={id} />
        ))}
    </ul>
  );
};

export default ListNested;
