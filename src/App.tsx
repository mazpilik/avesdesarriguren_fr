import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { routes } from './conf/routes';

import './App.css';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { AdminHome } from './ui/pages/AdminHome';
import { Home } from './ui/pages/Home';
import { Login } from './ui/pages/Login';

const App: FC = () => (
  <BrowserRouter>
    <RecoilRoot>
      <Routes>
        <Route path={routes.ACCESS_POINT} element={<Home />} />
        <Route path={routes.ADMIN_ACCESS_POINT} element={<AdminHome />} />
        <Route path={routes.LOGIN} element={<Login />} />
      </Routes>
    </RecoilRoot>
  </BrowserRouter>
);

export default App;
