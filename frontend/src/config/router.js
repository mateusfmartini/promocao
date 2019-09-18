import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/home/Home.vue'
import Auth from '@/components/auth/Auth.vue'
import Produtos from '@/components/listagem/Produtos.vue'
import Promocoes from '@/components/listagem/Promocoes.vue'
import Clientes from '@/components/listagem/Clientes.vue'
import Resgates from '@/components/listagem/Resgates.vue'
import FormProdutos from '@/components/formularios/FormProdutos.vue'
import FormPromocoes from '@/components/formularios/FormPromocoes.vue'

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
        name: 'promocoes',
        path: '/promocoes',
        component: Promocoes
    },{
        name: 'clientes',
        path: '/clientes',
        component: Clientes
    },{
        name: 'resgates',
        path: '/resgates',
        component: Resgates
    },{
        name: 'auth',
        path: '/auth',
        component: Auth
    },{
        name: 'formProdutos',
        path: '/produtos/form',
        component: FormProdutos,
        props: true
    },{
        name: 'formPromocoes',
        path: '/promocoes/form',
        component: FormPromocoes,
        props: true
    }

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
