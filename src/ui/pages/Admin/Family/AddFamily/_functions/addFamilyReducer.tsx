interface IFamilyState {
  order: number;
  family: string;
}
interface IAction {
  type: string;
  payload: any;
}

export const familyActions = {
  setFamily: 'SET_FAMILY',
  setOrder: 'SET_ORDERS',
};

export const addFamilyReducer = (state: IFamilyState, action: IAction): IFamilyState => {
  switch (action.type) {
    case familyActions.setFamily:
      return { ...state, family: action.payload };
    case familyActions.setOrder:
      return { ...state, order: action.payload };
    default:
      return state;
  }
};
