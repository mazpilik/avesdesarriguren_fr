import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { routes } from './conf/routes';

import './App.css';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { AddBird } from './ui/pages/Admin/Bird/AddBird';
import { AddFamily } from './ui/pages/Admin/Family/AddFamily';
import { AddNews } from './ui/pages/Admin/News/AddNews';
import { AddOrder } from './ui/pages/Admin/Order/AddOrder';
import { AddUser } from './ui/pages/Admin/User/AddUser';
import { Dashboard } from './ui/pages/Admin/Dashboard';
import { EditOrder } from './ui/pages/Admin/Order/EditOrder';
import { Home } from './ui/pages/Home';
import { LangProvider } from './ui/_components/LangProvider/LangProvider';
import { ListOrders } from './ui/pages/Admin/Order/ListOrders';
import { Login } from './ui/pages/Login';
import { PrivateRoute } from './ui/_components/PrivateRoute/PrivateRoute';
import { ThemeProviderWrapper } from './ui/theme/ThemeProviderWrapper';
import { UserChecker } from './ui/_components/UserChecker/UserChecker';

const App: FC = () => (
  <BrowserRouter>
    <RecoilRoot>
      <UserChecker />
      <ThemeProviderWrapper>
        <LangProvider>
          <Routes>
            <Route path={routes.ACCESS_POINT} element={<Home />} />
            <Route path={routes.LOGIN} element={<Login />} />
            <Route path={routes.ADMIN_DASHBOARD} element={<PrivateRoute component={Dashboard} />} />
            <Route path={routes.ADD_BIRD} element={<PrivateRoute component={AddBird} />} />
            <Route path={routes.ADD_FAMILY} element={<PrivateRoute component={AddFamily} />} />
            <Route path={routes.ADD_ORDER} element={<PrivateRoute component={AddOrder} />} />
            <Route path={routes.LIST_ORDER} element={<PrivateRoute component={ListOrders} />} />
            <Route path={routes.EDIT_ORDER} element={<PrivateRoute component={EditOrder} />} />
            <Route path={routes.ADD_NEWS} element={<PrivateRoute component={AddNews} />} />
            <Route path={routes.ADD_USER} element={<PrivateRoute component={AddUser} />} />
          </Routes>
        </LangProvider>
      </ThemeProviderWrapper>
    </RecoilRoot>
  </BrowserRouter>
);

export default App;
