interface IOrderState {
  error: null | string,
  itemsPerpage: number,
  listType: string,
  loading: boolean,
  orders: any[],
  page: number,
  sortBy: string,
  sortDirection: string,
  totalPages: number,
  totalRecords: number,
}

interface IAction {
  type: string;
  payload: any;
}

export const ordersActions = {
  setLogin: 'SET_LOGIN',
  setOrders: 'SET_ORDERS',
  setPaginationValues: 'SET_PAGINATION_VALUES',
  setItemsPerPage: 'SET_ITEMS_PER_PAGE',
  setListType: 'SET_LIST_TYPE',
  setSortBy: 'SET_SORT_BY',
  setSortDirection: 'SET_SORT_DIRECTION',
  setPage: 'SET_PAGE',
};

export const ordersReducer = (state: IOrderState, action: IAction): IOrderState => {
  switch (action.type) {
    case ordersActions.setOrders:
      return {
        ...state,
        orders: action.payload,
        loading: true,
      };
    case ordersActions.setLogin:
      return {
        ...state,
        loading: action.payload,
      };
    case ordersActions.setPaginationValues:
      return {
        ...state,
        ...action.payload,
      };
    case ordersActions.setPage:
      return {
        ...state,
        page: action.payload,
      };
    case ordersActions.setItemsPerPage:
      return {
        ...state,
        itemsPerpage: action.payload,
      };
    case ordersActions.setListType:
      return {
        ...state,
        listType: action.payload,
      };
    case ordersActions.setSortBy:
      return {
        ...state,
        sortBy: action.payload,
      };
    case ordersActions.setSortDirection:
      return {
        ...state,
        sortDirection: action.payload,
      };
    default:
      return state;
  }
};
