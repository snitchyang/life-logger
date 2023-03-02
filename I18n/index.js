import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// 自編語言包
import en from './enUS.json'
import zh from './zhCN.json'

const resources = {
    en: {
        translation: en
    },
    zh: {
        translation: zh
    }
}

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3', // 对安卓进行兼容
        resources,
        fallbackLng: 'en', // 默认语言，也是设置语言时设置了不存在的语言时使用的
        interpolation: {
            escapeValue: false
        }
    }, (err) => {
        // 錯誤
        if (err) throw err;
        // 这里放多一层函数是为了方便之后切换语言的同时做一些其他的统一处理
        i18n.setLocalLanguage = function (value) {
            // 設置項目文本的語言
            this.changeLanguage(value);
            // 做点别的，比如同时切换别的插件的语言
        }
        // 初始化
        i18n.setLocalLanguage(i18n.language);
    });


export default i18n;

