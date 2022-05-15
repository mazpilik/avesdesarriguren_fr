// import axios from 'axios';

export const fileUploadService = {
  birdUpload: async (files:any, birdId:number) => {
    const formData = new FormData();
    formData.append('files', files);
    // get sessionStorage object
    const user = sessionStorage.getItem('user') || '';
    const { token } = JSON.parse(user);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/fileupload/bird/${birdId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      if (response.status === 200) {
        const message = await response.json();
        return message;
      }
      const message = await response.json();
      return message;
    } catch (error) {
      // throw error;
      return error;
    }
  },
  newsUpload: async (files:any, newsId:number) => {
    const formData = new FormData();
    formData.append('files', files);
    // get sessionStorage object
    const user = sessionStorage.getItem('user') || '';
    const { token } = JSON.parse(user);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/fileupload/news/${newsId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      if (response.status === 200) {
        const message = await response.json();
        return message;
      }
      const message = await response.json();
      return message;
    } catch (error) {
      // throw error;
      return error;
    }
  },
};
