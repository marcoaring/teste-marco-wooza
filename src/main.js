import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Plataformas from './Plataformas'
import Planos from './Planos'
import DadosPessoais from './DadosPessoais'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
  	routes: [
        { path: '/', name: 'home', component: Plataformas },
        { path: '/planos', name: 'planos', component: Planos },
        { path: '/dados-pessoais', name: 'dados-pessoais', component: DadosPessoais }
  	],
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
