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
export type Bird = {
  birdId?: number;
  name: string;
  familyId: number;
  orderId: number;
  aditionalInfos: AditionalInfo[];
  frecuency: string [];
  months: number [];
}

export const mockBird: Bird = {
  birdId: 1,
  name: 'testerius testis',
  familyId: 33,
  orderId: 29,
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
