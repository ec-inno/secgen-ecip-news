import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import classnames from 'classnames';
import { chunk } from 'lodash';

import Item from '../Initiative/Item';
import New from '../Initiative/New';

// Possible to export to other dependees.
const OPEN = 'OPEN';
const SUCCESSFUL = 'SUCCESSFUL';

const List = ({ initiatives, location }) => {
  const page = [];
  const itemsPerRow = 3;
  const itemsToDisplay = 8;
  const rowClass = 'ecl-row';

  const latest = initiatives
    .filter(initiative => initiative.searchEntry.status)
    .slice(0, itemsToDisplay);

  const ongoing = initiatives
    .filter(initiative => initiative.searchEntry.status === OPEN)
    .slice(0, itemsToDisplay);

  const answered = initiatives
    .filter(initiative => initiative.searchEntry.status === SUCCESSFUL)
    .slice(0, itemsToDisplay);

  const all = initiatives.slice(0, 20);

  const tabs = {
    latest: {
      label: 'Latest',
      items: latest,
    },
    ongoing: {
      label: 'Ongoing',
      items: ongoing,
    },
    answered: {
      label: 'Answered',
      items: answered,
    },
    all: {
      label: 'All',
      items: all,
    },
  };

  const groups = Math.ceil(latest.length / itemsPerRow);

  chunk(latest, itemsPerRow).map((group, k) => {
    const groupLength = group.length;
    // If it's either the first or last item, do not add 'md'.
    const rowSpacing =
      k === 0 || k + 1 === groups ? 'ecl-u-mt-l' : 'ecl-u-mt-md-l';

    const classNames = classnames(rowClass, rowSpacing);

    page.push(
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

  return page;
};

export default List;
