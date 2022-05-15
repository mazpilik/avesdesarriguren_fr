import { BirdState } from './addBirdReducer';

export const prepareDataForSaving = (data: BirdState) => {
  const parsedData = {
    name: data.basicInfo.name,
    family_id: data.basicInfo.familyId,
    additionalData: data.aditionalInfos,
    frecuency: data.frecuency,
    months: data.months,
  };
  return parsedData;
};
