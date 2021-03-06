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
        path: '/EcouterDirect/id=:id',
        name: 'EcouterDirect',
        component: () =>
            import ('../views/EcouterDirect.vue')
    },
    {
        path: "/connexion",
        name: "ConnexionInscription", //corriger ça
        component: () =>
            import ("../views/Connexion.vue"),
    },
    {
        path: "/Deconnexion",
        name: "Deconnexion",
        component: () =>
            import ("../views/Deconnexion.vue"),
    },
    {
        path: '/Programmes',
        name: 'Programmes',
        component: () =>
            import ('../views/Programmes.vue')
    },
    {
        path: '/BordAnimateur',
        name: 'BordAnimateur',
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
        path: '/DetailCreneauProgramme/',
        name: 'DetailCreneauProgramme',
        component: () =>
            import ('../views/DetailCreneauProgramme.vue')
    },
    {
        path: "/connexionAnimateur",
        name: "ConnexionAnimateur",
        component: () =>
            import ("../views/ConnexionAnimateur.vue"),
    },
    {
        path: "/emissions/:nom",
        name: "EmissionsCategorie",
        component: () =>
            import ("../views/EmissionsCategorie.vue"),
    },
    {
        path: "/inscription",
        name: "Inscription",
        component: () =>
            import ("../views/Inscription.vue"),
    },
    {
        path: "/DetailEmission/:id",
        name: "DetailEmission",
        component: () =>
            import ("../views/DetailEmission.vue"),
    },
    {
        path: "/Animateurs/:id",
        name: "PodcastAnimateur",
        component: () =>
            import ("../views/PodcastAnimateur.vue"),
    }

]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router