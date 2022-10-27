
import { createApp } from 'vue'
import App from './App.vue'
import VueIpfs from './plugins/vue-ipfs.js'
import store from "./store/index.js";
import router from "./router.js";
import Toasted from 'vue-toasted';

const app = createApp(App)
// app.config.productionTip = false;
app.use(VueIpfs)
app.use(Toasted)
app.use(router)
app.use(store)
app.mount('#app')