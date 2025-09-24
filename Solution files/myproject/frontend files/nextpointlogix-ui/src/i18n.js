import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';  // Імпортуємо з відповідної папки
import ukTranslation from './locales/uk/translation.json';  // Імпортуємо з відповідної папки

const resolveInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  return (
    localStorage.getItem('i18nextLng') ||
    localStorage.getItem('language') ||
    'en'
  );
};

const persistLanguageSelection = (language) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem('i18nextLng', language);
    localStorage.setItem('language', language);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to persist selected language', error);
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      uk: { translation: ukTranslation },
    },
    lng: resolveInitialLanguage(),  // Мова за замовчуванням
    fallbackLng: 'en',  // Якщо вибрана мова недоступна, використовується fallback
    interpolation: {
      escapeValue: false,  // React вже екранує небезпечні символи
    },
  });

i18n.on('languageChanged', persistLanguageSelection);

persistLanguageSelection(i18n.language);

export default i18n;
