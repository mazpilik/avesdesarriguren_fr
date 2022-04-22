import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { faList, faBorderAll } from '@fortawesome/free-solid-svg-icons';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

import {
  ToolbarWrapper, Filters, Sorting, ListType, OrderBy, SortOrder, ItemsPerPage,
} from './ListToolbar.styles';

const SortingValues = {
  ASC: 'asc',
  DESC: 'desc',
  ALPHA: 'A-Z',
  LIST: 'list',
  GRID: 'grid',
  DATE: 'date',
};

interface Props {
  listState: any;
  onSetListState: any;
}
export const ListToolbar: FC<Props> = ({ listState, onSetListState }) => {
  const i18n = useRecoilValue(i18nAtom);

  const getFilters = () => '';

  const sortingOptions = [
    { label: i18n.sortAlphabetically, value: SortingValues.ALPHA },
    { label: i18n.sortByDate, value: SortingValues.DATE },
  ];
  const directionOptions = [
    { label: i18n.ascending, value: SortingValues.ASC },
    { label: i18n.descending, value: SortingValues.DESC },
  ];
  const itemsPerPageOptions = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
    { label: i18n.all, value: listState.totalRecords },
  ];

  return (
    <ToolbarWrapper>
      <Filters>{getFilters()}</Filters>
      <Sorting>
        <OrderBy
          options={sortingOptions}
          placeholder={i18n.sortBy}
          onChange={(e) => onSetListState({ name: 'sortBy', value: e.target.value })}
          value={listState.sortBy}
        />
        <SortOrder
          options={directionOptions}
          placeholder={i18n.sortOrder}
          onChange={(e) => onSetListState({ name: 'sortDirection', value: e.target.value })}
          value={listState.sortDirection}
        />
        <ItemsPerPage
          onChange={(e) => onSetListState({ name: 'itemsPerpage', value: e.target.value })}
          options={itemsPerPageOptions}
          value={listState.itemsPerpage}
        />
        <ListType
          onClick={() => onSetListState({ name: 'listType', value: listState.listType === 'grid' ? 'list' : 'grid' })}
          icon={listState.listType === SortingValues.GRID ? faBorderAll : faList}
        />
      </Sorting>
    </ToolbarWrapper>
  );
};
