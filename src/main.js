import { createApp } from 'vue'

// npm VueAxios
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap';

// 11 vue3-loading-overlay
// Import component引入路經須改為vue3和overlay
import Loading from 'vue3-loading-overlay';
// Import stylesheet引入路經須改為vue3和overlay
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

import 'bootstrap-icons/font/bootstrap-icons.css';

// 1.匯入 vee-validate 主套件
import {
    Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
// 匯入 vee-validate 相關規則
import AllRules from '@vee-validate/rules';
// 匯入多國語系的功能
import { localize, setLocale } from '@vee-validate/i18n';
// 匯入繁體中文語系檔案
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

//引入SweetAlert及其附帶的css
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue'
import router from './router'
// <!-- 14.3套用全域的千分號方法 -->
import { currency, date } from './methods/filter';

// 15.Toast訊息改為全域使用
import $httpMessageState from './methods/pushMessageState';


// 定義驗證規則
Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]);
});

// 設定 vee-validate 全域規則
configure({
    generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
    validateOnInput: true, // 當輸入任何內容直接進行驗證
});
// 設定預設語系
setLocale('zh_TW');

// 原本-createApp(App).use(router).mount('#app')
// npmjs.com/package/vue-axios參找此網址改為下列
const app = createApp(App)
// 14.3套用全域的千分號方法
app.config.globalProperties.$filters = {
    date,
    currency,
  };

// 15.Toast訊息改為全域使用
app.config.globalProperties.$httpMessageState = $httpMessageState;

app.use(VueAxios, axios)
app.use(router)
// #11-2 多處用到，全域註冊

app.use(VueSweetalert2)


// 3.註冊 vee-validate 三個全域元件
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('LoadIng', Loading)
app.mount('#app')
