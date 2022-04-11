import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { routes } from './conf/routes';

import './App.css';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Dashboard } from './ui/pages/Admin/Dashboard';
import { Home } from './ui/pages/Home';
import { Login } from './ui/pages/Login';
import { PrivateRoute } from './ui/_components/PrivateRoute/PrivateRoute';
import { UserChecker } from './ui/_components/UserChecker/UserChecker';

const App: FC = () => (
  <BrowserRouter>
    <RecoilRoot>
      <UserChecker />
      <Routes>
        <Route path={routes.ACCESS_POINT} element={<Home />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.ADMIN_DASHBOARD} element={<PrivateRoute component={Dashboard} />} />
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
);

export default App;
