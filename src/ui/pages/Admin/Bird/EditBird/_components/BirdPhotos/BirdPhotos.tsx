import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { uniqueId } from 'lodash';

import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox';

import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';

import { FileUpload } from 'primereact/fileupload';

import { fileUploadService } from 'src/services/fileUploadService';
import { i18nAtom } from 'src/ui/_functions/atoms/atoms';
import { updateBirdsActions, BirdAction, BirdImage } from '../../_functions/updateBirdReducer';
import { BirdImageElement, ImagesWrapper } from './BirdPhotos.styles';

type Props = {
  birdId: number;
  photos: BirdImage[];
  onSetData: React.Dispatch<BirdAction>
  onUploadImage: () => void;
}
export const BirdPhotos: React.FC<Props> = ({
  birdId,
  photos,
  onSetData,
  onUploadImage,
}) => {
  const i18n = useRecoilValue(i18nAtom);
  const notifications = useNotificationHook();
  const fileUpload = useRef<FileUpload>(null);

  const myUpload = async (event: any) => {
    try {
      const { files } = event;
      files.forEach(async (file: any) => {
        if (birdId) {
          // get file name
          const fileName = file.name;
          const response = await fileUploadService.birdUpload(file, birdId);
          switch (response) {
            case 'SUCCESS_FILE_UPLOAD':
              notifications.addSuccessNotification(i18n.successFileUploaded);
              break;
            case 'ERROR_DUPLICATE_RECORD':
              notifications.addErrorNotification(`${i18n.errorDuplicatedImage}: ${fileName}`);
              break;
            default:
              notifications.addErrorNotification(i18n.errorFileUpload);
              break;
          }
        }
      });
    } catch (error) {
      notifications.addErrorNotification(i18n.imageUploadError);
    } finally {
      onUploadImage();
      clearFiles();
    }
  };

  const clearFiles = () => {
    if (fileUpload.current) {
      fileUpload.current.clear();
    }
  };

  const updateImage = (e: CheckboxChangeParams) => {
    const { value } = e.target;
    // find image in photos
    const image = photos.find((photo) => photo === value);
    if (image) {
      image.checked = !image.checked;
    }
    onSetData({
      type: updateBirdsActions.removeImage,
      payload: photos,
    });
  };

  return (
    <div>
      <h2>{i18n.birdImgUpdatingTitle}</h2>
      <ul>
        {photos.map((photo) => (
          <ImagesWrapper key={uniqueId()}>
            <BirdImageElement checked={photo.checked} alt={photo.img} src={`${process.env.REACT_APP_IMAGES_URL}/birds/${photo.img}`} />
            <Checkbox onChange={updateImage} value={photo} checked={photo.checked} />
          </ImagesWrapper>
        ))}
      </ul>

      <div className="card">
        <h5>{i18n.addImagesTitle}</h5>
        <FileUpload ref={fileUpload} mode="basic" onUpload={clearFiles} multiple name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" accept="image/*" customUpload uploadHandler={myUpload} />
      </div>
    </div>
  );
};
