import React from 'react';
import { Link as LinkInternal } from 'gatsby';
import LinkExternal from './Link/LinkEcl';

const ListItemNested = ({ item, id }) => {
  let children = null;
  const props = ['href', 'hrefNew', 'title', 'hrefFormatted', 'external'];

  const itemChildren = Object.keys(item).filter(
    child => !props.includes(child)
  );

  if (itemChildren) {
    children = (
      <ul className="ecl-unordered-list">
        {itemChildren.map((childPath, key) => (
          <ListItemNested item={item[childPath]} key={key} />
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
