import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';  // Імпортуємо з відповідної папки
import ukTranslation from './locales/uk/translation.json';  // Імпортуємо з відповідної папки

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      uk: { translation: ukTranslation },
    },
    lng: 'en',  // Мова за замовчуванням
    fallbackLng: 'en',  // Якщо вибрана мова недоступна, використовується fallback
    interpolation: {
      escapeValue: false,  // React вже екранує небезпечні символи
    },
  });

export default i18n;
