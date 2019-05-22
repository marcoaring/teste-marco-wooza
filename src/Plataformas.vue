<template>
	<section class="content-plataformas">
        <h1 class="content-plataformas__title">Plataformas</h1>
        <h2 class="content-plataformas__subtitle">Escolha a plataforma que melhor lhe serve</h2>
        <div class="content-boxes">
      		<div class="content-boxes__box main-box" v-for="plataforma in plataformas">
                <h3 class="main-box__title">{{plataforma.nome}}</h3>
                <p class="main-box__description">{{plataforma.descricao}}</p>
      			<router-link :to="{ name: 'planos', params: {plataforma: plataforma } }" @click.native="addStorage(plataforma)" class="main-box__link">Planos</router-link>
      		</div>
        </div>
  	</section>
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
       		addStorage(plataforma) {
  				localStorage.setItem("plataforma", JSON.stringify(plataforma));
  			}
  		},
     	created() {
      		this.loadPlataformas();
    	}
	}
</script>

<style lang="scss">
$corPrincipal: #007aff;

.content-plataformas{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    width: 1024px;
    min-height: 100vh;
    margin: 0 auto;
    
    &__title{
        color: $corPrincipal;
        font-size: 25px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 0px;
        margin-bottom: 5px;
    }

    &__subtitle{
        color: #757374;
        font-size: 18px;
        font-weight: 700;
        margin-top: 0px;
        margin-bottom: 30px;
    }
}

.content-boxes{
    display: flex;
    justify-content: space-between;
    flex-flow: row wrap;

    &__box{
        width: 250px;
        margin: 0px 15px;
        border-top: 2px solid $corPrincipal;
        padding: 15px;
        background-color: #fff;
        transition: all .3s linear;
        box-shadow: 0 1px 2px rgba(0,0,0,.075);

        &:hover{
            box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.5);
        }
    }
}

.main-box{
    &__title{
        margin: 0;
        text-transform: uppercase;
    }
    
    &__description{ min-height: 40px; }

    &__link{
        font-weight: 700;
        outline: none;
        border: 2px solid $corPrincipal;
        display: block;
        text-align: center;
        text-decoration: none;
        color: #ffffff;
        background-color: $corPrincipal;
        padding: 10px;
        text-transform: uppercase;
        font-size: 14px;
        margin-top: 5px;
        transition: all .3s linear;

        &:hover{
            color: $corPrincipal;
            background-color: transparent;
        }
    }
}
</style>
