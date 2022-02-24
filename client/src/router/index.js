import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',

        component: () =>
            import ('../views/Home.vue')
    },
    {
        path: '/Accueil',
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
        path: '/Podcasts',
        name: 'Podcasts',
        component: () =>
            import ('../views/Podcasts.vue')
    },
    {
        path: '/Podcast/:id',
        name: 'Podcast',
        component: () =>
            import ('../views/Podcast.vue')
    },
    {
        path: '/Play/:id',
        name: 'Play',
        component: () =>
            import ('../views/Play.vue')
    },
    {
        path: '/EmissionsAnimateur/',
        name: 'EmissionsAnimateur',
        component: () =>
            import ('../views/EmissionsAnimateur.vue')
    },
    {
        path: '/CreneauxProgrammes/',
        name: 'CreneauxProgrammees',
        component: () =>
            import ('../views/CreneauxProgrammes.vue')
    },
    {
        path: '/ProfilAnimateur/:id',
        name: 'ProfilAnimateur',
        component: () =>
            import ('../views/ProfilAnimateur.vue')
    },
    {
        path: '/DetailCreneauProgramme/',
        name: 'DetailCreneauProgramme',
        component: () =>
            import ('../views/DetailCreneauProgramme.vue')
    },
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router