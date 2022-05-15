import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { ActionButtons, FieldWrapper } from 'src/ui/_components/Form';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { CancelBtn, SaveBtn } from 'src/ui/_components/Buttons/CustomButtons';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';
import { addBirdsActions, AditionalInfo, BirdAction } from '../../_functions/addBirdReducer';
import { validateBirData } from './_functions/validateBirData';

type Props = {
  aditionalInfos: AditionalInfo[];
  onSetData: React.Dispatch<BirdAction>;
  onSaveData: () => void;
}
export const BirdData: React.FC<Props> = ({ aditionalInfos, onSetData, onSaveData }) => {
  // get i18n context
  const i18n = useRecoilValue(i18nAtom);

  // lang state
  const [lang, setLang] = useState('es');
  // current aditional info
  const [currentInfo, setCurrentInfo] = useState({} as AditionalInfo);
  // save button disabled state
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  // lang options
  const langOptions = [
    { label: i18n.eus, value: 'eus' },
    { label: i18n.es, value: 'es' },
  ];

  // on change data
  const onChangeData = (dataKey: string, value: string) => {
    const otherInfo = aditionalInfos.filter((info) => info.lang !== currentInfo.lang);
    const newInfo = { ...currentInfo, [dataKey]: value };

    onSetData({
      type: addBirdsActions.setAdditionalInfo,
      payload: [
        ...otherInfo,
        newInfo,
      ],
    });
  };

  // navigate to prev step
  const onPrevStep = () => {
    onSetData({
      type: addBirdsActions.setPrevStep,
      payload: null,
    });
  };

  // filter current data from aditionalInfos
  useEffect(() => {
    const cInfo = aditionalInfos.find((info) => info.lang === lang);
    if (cInfo) {
      setCurrentInfo(cInfo);
    }
  }, [lang, aditionalInfos]);

  // check if save button is disabled
  useEffect(() => {
    if (validateBirData(aditionalInfos).length === 0) {
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
        <InputText id="name" onChange={(e) => onChangeData('name', e.target.value)} value={currentInfo.name} />
        <label>{i18n.name}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputTextarea id="summary" onChange={(e) => onChangeData('summary', e.target.value)} value={currentInfo.summary} />
        <label>{i18n.summary}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputText id="birdLength" onChange={(e) => onChangeData('birdLength', e.target.value)} value={currentInfo.birdLength} />
        <label>{i18n.birdLength}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputText id="wingspan" onChange={(e) => onChangeData('wingspan', e.target.value)} value={currentInfo.wingspan} />
        <label>{i18n.wingspan}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputTextarea id="identification" onChange={(e) => onChangeData('identification', e.target.value)} value={currentInfo.identification} />
        <label>{i18n.identification}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputTextarea id="singing" onChange={(e) => onChangeData('singing', e.target.value)} value={currentInfo.singing} />
        <label>{i18n.singing}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputTextarea id="moving" onChange={(e) => onChangeData('moving', e.target.value)} value={currentInfo.moving} />
        <label>{i18n.moving}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputTextarea id="habitat" onChange={(e) => onChangeData('habitat', e.target.value)} value={currentInfo.habitat} />
        <label>{i18n.habitat}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputTextarea id="feeding" onChange={(e) => onChangeData('feeding', e.target.value)} value={currentInfo.feeding} />
        <label>{i18n.feeding}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputTextarea id="reproduction" onChange={(e) => onChangeData('reproduction', e.target.value)} value={currentInfo.reproduction} />
        <label>{i18n.reproduction}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputTextarea id="population" onChange={(e) => onChangeData('population', e.target.value)} value={currentInfo.population} />
        <label>{i18n.population}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputTextarea id="conservationThreats" onChange={(e) => onChangeData('conservationThreats', e.target.value)} value={currentInfo.conservationThreats} />
        <label>{i18n.conservationThreats}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputTextarea id="worldDistribution" onChange={(e) => onChangeData('worldDistribution', e.target.value)} value={currentInfo.worldDistribution} />
        <label>{i18n.worldDistribution}</label>
      </FieldWrapper>
      <FieldWrapper className="sh-field-wrapper p-float-label">
        <InputTextarea id="peninsulaDistribution" onChange={(e) => onChangeData('peninsulaDistribution', e.target.value)} value={currentInfo.peninsulaDistribution} />
        <label>{i18n.peninsulaDistribution}</label>
      </FieldWrapper>
      <ActionButtons>
        <CancelBtn onClick={onPrevStep}>{i18n.prevStep}</CancelBtn>
        <SaveBtn disabled={isSaveDisabled} onClick={onSaveData}>{i18n.save}</SaveBtn>
        <CancelBtn>{i18n.cancel}</CancelBtn>
      </ActionButtons>
    </>
  );
};
