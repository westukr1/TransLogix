import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationUK from './locales/uk/translation.json';

// Зчитуємо мову з localStorage або за замовчуванням встановлюємо англійську
const savedLanguage = localStorage.getItem('language') || 'en';

const resources = {
  en: {
    translation: translationEN,
  },
  uk: {
    translation: translationUK,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,  // Використовуємо збережену мову
    fallbackLng: 'en',    // Якщо мова не знайдена, використовуємо англійську
    interpolation: {
      escapeValue: false, // React вже захищає від XSS
    },
  });

export default i18n;
