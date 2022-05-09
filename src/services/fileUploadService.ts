import axios from 'axios';

export const fileUploadService = {
  upload: async (files:any) => {
    console.log('files in service', files);
    const formData = new FormData();
    formData.append('files', files);
    axios.post(`${process.env.REACT_APP_API_URL}/fileupload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    }).then((response) => {
      console.log('success', response);
    }).catch((error) => {
      console.log('error', error);
    });
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/fileupload`, {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    //   },
    //   body: formData,
    // });
    // console.log('response', response);
    // if (response.status === 200) {
    //   return 'file uploaded';
    // }
    // const answer = await response.json();
    // return answer;
  },
};
