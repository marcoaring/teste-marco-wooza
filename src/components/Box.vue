<template>
	<div class="main-box">
    	<h3 class="main-box__title">{{titulo}}</h3>
    	<span class="main-box__value" v-if="valor"><small>R$</small>{{valor}}</span>
    	<a href="#" class="main-box__aparelho" @click.prevent="onClick(aparelho)" v-if="aparelho">Informação de aparelho</a>
    	<!--  -->
        <p class="main-box__description" v-if="descricao">{{descricao}}</p>

      	<router-link :to="{ name: rota, params: {plataforma: items } }" @click.native="addStorage(items)" class="main-box__link" v-if="rota == 'planos'">Planos</router-link>
		
		<router-link :to="{ name: rota, params: {plataforma: plataforma, plano: items} }" @click.native="addStorage(items)" class="main-box__link" v-else>Assine Agora!</router-link>
    </div>
</template>

<script>
	export default {
		name: 'box',
		props: ['titulo', 'descricao', 'valor', 'items', 'rota', 'aparelho', 'plataforma', 'onClick'],
		methods: {
			addStorage(storage) {
				if(this.rota == 'planos'){
	  				localStorage.setItem("plataforma", JSON.stringify(storage));
	  			} else {
	  				localStorage.setItem("plano", JSON.stringify(storage));
	  			}
  			}
		}
	}
</script>

<style lang="scss">
$corPrincipal: #007aff;

.swiper-container{ 
    width: 100%;
    height: 220px;

    .main-box{ 
        margin-top: 15px;
        width: auto; 

        &:hover{
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
        }
    }
}

.main-box{
	width: 250px;
    margin: 0px 15px;
    border-top: 2px solid $corPrincipal;
    padding: 15px;
    background-color: #fff;
    transition: all .3s linear;
    box-shadow: 0 1px 2px rgba(0,0,0,.075);

    &__title{
        font-size: 25px;
        margin: 0;
        text-transform: uppercase;
    }
    
    &__description{ min-height: 40px; }

    &__value{
        display: block;
        margin: 15px 0;
        font-size: 35px;
        font-weight: 700;

        small{
            font-size: 15px;
            font-weight: 400;
            display: inline-block;
            vertical-align: top;
            margin-top: 5px;
            margin-right: 5px;
        }
    }

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

    &__aparelho{
        outline: none;
        display: block;
        color: #d6d6d6;
        font-size: 11px;
        margin-bottom: 10px;
        text-transform: uppercase;
        transition: all .3s linear;

        &:hover{
            color: $corPrincipal;
        }
    }

    &:hover{ box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.5); }

    @media screen and (max-width: 426px) {
        width: 100%;
        margin-bottom: 30px;
    }

    @media screen and (min-width: 427px) and (max-width: 769px) {
        width: calc(50% - 30px);
        flex: 1 0 21%;
        margin-bottom: 30px;
    }
}
</style>
