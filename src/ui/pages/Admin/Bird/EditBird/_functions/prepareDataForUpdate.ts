import { BirdForUpdate } from 'src/domain/Bird';
import { BirdState } from './updateBirdReducer';

export const prepareDataForUpdate = (data: BirdState) => {
  const parsedData: BirdForUpdate = {
    id: data.birdId,
    name: data.basicInfo.name,
    family_id: data.basicInfo.familyId,
    additionalData: data.aditionalInfos,
    frecuency: data.frecuency,
    months: data.months,
  };
  return parsedData;
};
