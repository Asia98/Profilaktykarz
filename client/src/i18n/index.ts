import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './en'
import pl from './pl'

const resources = {en, pl}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    interpolation: {
      escapeValue: false, // redundant with react
    },
    keySeparator: false, // we do not use keys in form messages.welcome
    lng: localStorage.getItem('i18nextLng') === 'pl' ? 'pl' : 'en',
    resources,
  })

export default i18n
