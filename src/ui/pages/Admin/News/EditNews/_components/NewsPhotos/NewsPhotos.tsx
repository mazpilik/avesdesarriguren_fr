import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { uniqueId } from 'lodash';

import { Checkbox } from 'primereact/checkbox';

import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';

import { FileUpload } from 'primereact/fileupload';

import { fileUploadService } from 'src/services/fileUploadService';
import { i18nAtom } from 'src/ui/_functions/atoms/atoms';
import { NewsUpdateImageT } from 'src/domain/News';
import { UpdateNewsActions, NewsAction } from '../../_functions/updateNewsReducer';
import { BirdImageElement, ImagesWrapper } from './NewsPhotos.styles';

type Props = {
  newsId: number;
  photo: NewsUpdateImageT;
  onSetData: React.Dispatch<NewsAction>;
  onUploadImage: () => void;
}
export const NewsPhotos: React.FC<Props> = ({
  newsId, photo, onSetData, onUploadImage,
}) => {
  const i18n = useRecoilValue(i18nAtom);
  const notifications = useNotificationHook();
  const fileUpload = useRef<FileUpload>(null);

  const myUpload = async (event: any) => {
    try {
      const { files } = event;
      files.forEach(async (file: any) => {
        if (newsId) {
          // get file name
          const fileName = file.name;
          const response = await fileUploadService.newsUpload(file, newsId);
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
      onSetData({ type: UpdateNewsActions.resetState, payload: null });
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
  const updateImage = () => {
    onSetData({
      type: UpdateNewsActions.removeImage,
      payload: !photo.checked,
    });
  };
  return (
    <div>
      <h2>{i18n.birdImgUpdatingTitle}</h2>
      {photo.img && (
        <ul>
          <ImagesWrapper key={uniqueId()}>
            <BirdImageElement checked={photo.checked} alt={photo.img} src={`${process.env.REACT_APP_IMAGES_URL}/news/${photo.img}`} />
            <Checkbox onChange={updateImage} value={photo} checked={photo.checked} />
          </ImagesWrapper>
        </ul>
      )}

      <div className="card">
        <h5>{i18n.uploadNewsImagesTitle}</h5>
        <FileUpload ref={fileUpload} mode="basic" onUpload={clearFiles} name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" accept="image/*" customUpload uploadHandler={myUpload} />
      </div>
    </div>
  );
};
