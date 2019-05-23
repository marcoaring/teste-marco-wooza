<template>
	<section class="main-content">
        <h1 class="main-content__title">Plataformas</h1>
        <h2 class="main-content__subtitle">Escolha a plataforma que melhor lhe serve</h2>

        <div class="loader" v-show="loading">
            <img src="./assets/loading.gif" alt="Loader em Azul com bolas" />
        </div>

        <div class="content-boxes">
            <box :titulo="plataforma.nome" :descricao="plataforma.descricao"  :items="plataforma" rota="planos" v-for="(plataforma, index) in plataformas" :key="index"></box>
        </div>
  	</section>
</template>

<script>
    import Box from './components/Box';

	export default {
  		name: 'plataformas',
        components: { box: Box },
  		data () {
  			return {
  				plataformas: [],
                loading: true
  			}
  		},
  		methods: {
  			loadPlataformas() {
        		let self = this

        		this.$http.get('http://private-59658d-celulardireto2017.apiary-mock.com/plataformas').then(
         		response => {
           			self.plataformas = response.body.plataformas;
                    self.loading = false;
         		},
         		error => {
           			console.log(error)
         		})
       		}
  		},
     	created() {
      		this.loadPlataformas();
    	}
	}
</script>
