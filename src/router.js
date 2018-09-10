import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Query_Builder from './views/Query-builder.vue'
import Configurator from './views/Configurator.vue'

Vue.use(Router)

export default new Router({
    //mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        // {
        //     path: '/',
        //     redirect: function (go) {
        //         console.log(go)
        //         //go.$router.push('/'+go.$store.state.group)
        //     }
        // },
        {
            path: '/',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/query-builder',
            name: 'Query-builder',
            component: Query_Builder
        },
        {
            path: '/configurator',
            name: 'Configurator',
            component: Configurator
        }
    ]
})
