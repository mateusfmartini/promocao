<template>
    <div class="menu">
        <router-link to="/resgates">Promoções Retiradas</router-link>
        <router-link to="/clientes">Clientes</router-link>
        <router-link to="/produtos">Produtos</router-link>
        <router-link to="/promocoes">Promoções</router-link>
        <hr class="mx-3 my-1">
        <a href @click.prevent="logout"><i class="fa fa-sign-out"></i> Sair</a>
    </div>
</template>

<script>
import { chaveFornecedor } from '@/global'

export default {
    
    methods: {
        logout() {
            localStorage.removeItem(chaveFornecedor)
            this.$store.commit('setFornecedor', null)
            this.$router.push({ name: 'auth' })
        }
    }
}
</script>

<style>
.menu {
    display:flex;
    flex-direction: column;

}

.menu a:hover {
    background-color: #A4E7FF;
    text-decoration: none;
    color: black;
}

.menu a {
    padding: 10px 20px;
    text-decoration: none;
    color: black;
}
</style>
