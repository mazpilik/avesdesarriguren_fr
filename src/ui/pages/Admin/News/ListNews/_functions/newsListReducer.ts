export enum NewsListActionTypes {
  setItemsPerPage = 'SET_ITEMS_PER_PAGE',
  setListType = 'SET_LIST_TYPE',
  setSortBy = 'SET_SORT_BY',
  setSortDirection = 'SET_SORT_DIRECTION',
  setPage = 'SET_PAGE',
  setSearchTerm = 'SET_SEARCH_TERM',
  setNews = 'SET_NEWS',
  setPaginationValues = 'SET_PAGINATION_VALUES',
  setLoading = 'SET_LOADING'
}

export type NewsInList = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  date: string;
}

export type NewsListState = {
  news: NewsInList[];
  itemsPerPage: number;
  listType: string;
  sortBy: string;
  sortDirection: string;
  page: number;
  searchTerm: string;
  totalRecords: number;
  totalPages: number;
  loading: boolean;
}

type IAction = {
  type: NewsListActionTypes;
  payload?: any;
}

export const defaultNewsListState: NewsListState = {
  news: [],
  itemsPerPage: 10,
  listType: 'list',
  sortBy: 'date',
  sortDirection: 'desc',
  page: 1,
  searchTerm: '',
  totalRecords: 0,
  totalPages: 0,
  loading: false,
};

export const newsListReducer = (
  state: NewsListState,
  action: IAction,
): NewsListState => {
  switch (action.type) {
    case NewsListActionTypes.setItemsPerPage:
      return {
        ...state,
        itemsPerPage: action.payload,
      };
    case NewsListActionTypes.setListType:
      return {
        ...state,
        listType: action.payload,
      };
    case NewsListActionTypes.setSortBy:
      return {
        ...state,
        sortBy: action.payload,
      };
    case NewsListActionTypes.setSortDirection:
      return {
        ...state,
        sortDirection: action.payload,
      };
    case NewsListActionTypes.setPage:
      return {
        ...state,
        page: action.payload,
      };
    case NewsListActionTypes.setSearchTerm:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case NewsListActionTypes.setNews:
      return {
        ...state,
        news: action.payload,
      };
    case NewsListActionTypes.setPaginationValues:
      return {
        ...state,
        totalRecords: action.payload.totalRecords,
        totalPages: action.payload.totalPages,
      };
    case NewsListActionTypes.setLoading:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
