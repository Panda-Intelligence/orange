import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 导入翻译文件
import translationEn from "./locales/en/translation.json";
import translationZh from "./locales/zh/translation.json";

// 定义资源
const resources = {
  en: { translation: translationEn },
  zh: { translation: translationZh },
};

// 初始化 i18n
const initI18n = async () => {
  // 尝试从存储中获取保存的语言设置
  let savedLanguage = await AsyncStorage.getItem("language");

  // 如果没有保存的语言设置，使用设备的语言
  if (!savedLanguage) {
    // 获取设备语言，并提取主要语言代码（如 "zh-CN" 变为 "zh"）
    const deviceLanguage = Localization.locale.split('-')[0];
    // @ts-ignore
    savedLanguage = resources[deviceLanguage] ? deviceLanguage : "en";
  }

  // 初始化 i18next
  await i18n.use(initReactI18next).init({
    compatibilityJSON: "v4", // 解决 Android 上的兼容性问题
    resources,
    lng: savedLanguage,
    fallbackLng: "en", // 如果找不到翻译，回退到英语
    interpolation: {
      escapeValue: false, // 不转义 HTML
    },
  });
};

// 设置语言的函数
export const setLanguage = async (language: string) => {
  await AsyncStorage.setItem("language", language);
  await i18n.changeLanguage(language);
};

// 初始化
initI18n();

export default i18n;