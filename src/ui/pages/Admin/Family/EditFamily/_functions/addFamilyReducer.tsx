interface IFamilyState {
  id: number;
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
  setFamilyAndOrder: 'SET_FAMILY_AND_ORDER',
};

export const addFamilyReducer = (state: IFamilyState, action: IAction): IFamilyState => {
  switch (action.type) {
    case familyActions.setFamily:
      return { ...state, family: action.payload };
    case familyActions.setOrder:
      return { ...state, order: action.payload };
    case familyActions.setFamilyAndOrder:
      return {
        ...state,
        id: action.payload.id,
        family: action.payload.family,
        order: action.payload.order,
      };
    default:
      return state;
  }
};
