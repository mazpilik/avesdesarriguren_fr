import { BirdForUpdate } from 'src/domain/Bird';
import { BirdState } from './updateBirdReducer';

export const prepareDataForUpdate = (data: BirdState) => {
  // parse images to get only checked images
  const imagesToUPdate = data.images.filter((image) => image.checked);
  const images = imagesToUPdate.map((image) => image.img);

  const parsedData: BirdForUpdate = {
    id: data.birdId,
    name: data.basicInfo.name,
    familyId: data.basicInfo.familyId,
    birdData: data.aditionalInfos,
    frecuency: data.frecuency,
    months: data.months,
    images,
  };
  return parsedData;
};
