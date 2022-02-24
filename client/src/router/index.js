import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Accueil',

        component: () =>
            import ('../views/Accueil.vue')
    },
    {
        path: '/EcouterDirect',
        name: 'EcouterDirect',
        component: () =>
            import ('../views/EcouterDirect.vue')
    },
    {
        path: '/Programmes',
        name: 'Programmes',
        component: () =>
            import ('../views/Programmes.vue')
    },
    {
        path: '/EnDirect',
        name: 'EnDirect',
        component: () =>
            import ('../views/BordAnimateur.vue')
    },
    {
        path: '/Calendrier',
        name: 'Calendrier',
        component: () =>
            import ('../views/CalendrierAdmin.vue')
    },
    {
        path: '/Animateurs',
        name: 'ListeAnimateurs',
        component: () =>
            import ('../views/ListeAnimateursAdmin.vue')
    },
    {
        path: '/Creneaux',
        name: 'CreneauxAnimateur',
        component: () =>
            import ('../views/CreneauxAnimateur.vue')
    }

]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router