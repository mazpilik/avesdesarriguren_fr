import React from 'react';

import { Header } from './_components/Header';
import { Footer } from './_components/Footer';

import { AdminLayoutWrapper, BodyWrapper } from './AdminLayout.styles';

interface AdminLayoutProps {
  children: React.ReactNode;
  sectionTitle: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, sectionTitle }) => (
  <AdminLayoutWrapper>
    <Header sectionTitle={sectionTitle} />
    <BodyWrapper>{children}</BodyWrapper>
    <Footer />
  </AdminLayoutWrapper>
);
