<template>
    <section class="content-dados">
        <h1 class="content-dados__title">Dados Cadastrais</h1>
        <h2 class="content-dados__subtitle">Informe seus dados para prosseguir com a contratação</h2>
        <section class="content-dados__form">
            <form class="content-form" @submit.prevent="sendForm()">
                <div class="content-form__block-field">
                    <label for="nome" class="content-form__label">Nome</label>
                    <input type="text" name="nome" id="nome" class="content-form__input" placeholder="Digite o seu nome" v-model="nomeInput" required>
                </div>

                <div class="content-form__block-field">
                    <label for="email" class="content-form__label">E-mail</label>
                    <input type="email" name="email" id="email" class="content-form__input" placeholder="Digite o seu e-mail" v-model="emailInput" required>
                </div>

                <div class="content-form__block-field">
                    <label for="data_nascimento" class="content-form__label">Data de Nascimento</label>
                    <input type="text" name="data_nascimento" id="data_nascimento" class="content-form__input" placeholder="Digite a sua data de nascimento" v-model="data_nascimentoInput" required v-imask="mascaraNascimento">
                </div>

                <div class="content-form__block-field">
                    <label for="cpf" class="content-form__label">CPF</label>
                    <input type="text" name="cpf" id="cpf" class="content-form__input" placeholder="Digite o seu CPF" v-model="cpfInput" required v-imask="mascaraCpf">
                </div>

                <div class="content-form__block-field">
                    <label for="telefone" class="content-form__label">Telefone</label>
                    <input type="text" name="telefone" id="telefone" class="content-form__input" placeholder="Digite o seu telefone" v-model="telefoneInput" required v-imask="mascaraTelefone">
                </div>

                <div class="content-form__block-field">
                    <button type="submit" class="content-form__button">Enviar dados</button>
                </div>
            </form>
        </section>
    </section>
</template>

<script>
    import swal from 'sweetalert'
    import {IMaskDirective} from 'vue-imask';
	export default {
        directives: { imask: IMaskDirective },
  		name: 'dados-pessoais',
  		data () {
  			return {
                plataforma: '',
                nomeInput: '',
                emailInput: '',
                data_nascimentoInput: '',
                cpfInput: '',
                telefoneInput: '',
                mascaraNascimento: {
                    mask: '00/00/0000'
                },
                mascaraCpf: {
                    mask: '000.000.000-00'
                },
                mascaraTelefone: {
                    mask: '(00)0000-0000{0}'
                },
                plataforma: [],
                plano: []
  			}
  		},
  		methods: {
            sendForm() {
                swal({
                    title: "Confirmação de dados!",
                    text: "Olá " + this.nomeInput + ", gostaríamos de confirmar que você escolheu a plataforma '" + this.plataforma.nome + "' com o plano de " + this.plano.franquia + " no valor de R$" + this.plano.valor + ". É isso mesmo?",
                    icon: "warning",
                    buttons: true,
                    buttons: ["Cancelar Assinatura", "Confirmar Assinatura"],
                })
                .then((success) => {
                    if (success) {
                        swal("Parabéns! Sua assinatura foi realizada com sucesso.", {
                            icon: "success",
                        });
                    } else {
                        swal.close();
                    }
                });
                console.clear();
                console.log('PLATAFORMA: ' + this.plataforma.nome);
                console.log('DESCRIÇÃO DA PLATAFORMA: ' + this.plataforma.descricao);
                console.log('FRANQUIA DO PLANO: ' + this.plano.franquia);
                console.log('VALOR DO PLANO: R$' + this.plano.valor);
                if(this.plano.aparelho){
                    console.log('NOME DO APARELHO: ' + this.plano.aparelho.nome);
                    console.log('VALOR DO APARELHO: R$' + this.plano.aparelho.valor);
                    console.log('NÚMERO DE PARCELAS = ' + this.plano.aparelho.numeroParcelas); 

                    if(this.plano.aparelho.valorParcela){
                        console.log('VOCÊ PAGARÁ ' + this.plano.aparelho.numeroParcelas + 'x de R$' + this.plano.aparelho.valorParcela);
                    }
                }
                console.log('NOME: ' + this.nomeInput);
                console.log('E-MAIL: ' + this.emailInput);
                console.log('DATA DE NASCIMENTO: ' + this.data_nascimentoInput);
                console.log('CPF: ' + this.cpfInput);
                console.log('TELEFONE: ' + this.telefoneInput);
            }
  		},
        created() {
            this.plataforma = (typeof this.$route.params.plataforma !== "undefined") ? this.$route.params.plataforma : JSON.parse(localStorage.getItem("plataforma"));
            this.plano = (typeof this.$route.params.plano !== "undefined") ? this.$route.params.plano : JSON.parse(localStorage.getItem("plano"));
        },
	}
</script>

<style lang="scss">
$corPrincipal: #007aff;

.content-dados{
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

    &__form{
        width: 40%;
        padding: 30px;
        background-color: #fff;
        border-radius: 8px;
    }

    .content-form{
        &__block-field{
            margin-bottom: 20px;
        }

        &__label{
            display: block;
            color: $corPrincipal;
            text-transform: uppercase;
            font-size: 13px;
            margin-bottom: 5px;
        }

        &__input{
            width: calc(100% - 30px);
            border: 1px solid #f8f8f8;
            outline: none;
            padding: 10px 15px;
            transition: all .3s linear;
            box-shadow: 0 1px 2px rgba(0,0,0,.075);

            &:focus{
                border-color: $corPrincipal;
            }
        }

        &__button{
            border: 2px solid $corPrincipal;
            outline: none;
            background-color: $corPrincipal;
            color: #fff;
            text-transform: uppercase;
            font-weight: 700;
            padding: 10px 15px;
            transition: all .3s linear;
            box-shadow: 0 1px 2px rgba(0,0,0,.075);

            &:hover{
                cursor: pointer;
                background-color: transparent;
                color: $corPrincipal;
            }
        }
    }
}
</style>
