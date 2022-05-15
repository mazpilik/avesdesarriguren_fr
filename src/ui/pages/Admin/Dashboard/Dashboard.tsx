/* eslint-disable react/no-danger */
import React from 'react';

import { AdminCard } from 'src/ui/_components/AdminCard/AdminCard';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';

import { DashboardWrapper, MainContent, SecondaryContent } from './Dashboard.styles';

import { useDashboardCard } from './_functions/useDashboardCard';

export const Dashboard = () => {
  const birdsCard = useDashboardCard('birds');
  const newsCard = useDashboardCard('news');
  const usersCard = useDashboardCard('monthbird');
  const familyCard = useDashboardCard('family');
  const orderCard = useDashboardCard('order');

  return (
    <AdminLayout sectionTitle="Dashboard">
      <DashboardWrapper>
        <MainContent>
          <AdminCard className="birdCard" title={birdsCard.title} subTitle={birdsCard.subTitle} footer={birdsCard.footer}>
            <div className="dashboard_card_content" dangerouslySetInnerHTML={{ __html: birdsCard.content }} />
          </AdminCard>
          <AdminCard className="newsCard" title={newsCard.title} subTitle={newsCard.subTitle} footer={newsCard.footer}>
            <div className="dashboard_card_content" dangerouslySetInnerHTML={{ __html: newsCard.content }} />
          </AdminCard>
        </MainContent>
        <SecondaryContent>
          <AdminCard className="newsCard" title={usersCard.title} subTitle={usersCard.subTitle} footer={usersCard.footer}>
            <div className="dashboard_card_content" dangerouslySetInnerHTML={{ __html: usersCard.content }} />
          </AdminCard>
          <AdminCard className="newsCard" title={familyCard.title} subTitle={familyCard.subTitle} footer={familyCard.footer}>
            <div className="dashboard_card_content" dangerouslySetInnerHTML={{ __html: familyCard.content }} />
          </AdminCard>
          <AdminCard className="newsCard" title={orderCard.title} subTitle={orderCard.subTitle} footer={orderCard.footer}>
            <div className="dashboard_card_content" dangerouslySetInnerHTML={{ __html: orderCard.content }} />
          </AdminCard>
        </SecondaryContent>
      </DashboardWrapper>
    </AdminLayout>
  );
};
