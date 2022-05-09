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
  wingSpan: string;
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
export type BirdState = {
  birdId?: number;
  step: number;
  basicInfo: BasicInfoType;
  aditionalInfos: AditionalInfo[];
  frecuency: string [];
  months: number [];
}
export enum addBirdsActions {
  setBasicInfo = 'SET_BASIC_INFO',
  setAdditionalInfo = 'SET_ADDITIONAL_INFO',
  setNextStep = 'SET_NEXT_STEP',
  setPrevStep = 'SET_PREV_STEP',
  setLang='SET_LANG',
  setFrecuency = 'SET_FRECUENCY',
  setMonths = 'SET_MONTHS',
  setId = 'SET_ID',
}
export type BirdAction = {
  type: addBirdsActions;
  payload: any;
}

export const defaultBirdState: BirdState = {
  step: 0,
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
      wingSpan: '',
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
      wingSpan: '',
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
};

export const mockBird: BirdState = {
  step: 1,
  birdId: 1,
  basicInfo: {
    name: 'testerius testis',
    familyId: 33,
    orderId: 29,
  },
  aditionalInfos: [
    {
      lang: 'es',
      name: 'testerius testis',
      summary: 'testerius testis',
      birdLength: 'testerius testis',
      wingSpan: 'testerius testis',
      identification: 'testerius testis',
      singing: 'testerius testis',
      moving: 'testerius testis',
      habitat: 'testerius testis',
      feeding: 'testerius testis',
      reproduction: 'testerius testis',
      population: 'testerius testis',
      conservationThreats: 'testerius testis',
      worldDistribution: 'testerius testis',
      peninsulaDistribution: 'testerius testis',
    },
    {
      lang: 'eus',
      name: 'testerius testis',
      summary: 'testerius testis',
      birdLength: 'testerius testis',
      wingSpan: 'testerius testis',
      identification: 'testerius testis',
      singing: 'testerius testis',
      moving: 'testerius testis',
      habitat: 'testerius testis',
      feeding: 'testerius testis',
      reproduction: 'testerius testis',
      population: 'testerius testis',
      conservationThreats: 'testerius testis',
      worldDistribution: 'testerius testis',
      peninsulaDistribution: 'testerius testis',
    },
  ],
  frecuency: ['regular', 'resident'],
  months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
};

export const addBirdReducer = (state: BirdState, { type, payload }: BirdAction): BirdState => {
  switch (type) {
    case addBirdsActions.setBasicInfo:
      return {
        ...state,
        basicInfo: {
          ...state.basicInfo,
          [payload.key]: payload.value,
        },
      };
    case addBirdsActions.setAdditionalInfo:
      return {
        ...state,
        aditionalInfos: payload,
      };
    case addBirdsActions.setNextStep:
      return {
        ...state,
        step: state.step + 1,
      };
    case addBirdsActions.setPrevStep:
      return {
        ...state,
        step: state.step - 1,
      };
    case addBirdsActions.setFrecuency:
      return {
        ...state,
        frecuency: payload,
      };
    case addBirdsActions.setMonths:
      return {
        ...state,
        months: payload,
      };
    case addBirdsActions.setId:
      return {
        ...state,
        birdId: payload,
      };
    default:
      return state;
  }
};
