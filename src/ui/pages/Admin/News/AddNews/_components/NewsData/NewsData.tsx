import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { ActionButtons, FieldWrapper } from 'src/ui/_components/Form';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { CancelBtn, SaveBtn } from 'src/ui/_components/Buttons/CustomButtons';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';
import { AddNewssActions, NewsAction, NewsDataT } from '../../_functions/addNewsReducer';
import { validateBirData } from './_functions/validateBirData';

type Props = {
  newsData: NewsDataT[];
  onSetData: React.Dispatch<NewsAction>;
  onSaveData: () => void;
}
export const NewsData: React.FC<Props> = ({ newsData, onSetData, onSaveData }) => {
  // get i18n context
  const i18n = useRecoilValue(i18nAtom);

  // lang state
  const [lang, setLang] = useState('es');
  // current aditional info
  const [currentInfo, setCurrentInfo] = useState({} as NewsDataT);
  // save button disabled state
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  // lang options
  const langOptions = [
    { label: i18n.eus, value: 'eus' },
    { label: i18n.es, value: 'es' },
  ];

  // on change data
  const onChangeData = (dataKey: string, value: string) => {
    const otherInfo = newsData.filter((info) => info.lang !== currentInfo.lang);
    const newInfo = { ...currentInfo, [dataKey]: value };

    onSetData({
      type: AddNewssActions.setAdditionalInfo,
      payload: [
        ...otherInfo,
        newInfo,
      ],
    });
  };

  // filter current data from aditionalInfos
  useEffect(() => {
    const cInfo = newsData.find((info) => info.lang === lang);
    if (cInfo) {
      setCurrentInfo(cInfo);
    }
  }, [lang, newsData]);

  // check if save button is disabled
  useEffect(() => {
    if (validateBirData(newsData).length === 0) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [currentInfo]);

  return (
    <>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <Dropdown
          onChange={(e) => setLang(e.target.value)}
          options={langOptions}
          placeholder={i18n.langLabel}
          value={lang}
        />
        <label>{i18n.lang}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputText onChange={(e) => onChangeData('title', e.target.value)} value={currentInfo.title} />
        <label>{i18n.title}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputTextarea id="summary" onChange={(e) => onChangeData('subtitle', e.target.value)} value={currentInfo.subtitle} />
        <label>{i18n.subtitle}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputTextarea id="birdLength" onChange={(e) => onChangeData('body', e.target.value)} value={currentInfo.body} />
        <label>{i18n.content}</label>
      </FieldWrapper>
      <ActionButtons>
        <SaveBtn disabled={isSaveDisabled} onClick={onSaveData}>{i18n.save}</SaveBtn>
        <CancelBtn>{i18n.cancel}</CancelBtn>
      </ActionButtons>
    </>
  );
};
