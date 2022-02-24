import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


Vue.config.productionTip = false


// Vue.prototype.$api = new axios.create({
//     baseURL: "https://allweb.fun/coop/api/",
//     params: {},
//     headers: {
//         Authorization: "sl.BB5GvISQCYmXYppwvqR7JsUO4JAl2YXEsSs2SYhNqiDYwUirM0DKgtLr1BWtdv8eDSZjPEGMF9qKMmOp3NUDoyt2aYzOGJzHrM7eC1tjsbA5c-TzGy51UExN9TYu9krnBNueaI7F",
//         'Content-Type': 'application/json'
//     },
// });

Vue.component("HeaderPrincipal", () =>
    import ("@/components/HeaderPrincipal.vue"));

Vue.component("HeaderAnimateur", () =>
    import ("@/components/HeaderAnimateur.vue"));

Vue.component("HeaderAdministrateur", () =>
    import ("@/components/HeaderAdministrateur.vue"));

Vue.component("Footer", () =>
    import ("@/components/Footer.vue"));

Vue.config.productionTip = false
new Vue({
    router,
    store,
    // socket,
    render: h => h(App)
}).$mount('#app')