<template>
	<div>
        <div v-for="plano in planos">
            {{plano.sku}} || {{plano.franquia}} || {{plano.valor}} || {{plano.ativo}}
            <router-link :to="{ name: 'dados-pessoais', params: {plataforma: sku, plano: plano} }" @click.native="addStorage(plano)">Adicionar!</router-link>
        </div>
    </div>
</template>

<script>
	export default {
  		name: 'planos',
  		data () {
  			return {
                sku: '',
                planos: []
  			}
  		},
  		methods: {
            loadPlanos(sku) {
                let self = this

                this.$http.get(`http://private-59658d-celulardireto2017.apiary-mock.com/planos/${sku}`).then(
                response => {
                    self.planos = response.body.planos;
                },
                error => {
                    console.log(error)
                })
            },
            addStorage(plano) {
                localStorage.setItem("plano", plano);
            }
  		},
        created() {
            this.sku = (typeof this.$route.params.sku !== "undefined") ? this.$route.params.sku : localStorage.getItem("sku-plataforma");
            this.loadPlanos(this.sku);
        },
	}
</script>

<style lang="scss">
</style>
