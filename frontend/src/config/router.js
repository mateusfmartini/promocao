import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/home/Home.vue'
import Produtos from '@/components/listagem/Produtos.vue'
import Clientes from '@/components/listagem/Clientes.vue'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },{
        name: 'produtos',
        path: '/produtos',
        component: Produtos
    },{
        name: 'clientes',
        path: '/clientes',
        component: Clientes
    }

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
