<template>
	<div>
  		<div v-for="plataforma in plataformas">
  			{{plataforma.sku}} || {{plataforma.nome}} || {{plataforma.descricao}}
  			<router-link :to="{ name: 'planos', params: {sku: plataforma.sku } }" @click.native="addStorage(plataforma.sku)">Adicionar!</router-link>
  		</div>
  	</div>
</template>

<script>
	export default {
  		name: 'plataformas',
  		data () {
  			return {
  				plataformas: [],
  			}
  		},
  		methods: {
  			loadPlataformas() {
        		let self = this

        		this.$http.get('http://private-59658d-celulardireto2017.apiary-mock.com/plataformas').then(
         		response => {
           			self.plataformas = response.body.plataformas;
         		},
         		error => {
           			console.log(error)
         		})
       		},
       		addStorage(sku) {
  				localStorage.setItem("sku-plataforma", sku);
  			}
  		},
     	created() {
      		this.loadPlataformas();
    	}
	}
</script>

<style lang="scss">
</style>
