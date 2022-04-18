/* eslint-disable react/no-danger */
import React from 'react';

import { AdminCard } from 'src/ui/_components/AdminCard/AdminCard';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';

import { DashboardWrapper, MainContent, SecondaryContent } from './Dashboard.styles';

import { useDashboardCard } from './_functions/useDashboardCard';

export const Dashboard = () => {
  const birdsCard = useDashboardCard('birds');
  const newsCard = useDashboardCard('news');
  const usersCard = useDashboardCard('user');
  const familyCard = useDashboardCard('family');
  const genderCard = useDashboardCard('gender');

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
          <AdminCard className="newsCard" title={genderCard.title} subTitle={genderCard.subTitle} footer={genderCard.footer}>
            <div className="dashboard_card_content" dangerouslySetInnerHTML={{ __html: genderCard.content }} />
          </AdminCard>
        </SecondaryContent>
      </DashboardWrapper>
    </AdminLayout>
  );
};
