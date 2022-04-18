import React from 'react';

import { AdminCard } from 'src/ui/_components/AdminCard/AdminCard';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';

import { useBirdsCard } from './_functions/useBirdsCard';
import { useNewsCard } from './_functions/useNewsCard';

import { DashboardWrapper, MainContent, SecondaryContent } from './Dashboard.styles';

export const Dashboard = () => {
  const birdsCard = useBirdsCard();
  const newsCard = useNewsCard();
  return (
    <AdminLayout sectionTitle="Dashboard">
      <DashboardWrapper>
        <MainContent>
          <AdminCard className="birdCard" title={birdsCard.title} subTitle={birdsCard.subTitle} footer={birdsCard.footer}>
            {birdsCard.content}
          </AdminCard>
          <AdminCard className="newsCard" title={newsCard.title} subTitle={newsCard.subTitle} footer={newsCard.footer}>
            {newsCard.content}
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
};
