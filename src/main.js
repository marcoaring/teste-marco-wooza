import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Plataformas from './Plataformas.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

const router = new VueRouter({
	mode: 'history',
  	routes: [
  		{ 
    		path: '/', 
    		name: 'home',
    		component: Plataformas 
    	}
  	],
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
