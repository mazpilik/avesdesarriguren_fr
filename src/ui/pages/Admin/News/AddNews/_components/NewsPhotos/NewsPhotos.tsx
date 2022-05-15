import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { useNotificationHook } from 'src/ui/_functions/hooks/useNotificationHook';

import { FileUpload } from 'primereact/fileupload';

import { fileUploadService } from 'src/services/fileUploadService';
import { i18nAtom } from 'src/ui/_functions/atoms/atoms';
import { AddNewssActions, NewsAction } from '../../_functions/addNewsReducer';

type Props = {
  newsId?: number | null;
  onSetData: React.Dispatch<NewsAction>
}
export const NewsPhotos: React.FC<Props> = ({ newsId, onSetData }) => {
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
      onSetData({ type: AddNewssActions.resetState, payload: null });
    } catch (error) {
      notifications.addErrorNotification(i18n.imageUploadError);
    } finally {
      clearFiles();
    }
  };
  const clearFiles = () => {
    if (fileUpload.current) {
      fileUpload.current.clear();
    }
  };
  return (
    <div>

      <div className="card">
        <h5>{i18n.uploadNewsImagesTitle}</h5>
        <FileUpload ref={fileUpload} mode="basic" onUpload={clearFiles} name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" accept="image/*" customUpload uploadHandler={myUpload} />
      </div>
    </div>
  );
};

NewsPhotos.defaultProps = {
  newsId: null,
};
