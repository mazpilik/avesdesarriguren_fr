export type BasicInfoType = {
  name: string;
  familyId: number;
  orderId: number;
}
export type AditionalInfo = {
  lang: string;
  name: string;
  summary: string;
  birdLength: string;
  wingspan: string;
  identification: string;
  singing: string;
  moving: string;
  habitat: string;
  feeding: string;
  reproduction: string;
  population: string;
  conservationThreats: string;
  worldDistribution: string;
  peninsulaDistribution: string;
}
export type BirdImage = {
  img: string;
  checked: boolean;
}
export type BirdState = {
  birdId: number;
  basicInfo: BasicInfoType;
  aditionalInfos: AditionalInfo[];
  frecuency: string [];
  months: number [];
  images: BirdImage [];
}
export enum updateBirdsActions {
  setBasicInfo = 'SET_BASIC_INFO',
  setAdditionalInfo = 'SET_ADDITIONAL_INFO',
  setLang='SET_LANG',
  setFrecuency = 'SET_FRECUENCY',
  setMonths = 'SET_MONTHS',
  setId = 'SET_ID',
  resetState = 'RESET_STATE',
  setAllState = 'SET_ALL_STATE',
  removeImage = 'REMOVE_IMAGE',
}
export type BirdAction = {
  type: updateBirdsActions;
  payload: any;
}

export const defaultBirdState: BirdState = {
  birdId: 0,
  basicInfo: {
    name: '',
    familyId: 0,
    orderId: 0,
  },
  aditionalInfos: [
    {
      lang: 'es',
      name: '',
      summary: '',
      birdLength: '',
      wingspan: '',
      identification: '',
      singing: '',
      moving: '',
      habitat: '',
      feeding: '',
      reproduction: '',
      population: '',
      conservationThreats: '',
      worldDistribution: '',
      peninsulaDistribution: '',
    },
    {
      lang: 'eus',
      name: '',
      summary: '',
      birdLength: '',
      wingspan: '',
      identification: '',
      singing: '',
      moving: '',
      habitat: '',
      feeding: '',
      reproduction: '',
      population: '',
      conservationThreats: '',
      worldDistribution: '',
      peninsulaDistribution: '',
    },
  ],
  frecuency: [],
  months: [],
  images: [],
};

export const updateBirdReducer = (state: BirdState, { type, payload }: BirdAction): BirdState => {
  switch (type) {
    case updateBirdsActions.setBasicInfo:
      return {
        ...state,
        basicInfo: {
          ...state.basicInfo,
          [payload.key]: payload.value,
        },
      };
    case updateBirdsActions.setAdditionalInfo:
      return {
        ...state,
        aditionalInfos: payload,
      };
    case updateBirdsActions.setFrecuency:
      return {
        ...state,
        frecuency: payload,
      };
    case updateBirdsActions.setMonths:
      return {
        ...state,
        months: payload,
      };
    case updateBirdsActions.setId:
      return {
        ...state,
        birdId: payload,
      };
    case updateBirdsActions.resetState:
      return defaultBirdState;
    case updateBirdsActions.setAllState:
      return payload;
    case updateBirdsActions.removeImage:
      return {
        ...state,
        images: payload,
      };
    default:
      return state;
  }
};
