import langEs from 'src/assets/lang/lang_es.json';
import langEn from 'src/assets/lang/lang_en.json';
import langEus from 'src/assets/lang/lang_eus.json';

export const langService = {
  // get lang json file from assets/lang folder
  getLang: (lang: string) => {
    switch (lang) {
      case 'es':
        return langEs;
      case 'en':
        return langEn;
      case 'eus':
        return langEus;
      default:
        return langEs;
    }
  },
};
