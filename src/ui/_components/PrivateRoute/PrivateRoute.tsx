import React, { FC } from 'react';
import isNill from 'lodash/isNil';

import { ProgressSpinner } from 'primereact/progressspinner';

import { useUserHook } from 'src/ui/_functions/hooks/useUserHook';

interface Props {
  component: React.ComponentType<any>;
}

export const PrivateRoute: FC<Props> = ({ component: RouteComponent }) => {
  const userUtils = useUserHook();
  const user: any = userUtils.getUserFromSessionStorage();

  if (!isNill(user) && user.token) {
    return <RouteComponent />;
  }

  // return <Navigate to="/login" />;

  return <ProgressSpinner style={{ width: '100%', height: '100%' }} />;
};
