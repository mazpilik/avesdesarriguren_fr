import React, { FC, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { faList, faBorderAll } from '@fortawesome/free-solid-svg-icons';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

import {
  Filters, ItemsPerPage, ListType, OrderBy, Sorting, SortOrder, ToolbarWrapper,
} from './ListToolbar.styles';

interface Props {
  itemsPerpage: number;
  listType: string;
  onSetListState: any;
  sortBy: string;
  sortDirection: string;
  totalRecords: number;
}
export const ListToolbar: FC<Props> = ({
  itemsPerpage,
  listType,
  onSetListState,
  sortBy,
  sortDirection,
  totalRecords,
}) => {
  const i18n = useRecoilValue(i18nAtom);

  const [sortingOptions, setSortingOptions] = useState([] as any);
  const [directionOptions, setDirectionOptions] = useState([] as any);
  const [itemsPerpageOptions, setItemsPerpageOptions] = useState([] as any);
  const sortingValues = {
    ASC: 'asc',
    DESC: 'desc',
    ALPHA: 'A-Z',
    LIST: 'list',
    GRID: 'grid',
    DATE: 'date',
  };

  useEffect(() => {
    if (i18n) {
      setSortingOptions([
        {
          label: i18n.sortAlphabetically,
          value: sortingValues.ALPHA,
        },
        {
          label: i18n.sortByDate,
          value: sortingValues.DATE,
        },
      ]);
      setDirectionOptions([
        { label: i18n.ascending, value: sortingValues.ASC },
        { label: i18n.descending, value: sortingValues.DESC },
      ]);
      setItemsPerpageOptions([
        { label: '10', value: 10 },
        { label: '20', value: 20 },
        { label: '50', value: 50 },
        { label: '100', value: 100 },
        { label: i18n.all, value: totalRecords },
      ]);
    }
  }, [i18n]);

  return (
    <ToolbarWrapper>
      <Filters />
      <Sorting>
        <OrderBy
          options={sortingOptions}
          placeholder={i18n.sortBy}
          onChange={(e) => onSetListState({ name: 'sortBy', value: e.target.value })}
          value={sortBy}
        />
        <SortOrder
          options={directionOptions}
          placeholder={i18n.sortOrder}
          onChange={(e) => onSetListState({ name: 'sortDirection', value: e.target.value })}
          value={sortDirection}
        />

        <ItemsPerPage
          onChange={(e) => onSetListState({ name: 'itemsPerpage', value: e.target.value })}
          options={itemsPerpageOptions}
          value={itemsPerpage}
        />
        <ListType
          onClick={() => onSetListState({
            name: 'listType',
            value: listType === sortingValues.GRID ? sortingValues.LIST : sortingValues.GRID,
          })}
          icon={listType === sortingValues.GRID ? faList : faBorderAll}
        />
      </Sorting>
    </ToolbarWrapper>
  );
};
