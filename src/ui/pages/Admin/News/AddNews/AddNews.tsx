import React from 'react';
import { useRecoilValue } from 'recoil';

import { AdminLayout } from 'src/ui/_components/AdminLayout/AdminLayout';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

export const AddNews = () => {
  const i18n = useRecoilValue(i18nAtom);
  return (
    <AdminLayout sectionTitle={i18n.addNewsTitle}>addbird</AdminLayout>
  );
};
