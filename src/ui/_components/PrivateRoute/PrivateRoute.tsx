import React, { FC } from 'react';
import isNill from 'lodash/isNil';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userAtom } from 'src/ui/_functions/atoms/atoms';

interface Props {
  component: React.ComponentType<any>;
}

export const PrivateRoute: FC<Props> = ({ component: RouteComponent }) => {
  const user: any = useRecoilValue(userAtom);

  console.info('user', user);

  if (!isNill(user) && user.token) {
    return <RouteComponent />;
  }

  return <Navigate to="/" />;
};
