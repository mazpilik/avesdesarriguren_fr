import React, { useRef } from 'react';

import { FileUpload } from 'primereact/fileupload';
import { fileUploadService } from 'src/services/fileUploadService';

export const BirdPhotos = () => {
  const fileUpload = useRef<FileUpload>(null);
  const myUpload = async (event: any) => {
    const { files } = event;
    files.forEach(async (file: any) => {
      await fileUploadService.upload(file);
    });
    clearFiles();
  };
  const clearFiles = () => {
    if (fileUpload.current) {
      fileUpload.current.clear();
    }
  };
  return (
    <div>

      <div className="card">
        <h5>Advanced</h5>
        <FileUpload ref={fileUpload} mode="basic" onUpload={clearFiles} multiple name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" accept="image/*" customUpload uploadHandler={myUpload} />
      </div>
    </div>
  );
};
