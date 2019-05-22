import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Plataformas from './Plataformas.vue'
import Planos from './Planos.vue'
import DadosPessoais from './DadosPessoais.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
	mode: 'history',
  	routes: [
  		{ 
    		path: '/', 
    		name: 'home',
    		component: Plataformas 
    	},
      { 
        path: '/planos', 
        name: 'planos',
        component: Planos 
      },
      { 
        path: '/dados-pessoais',
        name: 'dados-pessoais', 
        component: DadosPessoais 
      }
  	],
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
