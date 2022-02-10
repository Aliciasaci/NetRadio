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
        path: '/Animateur',
        name: 'Animateur',
        component: () =>
            import ('../views/Animateur.vue')
    },
    {
        path: '/Auditeur',
        name: 'Auditeur',
        component: () =>
            import ('../views/Auditeur.vue')
    },
    {
        path: '/Programmes',
        name: 'Programmes',
        component: () =>
            import ('../views/Programmes.vue')
    },
    {
        path: '/connexion',
        name: 'ConnexionInscription',
        component: () =>
            import ('../views/Connexion.vue')
    },
    {
        path: '/invite',
        name: 'Invite',
        component: () =>
            import ('../views/Invite.vue')
    },
    {
        path: '/connexionAnimateur',
        name: 'ConnexionAnimateur',
        component: () =>
            import ('../views/ConnexionAnimateur.vue')
    }
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router