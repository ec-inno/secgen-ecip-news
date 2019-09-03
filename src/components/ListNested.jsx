import React from 'react';
import ListItemNested from './ListItemNested';

const ListNested = ({ list }) =>
  list && Object.keys(list).length ? (
    <ul className="ecl-unordered-list">
      {Object.keys(list).map((item, id) => (
        <ListItemNested item={list[item]} id={id} />
      ))}
    </ul>
  ) : (
    ''
  );

export default ListNested;
