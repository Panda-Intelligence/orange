import { useTranslation } from 'react-i18next';
import { setLanguage } from '@/i18n';

export function useLanguage() {
  const { t, i18n } = useTranslation();

  const changeLanguage = async (language: string) => {
    await setLanguage(language);
  };

  const toggleLanguage = async () => {
    const newLanguage = i18n.language === 'en' ? 'zh' : 'en';
    await changeLanguage(newLanguage);
  };

  return {
    t,
    currentLanguage: i18n.language,
    changeLanguage,
    toggleLanguage,
  };
}