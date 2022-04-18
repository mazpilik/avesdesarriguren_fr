import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { AddBtn, EditBtn } from 'src/ui/_components/Buttons';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

export const useBirdsCard = () => {
  const i18n = useRecoilValue(i18nAtom);
  const navigate = useNavigate();

  const onAddBtnClick = () => {
    navigate('/shkud/birds/add');
  };
  const onViewBtnClick = () => {
    navigate('/shkud/birds/list');
  };

  const footer = (
    <>
      <AddBtn onClick={onAddBtnClick}>{i18n.add}</AddBtn>
      <EditBtn onClick={onViewBtnClick}>{i18n.view}</EditBtn>
    </>
  );
  const title = 'Birds';
  const subTitle = 'Create/Read/Update/Delete';
  const content = (
    <>
      <p>
        In this section you can manage the birds that are in the app.
        To begin you only need to create add one bird to the system.
      </p>
      <p>
        If you have allready create some, you can see the list of then an manage as you want.
      </p>
    </>
  );
  return {
    onAddBtnClick,
    onViewBtnClick,
    footer,
    title,
    subTitle,
    content,
  };
};
