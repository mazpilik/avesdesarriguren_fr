import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

import { MainWrapper, PageNumber, TotalPages } from './Paginator.styles';

interface Props {
  page: number;
  totalPages: number;
  onSetListState: any;
}
export const Paginator: FC<Props> = ({ page, totalPages, onSetListState }) => {
  const i18n = useRecoilValue(i18nAtom);
  if (totalPages <= 1) {
    return null;
  }
  return (
    <MainWrapper>
      <PageNumber value={page} onChange={(e) => onSetListState({ name: 'page', value: e.target.value })} />
      {i18n.of}
      <TotalPages>{totalPages}</TotalPages>
    </MainWrapper>
  );
};
