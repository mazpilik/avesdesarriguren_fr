import { BirdState } from './addBirdReducer';

export const prepareDataForSaving = (data: BirdState) => {
  const parsedData = {
    ...data.basicInfo,
    aditionalInfos: data.aditionalInfos,
    frecuency: data.frecuency,
    months: data.months,
  };
  return parsedData;
};
