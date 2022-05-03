interface IFamilyState {
  error: null | string,
  itemsPerpage: number,
  listType: string,
  loading: boolean,
  families: any[],
  page: number,
  sortBy: string,
  sortDirection: string,
  totalPages: number,
  totalRecords: number,
  searchTerm: string,
}

interface IAction {
  type: string;
  payload: any;
}

export const familiesActions = {
  setLogin: 'SET_LOGIN',
  setFamilies: 'SET_FAMILIES',
  setPaginationValues: 'SET_PAGINATION_VALUES',
  setItemsPerPage: 'SET_ITEMS_PER_PAGE',
  setListType: 'SET_LIST_TYPE',
  setSortBy: 'SET_SORT_BY',
  setSortDirection: 'SET_SORT_DIRECTION',
  setPage: 'SET_PAGE',
  setSearchTerm: 'SET_SEARCH_TERM',
};

export const familiesReducer = (state: IFamilyState, action: IAction): IFamilyState => {
  switch (action.type) {
    case familiesActions.setFamilies:
      return {
        ...state,
        families: action.payload,
        loading: true,
      };
    case familiesActions.setLogin:
      return {
        ...state,
        loading: action.payload,
      };
    case familiesActions.setPaginationValues:
      return {
        ...state,
        ...action.payload,
      };
    case familiesActions.setPage:
      return {
        ...state,
        page: action.payload,
      };
    case familiesActions.setItemsPerPage:
      return {
        ...state,
        itemsPerpage: action.payload,
      };
    case familiesActions.setListType:
      return {
        ...state,
        listType: action.payload,
      };
    case familiesActions.setSortBy:
      return {
        ...state,
        sortBy: action.payload,
      };
    case familiesActions.setSortDirection:
      return {
        ...state,
        sortDirection: action.payload,
      };
    case familiesActions.setSearchTerm:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};
