import { NewsDataT } from 'src/ui/pages/Admin/News/AddNews/_functions/addNewsReducer';

export type ValidationError = {
  key: string;
  message: string;
}
export const validateBirData = (data: NewsDataT []) => {
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
