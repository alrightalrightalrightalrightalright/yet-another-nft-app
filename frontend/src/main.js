import { createApp } from 'vue'
import App from './App.vue'
import store from "./store/store.js";
import router from "./router.js";
import Toasted from 'vue-toasted';
// import VueIpfs from './plugins/vue-ipfs.js'

const app = createApp(App)
app.config.productionTip = false;
// app.use(VueIpfs)
app.use(Toasted.default, {
    router
});
app.use(router)
app.use(store)
app.mount('#app')
