import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import isNill from 'lodash/isNil';

import { routes } from 'src/conf/routes';

import { useUserHook } from 'src/ui/_functions/hooks/useUserHook';

import { PageSpinner } from '../PageSpinner';

interface Props {
  component: React.ComponentType<any>;
}

export const PrivateRoute: FC<Props> = ({ component: RouteComponent }) => {
  const navigate = useNavigate();
  const userUtils = useUserHook();
  const user: any = userUtils.getUserFromSessionStorage();

  useEffect(() => {
    setTimeout(() => {
      if (isNill(user)) {
        navigate(routes.LOGIN);
      }
    }, 500);
  }, [user]);

  if (!isNill(user) && user.token) {
    return <RouteComponent />;
  }

  // return <Navigate to="/login" />;

  return <PageSpinner />;
};
