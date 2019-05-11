<template>
    <div class="produtos">
        <b-button variant="primary" @click="adicionarProdutos">Adicionar</b-button>
        <b-table hover striped :items="produtos" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="removerProduto(data.item)">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
    
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'Produtos',
    data: function() {
        return {
            mostrarFormulario: false,
            produtos: [],
            fields: [
                { key: 'codigo', label: 'Código', sortable: true },
                { key: 'descricao', label: 'Descrição', sortable: true },
                { key: 'preco', label: 'Preço', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        consultaProdutos() {
            const url = `${baseApiUrl}/produtos`
            axios.get(url).then(res => {
                this.produtos = res.data
            })
        },
        adicionarProdutos() {
            this.$router.push({ path: '/produtos/form' })
        },
        removerProduto(produto) {
            const url = `${baseApiUrl}/produtos/${produto.id}`
            axios.delete(url).then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.consultaProdutos()
                })
                .catch(showError)
        }
    },
    mounted() {
        this.consultaProdutos()
    }
}
</script>

<style>
    .produtos > button {
        float: right;
        margin: 0 10px 10px 0;
    }

</style>
