import { useEffect } from 'react';
import isNil from 'lodash/isNil';
import { useRecoilValue } from 'recoil';

import { useUserHook } from 'src/ui/_functions/hooks/useUserHook';

import { userAtom } from 'src/ui/_functions/atoms/atoms';

export const UserChecker = () => {
  const userUtils = useUserHook();
  const user: any = useRecoilValue(userAtom);

  useEffect(() => {
    if (isNil(user)) {
      userUtils.recoverUserFromStorage();
    }
  }, []);

  return null;
};
