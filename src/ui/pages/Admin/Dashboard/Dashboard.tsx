import React from 'react';

import { AdminCard } from 'src/ui/_components/AdminCard/AdminCard';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';
import { BirdsCard } from './_components/BirdsCard/BirdsCard';

import { DashboardWrapper, MainContent, SecondaryContent } from './Dashboard.styles';

export const Dashboard = () => (
  <AdminLayout sectionTitle="Dashboard">
    <DashboardWrapper>
      <MainContent>
        <BirdsCard />
        <AdminCard className="adminCard" title="News" subTitle="Create/Read/Update/Delete">
          <p>
            In this section you can manage the birds that are in the app.
            To begin you only need to create add one bird to the system.
          </p>
          <p>
            If you have allready create some, you can see the list of then an manage as you want.
          </p>
        </AdminCard>
      </MainContent>
      <SecondaryContent>
        <AdminCard className="adminCard" title="Users" subTitle="Create/Read/Update/Delete">AdminCard</AdminCard>
        <AdminCard className="adminCard" title="Family" subTitle="Create/Read/Update/Delete">AdminCard</AdminCard>
        <AdminCard className="adminCard" title="Gender" subTitle="Create/Read/Update/Delete">AdminCard</AdminCard>
      </SecondaryContent>
    </DashboardWrapper>
  </AdminLayout>
);
