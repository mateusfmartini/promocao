<template>
    <div class="menu">
        <router-link to="/pedidos">Pedidos</router-link>
        <router-link to="/clientes">Clientes</router-link>
        <router-link to="/produtos">Produtos</router-link>
        <router-link to="/promocoes">Promoções</router-link>
    </div>
</template>

<script>
export default {

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
