import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './assets/locales/en.json';
import pt from './assets/locales/pt.json';

i18n.use(initReactI18next).init({
   resources: {
      en: { translation: en },
      pt: { translation: pt },
   },
   lng: 'pt',
   fallbackLng: 'pt',
   interpolation: {
      escapeValue: false,
   },
});

export default i18n;
