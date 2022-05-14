export type NewsDataT = {
  title: string;
  subtitle: string;
  body: string;
  lang: string
}
export type NewsState = {
  newsId?: number;
  step: number;
  userId: number;
  newsData: NewsDataT[];
}
export enum AddNewssActions {
  setBasicInfo = 'SET_BASIC_INFO',
  setAdditionalInfo = 'SET_ADDITIONAL_INFO',
  setNextStep = 'SET_NEXT_STEP',
  setPrevStep = 'SET_PREV_STEP',
  setLang='SET_LANG',
  setId = 'SET_ID',
  resetState = 'RESET_STATE',
}
export type NewsAction = {
  type: AddNewssActions;
  payload: any;
}

export const defaultNewsState: NewsState = {
  step: 0,
  userId: 0,
  newsData: [
    {
      title: '',
      subtitle: '',
      body: '',
      lang: 'es',
    },
    {
      title: '',
      subtitle: '',
      body: '',
      lang: 'eus',
    },
  ],
};

export const mockNews: NewsState = {
  step: 1,
  newsId: 30,
  userId: 1,
  newsData: [
    {
      title: 'aaaaa',
      subtitle: 'aaaaa',
      body: 'aaaaa',
      lang: 'es',
    },
    {
      title: 'eeeee',
      subtitle: 'eeeee',
      body: 'eeeee',
      lang: 'eus',
    },
  ],
};

export const addNewsReducer = (state: NewsState, { type, payload }: NewsAction): NewsState => {
  switch (type) {
    case AddNewssActions.setNextStep:
      return {
        ...state,
        step: state.step + 1,
      };
    case AddNewssActions.setPrevStep:
      return {
        ...state,
        step: state.step - 1,
      };
    case AddNewssActions.setAdditionalInfo:
      return {
        ...state,
        newsData: payload,
      };
    default:
      return state;
  }
};
