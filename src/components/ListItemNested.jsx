import React from 'react';
import PropTypes from 'prop-types';
import { Link as LinkInternal } from 'gatsby';
import LinkExternal from './Link/LinkEcl';

const ListItemNested = ({ item, id }) => {
  const accepted = ['href', 'title', 'external'];

  if (!item) return '';

  let ul = null;
  const children = {};

  Object.keys(item).forEach(prop => {
    if (!accepted.includes(prop)) {
      children[prop] = item[prop];
    }
  });

  if (Object.keys(children).length) {
    ul = (
      <ul className="ecl-unordered-list">
        {Object.keys(children).map((childPath, key) => (
          <ListItemNested item={children[childPath]} key={key} />
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
      {ul}
    </li>
  );
};

ListItemNested.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string,
    external: PropTypes.bool,
  }),
  id: PropTypes.string,
};

export default ListItemNested;
