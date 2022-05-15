export enum listActions {
  setItemsPerPage = 'SET_ITEMS_PER_PAGE',
  setListType = 'SET_LIST_TYPE',
  setSortBy = 'SET_SORT_BY',
  setSortDirection = 'SET_SORT_DIRECTION',
  setPage = 'SET_PAGE',
  setSearchTerm = 'SET_SEARCH_TERM',
  setBirds = 'SET_BIRDS',
  setPaginationValues = 'SET_PAGINATION_VALUES',
  setLoading = 'SET_LOADING',
}

export type BirdInList = {
  id: number;
  name: string;
  order: string;
  family: string;
  image: string;
}

export interface IListState {
  birds: BirdInList[];
  itemsPerpage: number;
  listType: string;
  sortBy: string;
  sortDirection: string;
  page: number;
  searchTerm: string;
  totalRecords: number;
  totalPages: number;
  loading: boolean;
}

interface IAction {
  type: string;
  payload: any;
}

export const defaultListState: IListState = {
  birds: [],
  itemsPerpage: 10,
  listType: 'list',
  sortBy: 'name',
  sortDirection: 'asc',
  page: 1,
  searchTerm: '',
  totalRecords: 0,
  totalPages: 0,
  loading: false,
};

export const listReducer = (state: IListState, { type, payload }: IAction): IListState => {
  switch (type) {
    case listActions.setItemsPerPage:
      return {
        ...state,
        itemsPerpage: payload,
      };
    case listActions.setListType:
      return {
        ...state,
        listType: payload,
      };
    case listActions.setSortBy:
      return {
        ...state,
        sortBy: payload,
      };
    case listActions.setSortDirection:
      return {
        ...state,
        sortDirection: payload,
      };
    case listActions.setPage:
      return {
        ...state,
        page: payload,
      };
    case listActions.setSearchTerm:
      return {
        ...state,
        searchTerm: payload,
      };
    case listActions.setBirds:
      return {
        ...state,
        birds: payload,
      };
    case listActions.setPaginationValues:
      return {
        ...state,
        ...payload,
      };
    case listActions.setLoading:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};
