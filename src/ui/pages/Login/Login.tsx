import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isNil, trim } from 'lodash';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';

import { userAtom } from 'src/ui/_functions/atoms/atoms';

import { userService } from 'src/services/userService';

import { useUserHook } from 'src/ui/_functions/hooks/useUserHook';

import { routes } from 'src/conf/routes';

import {
  ActionButtonsWrapper, FieldWrapper, LoginPageWrapper, LoginWrapper,
} from './Login.styles';

interface LoginProps {
  name: string;
  password: string;
}
interface decodedTokenProps {
  uid: string;
}

export const Login = () => {
  const userUtils: any = useUserHook();
  const user: any = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const [loginState, setLoginState] = React.useState<LoginProps>({
    name: '',
    password: '',
  });

  const onLoginFormChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setLoginState({
      ...loginState,
      [name]: value,
    });
  };

  const onLoginFormSubmit = async () => {
    const name = trim(loginState.name);
    const password = trim(loginState.password);
    const notEmpty = name && password;
    const nameIsValid = name.length > 3;

    // password has more than 8 characters capital letters, numbers and special characters
    const passwordIsValid = password.length > 8 && password.match(/[A-Z]/g) && password.match(/[0-9]/g) && password.match(/[^a-zA-Z\d]/g);

    if (notEmpty && nameIsValid && passwordIsValid) {
      try {
        const response = await userService.login({
          name,
          password,
        });
        const { token } = response;
        const decodedToken: decodedTokenProps = jwt_decode(token);

        userUtils.saveUser({
          id: decodedToken.uid,
          name,
          token: response.token,
          lang: 'es',
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Login failed');
    }
  };

  useEffect(() => {
    if (!isNil(user) && user.token) {
      navigate(routes.ADMIN_DASHBOARD);
    }
  }, [user]);

  return (
    <LoginPageWrapper className="card">
      <LoginWrapper>
        <FieldWrapper className="p-float-label">
          <InputText id="username" autoFocus onChange={onLoginFormChange} name="name" value={loginState.name} />
          <label htmlFor="username">Username</label>
        </FieldWrapper>
        <FieldWrapper className="p-float-label">
          <Password onChange={onLoginFormChange} type="password" id="password" name="password" value={loginState.password} />
          <label htmlFor="password">Password</label>
        </FieldWrapper>
        <ActionButtonsWrapper>
          <Button type="submit" onClick={onLoginFormSubmit}>Login</Button>
        </ActionButtonsWrapper>
      </LoginWrapper>
    </LoginPageWrapper>
  );
};
