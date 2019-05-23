<template>
    <section class="main-content">
        <h1 class="main-content__title">Planos</h1>
        <h2 class="main-content__subtitle">Escolha o plano que cabe no seu bolso</h2>
        
        <div class="loader" v-show="loading">
            <img src="./assets/loading.gif" alt="Loader em Azul com bolas" />
        </div>

        <swiper :options="swiperOption" class="content-boxes" v-if="planos.length > 3">
            <swiper-slide v-for="(plano, index) in planos" :key="index">
                <box :titulo="plano.franquia" :valor="plano.valor"  :items="plano" rota="dados-pessoais" :onClick="loadAparelho"></box>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>

        <div class="content-boxes" v-else>
            <box :titulo="plano.franquia" :valor="plano.valor" :items="plano" rota="dados-pessoais" :plataforma="plataforma" :aparelho="plano.aparelho" :onClick="loadAparelho" v-for="(plano, index) in planos" :key="index"></box>
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
    import Box from './components/Box';
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

	export default {
        components: { swiper, swiperSlide, box: Box },
  		name: 'planos',
  		data () {
  			return {
                plataforma: [],
                lightbox: false,
                loading: true,
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
                    },
                    breakpoints: {
                        // when window width is <= 426px
                        426: {
                            slidesPerView: 1,
                            height: 'auto'
                        },
                        769: {
                            slidesPerView: 2
                        }
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
                    self.loading = false;
                },
                error => {
                    console.log(error)
                })
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

.content-boxes .swiper-pagination{ bottom:0; }

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

    @media screen and (max-width: 426px) {
        &__container{ width: 80vw; }

        &__close{ right: 10vw; }
    }
}
</style>
