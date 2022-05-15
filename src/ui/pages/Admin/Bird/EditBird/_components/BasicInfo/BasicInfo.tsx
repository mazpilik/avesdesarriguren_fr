import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';

import {
  FieldHelp,
  FieldWrapper,
  FloatLabelField,
} from 'src/ui/_components/Form';

import { i18nAtom } from 'src/ui/_functions/atoms/atoms';

import { useOrdersOptionsHook } from 'src/ui/_functions/hooks/useOrdersOptionsHook';
import { parseFamilies } from 'src/ui/_functions/utils/familyUtils';
import { familyService } from 'src/services/familyService';
import { Families } from 'src/domain/Family';
import { updateBirdsActions, BasicInfoType, BirdAction } from '../../_functions/updateBirdReducer';

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
      type: updateBirdsActions.setBasicInfo,
      payload: {
        key: dataKey,
        value,
      },
    });
  };

  // set birdState frecuency when some field change
  const onChangeFrecuency = (value: string[]) => {
    onSetData({
      type: updateBirdsActions.setFrecuency,
      payload: value,
    });
  };

  // set birdState months when some field change
  const onChangeMonths = (value: number[]) => {
    onSetData({
      type: updateBirdsActions.setMonths,
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

  // react when orderId is set in order dropdown
  useEffect(() => {
    if (basicData.orderId) {
      getFamiliesOptions();
    }
  }, [basicData.orderId]);

  useEffect(() => {
    console.log('basicData', basicData);
  }, [basicData]);

  return (
    <>
      <h2>{i18n.basicInfoTitle}</h2>
      <FieldWrapper>
        <FloatLabelField>
          <Dropdown filter filterBy="label" onChange={(e) => onChangeData('orderId', e.target.value)} options={ordersOptions} value={basicData.orderId} />
          <label htmlFor="ordername">{i18n.orderLabel}</label>
        </FloatLabelField>
      </FieldWrapper>
      <FieldWrapper>
        <FloatLabelField>
          <Dropdown name="familyId" onChange={(e) => onChangeData('familyId', e.target.value)} options={familiesOptions} value={basicData.familyId} />
          <label htmlFor="ordername">{i18n.familyLabel}</label>
        </FloatLabelField>
      </FieldWrapper>
      <FieldWrapper>
        <FloatLabelField>
          <InputText name="name" onChange={(e) => onChangeData('name', e.target.value)} value={basicData.name} />
          <label htmlFor="name">{i18n.birdNameLabel}</label>
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
    </>
  );
};
