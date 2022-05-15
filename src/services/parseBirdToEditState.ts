import {
  AditionalInfo, BasicInfoType, BirdState, BirdImage,
} from 'src/ui/pages/Admin/Bird/EditBird/_functions/updateBirdReducer';

export const parseBirdToEditSTate = (bird: any): BirdState => {
  const {
    id,
    name,
    familyId,
    orderId,
    frecuency,
    months,
    images: rawImages,
    birdData,
  } = bird;
  const basicInfo: BasicInfoType = {
    name,
    familyId,
    orderId,
  };
  const aditionalInfosParsed: AditionalInfo[] = birdData.map(
    ({
      lang,
      name,
      summary,
      birdLength,
      wingspan,
      identification,
      singing,
      moving,
      habitat,
      feeding,
      reproduction,
      population,
      conservationThreats,
      worldDistribution,
      peninsulaDistribution,
    }:AditionalInfo) => ({
      lang,
      name,
      summary,
      birdLength,
      wingspan,
      identification,
      singing,
      moving,
      habitat,
      feeding,
      reproduction,
      population,
      conservationThreats,
      worldDistribution,
      peninsulaDistribution,
    }),
  );
  const images: BirdImage[] = rawImages.map((image: any) => ({
    img: image.img,
    checked: true,
  }));
  console.log('adicionalInfosParsed', aditionalInfosParsed);
  const birdState: BirdState = {
    birdId: id,
    basicInfo,
    aditionalInfos: aditionalInfosParsed,
    frecuency,
    months,
    images,
  };
  return birdState;
};
