import React from 'react';
import { Link as LinkInternal } from 'gatsby';
import LinkExternal from './Link/LinkEcl';

const ListItemNested = ({ item, id }) => {
  let children = null;

  if (item.children) {
    children = (
      <ul className="ecl-unordered-list">
        {item.children.map((item, key) => (
          <ListItemNested item={item} key={key} />
        ))}
      </ul>
    );
  }

  return (
    <li className="ecl-unordered-list__item" key={id}>
      {item.external ? (
        <LinkExternal
          href={item.href}
          className="ecl-link ecl-link--standalone"
        >
          {item.title}
        </LinkExternal>
      ) : (
        <LinkInternal to={item.href} className="ecl-link ecl-link--standalone">
          {item.title}
        </LinkInternal>
      )}
      {children}
    </li>
  );
};

export default ListItemNested;
