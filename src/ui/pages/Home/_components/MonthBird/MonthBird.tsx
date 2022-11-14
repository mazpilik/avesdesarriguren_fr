import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { monthBirdService } from 'src/services/monthBirdService';
import { OutlinedBtn } from 'src/ui/_components/Buttons/CustomButtons';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

import { MonthBirdWrapper } from './MonthBird.styles';

type MBStateT = {
  birdId: number;
  id: number,
  month: number,
  titleEs: string,
  titleEus: string,
  contentEs: string,
  contentEus: string,
  img: string,
}

type MonthBirdT = {
  id: number,
  birdId: number;
  month: number;
  name: string;
  content_es: string;
  content_eus: string;
  title_es: string;
  title_eus: string;
  img: string;
}

export const MonthBird = () => {
  const i18n = useRecoilValue(i18nAtom);
  const [mbState, setMBState] = React.useState<MBStateT>();
  const parseMBState = (mb: MonthBirdT): MBStateT => ({
    birdId: mb.birdId,
    id: mb.id,
    month: mb.month,
    titleEs: mb.title_es,
    titleEus: mb.title_eus,
    contentEs: mb.content_es,
    contentEus: mb.content_eus,
    img: mb.img,
  });
  const getMonthBird = async () => {
    const monthBird: MonthBirdT = await monthBirdService.getMonthBirdForHome();
    setMBState(parseMBState(monthBird));
  };
  useEffect(() => {
    getMonthBird();
  }, []);

  return (
    <MonthBirdWrapper>
      {mbState && (
        <>
          <article>
            <h2>{mbState.titleEs}</h2>
            <p>{mbState.contentEs}</p>
            <OutlinedBtn>{i18n.discoverMonthBirdBtn}</OutlinedBtn>
          </article>
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/birds/${mbState.img}`}
            alt={mbState.titleEs}
          />
        </>
      )}
    </MonthBirdWrapper>
  );
};
