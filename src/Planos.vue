<template>
    <section class="content-planos">
        <h1 class="content-planos__title">Planos</h1>
        <h2 class="content-planos__subtitle">Escolha o plano que cabe no seu bolso</h2>

        <swiper :options="swiperOption" class="content-boxes" v-if="planos.length > 3">
            <swiper-slide v-for="(plano, index) in planos" :key="index">
                <div class="content-boxes__box main-box">
                    <h3 class="main-box__title">Plano de {{plano.franquia}}</h3>
                    <span class="main-box__value"><small>R$</small>{{plano.valor}}</span>
                    <a href="#" class="main-box__aparelho" v-if="plano.aparelho" @click.prevent="loadAparelho(plano.aparelho)">Informação de aparelho</a>
                    <router-link :to="{ name: 'dados-pessoais', params: {plataforma: plataforma, plano: plano} }" @click.native="addStorage(plano)" class="main-box__link">Assine Agora!</router-link>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>

        <div class="content-boxes" v-else>
            <div class="content-boxes__box main-box" v-for="(plano, index) in planos" :key="index">
                <h3 class="main-box__title">Plano de {{plano.franquia}}</h3>
                <span class="main-box__value"><small>R$</small>{{plano.valor}}</span>
                <a href="#" class="main-box__aparelho" v-if="plano.aparelho" @click.prevent="loadAparelho(plano.aparelho)">Informação de aparelho</a>
                <router-link :to="{ name: 'dados-pessoais', params: {plataforma: plataforma, plano: plano} }" @click.native="addStorage(plano)" class="main-box__link">Assine Agora!</router-link>
            </div>
        </div>

        <section class="content-lightbox" v-if="lightbox">
            <span class="content-lightbox__close" @click.prevent="lightbox = false">X</span>
            <div class="content-lightbox__container">
                <h1 class="content-lightbox__title">Aparelho</h1>

                <ul class="content-lightbox__list">
                    <li class="content-lightbox__item">
                        <strong>Nome: </strong>{{aparelho.nome}}
                    </li>
                    <li class="content-lightbox__item">
                        <strong>Valor: </strong>R$ {{aparelho.valor}}
                    </li>
                    <li class="content-lightbox__item">
                        <strong>Número de Parcelas: </strong>{{aparelho.numeroParcelas}}x
                    </li>
                    <li class="content-lightbox__item" v-show="aparelho.valorParcela">
                        <strong>Valor das Parcelas: </strong>{{aparelho.numeroParcelas}}x de R${{aparelho.valorParcela}}
                    </li>
                </ul>
            </div>
        </section>
    </section>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

	export default {
        components: { swiper, swiperSlide },
  		name: 'planos',
  		data () {
  			return {
                plataforma: [],
                lightbox: false,
                planos: [],
                aparelho: [],
                swiperOption: {
                    height: 190,
                    slidesPerView: 3,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                }
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
                localStorage.setItem("plano", JSON.stringify(plano));
            },
            loadAparelho(aparelho){
                this.lightbox = true;
                this.aparelho = aparelho;
            }
  		},
        created() {
            this.plataforma = (typeof this.$route.params.plataforma !== "undefined") ? this.$route.params.plataforma : JSON.parse(localStorage.getItem("plataforma"));
            this.loadPlanos(this.plataforma.sku);

            new Swiper('.swiper-container', {
              slidesPerView: 3,
              spaceBetween: 30,
              pagination: {
                el: '.swiper-pagination',
                clickable: true,
              },
            });
        },
	}
</script>

<style lang="scss">
$corPrincipal: #007aff;

.content-planos{
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

    .swiper-pagination{bottom:0; }
}

.swiper-container{ 
    width: 100%;
    height: 220px;

    .content-boxes__box{ 
        margin-top: 15px;
        width: auto; 

        &:hover{
            box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
        }
    }
}

.main-box{
    &__title{
        font-size: 25px;
        margin: 0;
        text-transform: uppercase;
    }

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
}

.content-lightbox{
    position: absolute;
    top:0;
    left: 0;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.5);
    width: 100vw;
    height: 100vh;
    transition: all .3s linear;

    &__container{
        width: 60vw;
        max-height: 60vh;
        background-color: #fff;
        border-radius: 15px; 
        padding: 15px;
    }
    
    &__title{ margin-top: 0px; }

    &__list{
        list-style: none;
        margin: 0px;
        padding: 0px;
    }

    &__item{
        padding: 10px;
        border-bottom: 1px solid $corPrincipal;
    }

    &__close{
        position: absolute;
        right: 20vw;
        top: 20vh;
        color: $corPrincipal;
        background-color: #fff;
        font-size: 20px;
        padding:5px 11px;
        border-radius: 100%;
        text-align: center;
        transition: all .3s linear;

        &:hover{
            cursor: pointer;
            color:#fff;
            background-color: $corPrincipal;
        }
    }
}
</style>
