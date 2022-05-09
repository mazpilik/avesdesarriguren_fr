import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';

import {
  ActionButtons,
  FieldHelp,
  FieldWrapper,
  FloatLabelField,
} from 'src/ui/_components/Form';
import { CancelBtn, SaveBtn } from 'src/ui/_components/Buttons/CustomButtons';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

import { useOrdersOptionsHook } from 'src/ui/_functions/hooks/useOrdersOptionsHook';
import { parseFamilies } from 'src/ui/_functions/utils/familyUtils';
import { familyService } from 'src/services/familyService';
import { Families } from 'src/domain/Family';
import { addBirdsActions, BasicInfoType, BirdAction } from '../../_functions/addBirdReducer';

type Props = {
  basicData: BasicInfoType;
  frecuency: string[];
  months: number[];
  onSetData: React.Dispatch<BirdAction>;
}
export const BasicInfo: React.FC<Props> = ({
  basicData, frecuency, months, onSetData,
}) => {
  // get i18n context
  const i18n = useRecoilValue(i18nAtom);

  // get order dropdown options
  const ordersOptions = useOrdersOptionsHook();

  // family options state
  const [familiesOptions, setFamiliesOptions] = useState([] as any[]);
  const [isFamilyDisabled, setIsFamilyDisabled] = useState(true);
  const [isNameDisabled, setIsNameDisabled] = useState(true);
  const [isNextStepDisabled, setIsNextStepDisabled] = useState(true);
  const frecuencyOptions = [
    { label: i18n.regular, value: 'regular' },
    { label: i18n.occasional, value: 'occasional' },
    { label: i18n.resident, value: 'resident' },
    { label: i18n.transient, value: 'transient' },
    { label: i18n.summer, value: 'summer' },
    { label: i18n.wintering, value: 'wintering' },
  ];

  // months options
  const monthsOptions = [
    { label: i18n.january, value: 1 },
    { label: i18n.february, value: 2 },
    { label: i18n.march, value: 3 },
    { label: i18n.april, value: 4 },
    { label: i18n.may, value: 5 },
    { label: i18n.june, value: 6 },
    { label: i18n.july, value: 7 },
    { label: i18n.august, value: 8 },
    { label: i18n.september, value: 9 },
    { label: i18n.october, value: 10 },
    { label: i18n.november, value: 11 },
    { label: i18n.december, value: 12 },
  ];

  // set birdState basicData when some field change
  const onChangeData = (dataKey: string, value: string) => {
    onSetData({
      type: addBirdsActions.setBasicInfo,
      payload: {
        key: dataKey,
        value,
      },
    });
  };

  // set birdState frecuency when some field change
  const onChangeFrecuency = (value: string[]) => {
    console.log(value);
    onSetData({
      type: addBirdsActions.setFrecuency,
      payload: value,
    });
  };

  // set birdState months when some field change
  const onChangeMonths = (value: number[]) => {
    onSetData({
      type: addBirdsActions.setMonths,
      payload: value,
    });
  };

  // get families options from api, parse and set to state
  const getFamiliesOptions = async () => {
    const families: Families = await familyService.getFamiliesbyOrder(basicData.orderId);
    if (families) {
      setFamiliesOptions(parseFamilies(families));
    }
  };

  // pass to the next step
  const onNextStep = () => {
    onSetData({
      type: addBirdsActions.setNextStep,
      payload: null,
    });
  };

  // react when orderId is set in order dropdown
  useEffect(() => {
    if (basicData.orderId) {
      getFamiliesOptions();
    }
  }, [basicData.orderId]);

  // set when family and name are disabled or no
  useEffect(() => {
    if (basicData.orderId) {
      setIsFamilyDisabled(false);
    }
    if (basicData.familyId) {
      setIsNameDisabled(false);
    }
    if (
      basicData.orderId
      && basicData.familyId
      && basicData.name
      && frecuency.length > 0
      && months.length > 0
    ) {
      setIsNextStepDisabled(false);
    }
  }, [basicData, frecuency, months]);

  return (
    <>
      <FieldWrapper>
        <FloatLabelField>
          <Dropdown name="orderId" filter filterBy="label" onChange={(e) => onChangeData('orderId', e.target.value)} options={ordersOptions} value={basicData.orderId} />
          <label htmlFor="ordername">{i18n.orderLabel}</label>
        </FloatLabelField>
      </FieldWrapper>
      <FieldWrapper>
        <FloatLabelField>
          <Dropdown disabled={isFamilyDisabled} name="familyId" onChange={(e) => onChangeData('familyId', e.target.value)} options={familiesOptions} value={basicData.familyId} />
          <label htmlFor="ordername">{i18n.familyLabel}</label>
        </FloatLabelField>
      </FieldWrapper>
      <FieldWrapper>
        <FloatLabelField>
          <InputText disabled={isNameDisabled} name="name" onChange={(e) => onChangeData('name', e.target.value)} value={basicData.name} />
          <label htmlFor="familyName">{i18n.birdNameLabel}</label>
        </FloatLabelField>
        <FieldHelp>{i18n.basicInfoNameHelp}</FieldHelp>
      </FieldWrapper>
      <FieldWrapper>
        <FloatLabelField>
          <MultiSelect name="frecuency" onChange={(e) => onChangeFrecuency(e.value)} value={frecuency} options={frecuencyOptions} />
          <label htmlFor="frecuency">{i18n.frecuencyLabel}</label>
        </FloatLabelField>
        <FieldHelp>{i18n.frecuencyLabelHelp}</FieldHelp>
      </FieldWrapper>
      <FieldWrapper>
        <FloatLabelField>
          <MultiSelect name="months" onChange={(e) => onChangeMonths(e.value)} value={months} options={monthsOptions} />
          <label htmlFor="months">{i18n.monthsLabel}</label>
        </FloatLabelField>
        <FieldHelp>{i18n.monthsLabelHelp}</FieldHelp>
      </FieldWrapper>
      <ActionButtons>
        <SaveBtn disabled={isNextStepDisabled} onClick={onNextStep}>{i18n.nextStep}</SaveBtn>
        <CancelBtn>{i18n.cancel}</CancelBtn>
      </ActionButtons>
    </>
  );
};
