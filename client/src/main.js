import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

Vue.config.productionTip = false

Vue.component("HeaderPrincipal", () =>
    import ("@/components/HeaderPrincipal.vue"));

Vue.component("HeaderAnimateur", () =>
    import ("@/components/HeaderAnimateur.vue"));

Vue.component("Footer", () =>
    import ("@/components/Footer.vue"));

Vue.config.productionTip = false
new Vue({
    router,
    store,
    // socket,
    render: h => h(App)
}).$mount('#app')