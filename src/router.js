import Vue from 'vue'
import VueRouter from 'vue-router'

import Formulario from './components/Formulario-Component.vue'
import Respuestas from './components/Respuestas-Component.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/formulario' },
        { path: '/formulario', component: Formulario },
        { path: '/respuestas', component: Respuestas },
    ]
})