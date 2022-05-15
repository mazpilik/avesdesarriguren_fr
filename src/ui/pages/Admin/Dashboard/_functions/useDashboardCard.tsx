import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import capitalize from 'lodash/capitalize';

import { AddBtn, EditBtn } from 'src/ui/_components/Buttons';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

export const useDashboardCard = (section: string) => {
  const i18n = useRecoilValue(i18nAtom);
  const navigate = useNavigate();

  const onAddBtnClick = () => {
    const route = `/shkud/${section}/add`;
    navigate(route);
  };
  const onViewBtnClick = () => {
    const route = `/shkud/${section}/list`;
    navigate(route);
  };

  const footer = (
    <>
      <AddBtn onClick={onAddBtnClick}>{i18n.add}</AddBtn>
      <EditBtn onClick={onViewBtnClick}>{i18n.view}</EditBtn>
    </>
  );
  const title = i18n[`dashboard${capitalize(section)}Title`];
  const subTitle = i18n[`dashboard${capitalize(section)}SubTitle`];
  const content = i18n[`dashboard${capitalize(section)}Content`];
  return {
    onAddBtnClick,
    onViewBtnClick,
    footer,
    title,
    subTitle,
    content,
  };
};
