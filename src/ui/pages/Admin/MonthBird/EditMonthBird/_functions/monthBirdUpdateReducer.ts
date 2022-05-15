import { MonthBirdState } from 'src/domain/MonthBird';

type MonthBirdAction = {
  type: string,
  payload: any,
}

export enum MonthBirdActionType {
  monthBirdUpdate='UPDATE_MONTH_BIRD',
  setState='SET_STATE',
}

export const mbDefaultState: MonthBirdState = {
  month: 0,
  birdId: 0,
  contentEs: '',
  contentEus: '',
};

export const monthBirdUpdateReducer = (
  state: MonthBirdState,
  { type, payload }: MonthBirdAction,
) => {
  switch (type) {
    case MonthBirdActionType.monthBirdUpdate:
      return {
        ...state,
        [payload.key]: payload.value,
      };
    case MonthBirdActionType.setState:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
