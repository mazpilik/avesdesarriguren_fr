export type NewsDataT = {
  title: string;
  subtitle: string;
  body: string;
  lang: string
}
export type NewsImageT = {
  img: string;
  checked: boolean;
}
export type NewsState = {
  newsId: number;
  userId: number;
  newsData: NewsDataT[];
  img: NewsImageT;
}
export enum UpdateNewsActions {
  setBasicInfo = 'SET_BASIC_INFO',
  setAdditionalInfo = 'SET_ADDITIONAL_INFO',
  setLang='SET_LANG',
  setId = 'SET_ID',
  resetState = 'RESET_STATE',
  setUserId = 'SET_USER_ID',
  setAllState = 'SET_ALL_STATE',
  removeImage = 'REMOVE_IMAGE',
}
export type NewsAction = {
  type: UpdateNewsActions;
  payload: any;
}

export const defaultNewsState: NewsState = {
  newsId: 0,
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
  img: {
    img: '',
    checked: false,
  },
};

export const mockNews: NewsState = {
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
  img: {
    img: '',
    checked: false,
  },
};

export const updateNewsReducer = (state: NewsState, { type, payload }: NewsAction): NewsState => {
  switch (type) {
    case UpdateNewsActions.setAllState:
      return {
        ...state,
        ...payload,
      };
    case UpdateNewsActions.setAdditionalInfo:
      return {
        ...state,
        newsData: payload,
      };
    case UpdateNewsActions.setId:
      return {
        ...state,
        newsId: payload,
      };
    case UpdateNewsActions.setUserId:
      return {
        ...state,
        userId: payload,
      };
    case UpdateNewsActions.resetState:
      return defaultNewsState;
    case UpdateNewsActions.removeImage:
      return {
        ...state,
        img: {
          ...state.img,
          checked: payload,
        },
      };
    default:
      return state;
  }
};
