<template>
    <div class="auth-modal">
        <img src="@/assets/logo.png" width="150" alt="Logo" />
        <hr>
        <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

        <input v-if="showSignup" v-model="fornecedor.descricao" type="text" placeholder="Nome da empresa">
        <input v-model="fornecedor.email" name="email" type="email" placeholder="E-mail">
        <the-mask v-if="showSignup" v-model="fornecedor.telefone" name="telefone" type="tel" placeholder="Telefone" :mask="['(##) ####-####', '(##) #####-####']" />
        <input v-model="fornecedor.password" name="password" type="password" placeholder="Senha">
        <input v-if="showSignup" v-model="fornecedor.passwordConfirm"
            type="password" placeholder="Confirme a Senha">

        <button v-if="showSignup" @click="signup">Registrar</button>
        <button v-else @click="signin">Entrar</button>

        <a href @click.prevent="showSignup = !showSignup">
            <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
            <span v-else>Não tem cadastro? Registre-se aqui!</span>
        </a>
    </div>
</template>

<script>
import { baseApiUrl, showError, chaveFornecedor } from '@/global'
import axios from 'axios'

export default {
    name: "Auth",
    data: function() {
        return {
            showSignup: false,
            fornecedor: {}
        }
    },
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/fornecedores/signin`, this.fornecedor)
                .then(res => {
                    this.$store.commit('setFornecedor', res.data)
                    localStorage.setItem(chaveFornecedor, JSON.stringify(res.data))
                    this.$router.push({ path: '/' })
                })
                .catch(showError)
        },
        signup() {
            axios.post(`${baseApiUrl}/fornecedores/signup`, this.fornecedor)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.fornecedor = {}
                    this.showSignup = false
                })
                .catch(showError)
        }

    },
    mounted() {
        document.querySelector('.content').classList.add('auth')
    },
    destroyed() {
        document.querySelector('.content').classList.remove('auth')
    }
}
</script>

<style>
    .auth-modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #FFF;
        padding:25px;
        border-radius: 12px 12px 12px 12px;
        -moz-border-radius: 12px 12px 12px 12px;
        -webkit-border-radius: 12px 12px 12px 12px;
        border: 1px solid #707070;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal button {
        align-self: flex-end;
        background-color: #2460ae;
        color: #FFF;
        padding: 5px 15px;
        border: 0;
        border-radius: 5px;
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }
</style>
