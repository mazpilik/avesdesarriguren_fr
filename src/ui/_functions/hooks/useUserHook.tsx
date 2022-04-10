import { useRecoilState } from 'recoil';

import { userAtom } from 'src/ui/_functions/atoms/atoms';

export const useUserHook = () => {
  const [userState, setUserState] = useRecoilState(userAtom);
  return {
    saveUser: (user: any) => {
      setUserState(user);

      // save user to Local session storage
      sessionStorage.setItem('user', JSON.stringify(user));
    },
    getUserFromSessionStorage: () => {
      const user = sessionStorage.getItem('user');
      if (user) {
        setUserState(JSON.parse(user));
      }
    },
    getUser: () => userState,
    removeUser: () => {
      setUserState(null);
      sessionStorage.removeItem('user');
    },
  };
};
