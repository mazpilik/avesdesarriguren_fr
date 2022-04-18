import React from 'react';
import { useRecoilValue } from 'recoil';

import { AddBtn, EditBtn } from 'src/ui/_components/Buttons';
import { AdminCard } from 'src/ui/_components/AdminCard/AdminCard';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';
import { useNavigate } from 'react-router-dom';

export const BirdsCard = () => {
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
  return (
    <AdminCard className="adminCard" title="Birds" subTitle="Create/Read/Update/Delete" footer={footer}>
      <p>
        In this section you can manage the birds that are in the app.
        To begin you only need to create add one bird to the system.
      </p>
      <p>
        If you have allready create some, you can see the list of then an manage as you want.
      </p>

    </AdminCard>
  );
};
