import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast, { PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

import './assets/css/style.css'

import { createPinia } from 'pinia'
const options: PluginOptions = {
};
createApp(App)
    .use(router)
    .use(createPinia())
    .use(Toast, options)
    .mount('#app')
