import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
    router,
    store,
    watch: {
        '$route': function(to, from) {
            if(from.name === 'Configurator' && store.state.configDirtyBool) {
                store.dispatch('updateConfigDirtyBool', false);
            }

            console.log(to.name, from.name)
        }
    },
    render: h => h(App)
}).$mount('#app')
