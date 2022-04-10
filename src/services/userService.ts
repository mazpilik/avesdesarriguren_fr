interface User {
  name:string;
  password:string;
}

export const userService = {
  login: async (user:User) => {
    // send using fetch post request with user object
    // to the api url
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    // and return the response
    if (response.status === 200) {
      const users = await response.json();
      return users;
    }
    return [];
  },
};
