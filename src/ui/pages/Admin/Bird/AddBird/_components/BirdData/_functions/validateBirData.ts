import { AditionalInfo } from 'src/ui/pages/Admin/Bird/AddBird/_functions/addBirdReducer';

export type ValidationError = {
  key: string;
  message: string;
}
export const validateBirData = (data: AditionalInfo []) => {
  const errors: ValidationError [] = [];
  data.forEach((aditionalInfoByLang) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(aditionalInfoByLang)) {
      if (value === '') {
        errors.push({
          key,
          message: `${key} is required`,
        });
      }
    }
  });
  return errors;
};
