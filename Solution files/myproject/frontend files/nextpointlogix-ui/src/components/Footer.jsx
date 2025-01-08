// src/components/Footer.js
import React from 'react';
import '../styles/Footer.css';
import { useTranslation } from 'react-i18next';  // Додаємо імпорт i18n



function Footer() {
  const { t } = useTranslation();  // Ініціалізуємо переклад
  return (
    <footer className="footer">
      <p>
        &copy; 2024 NextPointLogix. {t('footer.rights')} <a href="#">{t('footer.privacy_policy')}</a> | <a href="#">{t('footer.support')}</a>
      </p>
    </footer>
  );
}

export default Footer;
