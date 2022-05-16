import React from 'react';
import { useRecoilValue } from 'recoil';

import { PublicLayout } from 'src/ui/_components/PublicLayout';
import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

import { OutlinedBtn } from 'src/ui/_components/Buttons/CustomButtons';
import { MonthBird } from './_components/MonthBird';
import { CardWrapper, HomeCards } from './Home.styles';
import { HomeNews } from './_components/HomeNews';

export const Home = () => {
  const i18n = useRecoilValue(i18nAtom);
  return (
    <PublicLayout>
      <MonthBird />
      <CardWrapper>
        <HomeCards>
          <h3>{i18n.whatIsThisTitle}</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: i18n.whatIsThisContent,
            }}
          />
          <img src={`${process.env.REACT_APP_IMAGES_URL}/layout/carpintero.png`} alt="what is this" />
          <OutlinedBtn>{i18n.discoverThem}</OutlinedBtn>
        </HomeCards>
        <HomeCards>
          <HomeNews />
        </HomeCards>
      </CardWrapper>
    </PublicLayout>
  );
};
