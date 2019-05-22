<template>
	<div>
        {{plataforma}} || {{plano}}
    </div>
</template>

<script>
	export default {
  		name: 'dados-pessoais',
  		data () {
  			return {
                plataforma: '',
                plano: []
  			}
  		},
  		methods: {
  		},
        created() {
            this.plataforma = (typeof this.$route.params.plataforma !== "undefined") ? this.$route.params.plataforma : localStorage.getItem("sku-plataforma");
            this.plano = (typeof this.$route.params.plano !== "undefined") ? this.$route.params.plano : localStorage.getItem("plano");
        },
	}
</script>

<style lang="scss">
</style>
