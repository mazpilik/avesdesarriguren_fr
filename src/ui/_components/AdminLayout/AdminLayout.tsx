import React from 'react';

import { Header } from './_components/Header';
import { Footer } from './_components/Footer';
import { MainMenu } from './_components/MainMenu';

import {
  AdminLayoutWrapper, BodyWrapper, ContentWrapper,
} from './AdminLayout.styles';

interface AdminLayoutProps {
  children: React.ReactNode;
  sectionTitle: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, sectionTitle }) => (
  <AdminLayoutWrapper>
    <MainMenu />
    <ContentWrapper>
      <Header sectionTitle={sectionTitle} />
      <BodyWrapper>{children}</BodyWrapper>
      <Footer />
    </ContentWrapper>
  </AdminLayoutWrapper>
);
