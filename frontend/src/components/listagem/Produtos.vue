<template>
    <div class="produtos">
        <b-button variant="primary" @click="adicionarProdutos">Adicionar</b-button>
        <b-table hover striped :items="produtos" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button v-b-tooltip.hover="{title: 'Editar', delay: 300}" variant="warning" @click="editarProduto(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button v-b-tooltip.hover="{title: 'Excluir', delay: 300}" variant="danger" @click="removerProduto(data.item)">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
    
</template>

<script>
import { baseApiUrl, showError, chaveFornecedor } from '@/global'
import axios from 'axios'

export default {
    name: 'Produtos',
    data: function() {
        return {
            produtos: [],
            fields: [
                { key: 'codigo', label: 'Código', sortable: true },
                { key: 'descricao', label: 'Descrição', sortable: true },
                { key: 'preco', label: 'Preço', sortable: true },
                { key: 'actions', label: 'Ações' }
            ],
            fornecedor: JSON.parse(localStorage.getItem(chaveFornecedor))
        }
    },
    methods: {
        consultaProdutos() {
            const url = `${baseApiUrl}/fornecedores/${this.fornecedor.id}/produtos`
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
        },
        editarProduto(produto) {
            this.$router.push({
                name: 'formProdutos',
                params: {
                    id: produto.id,
                    descricao: produto.descricao,
                    codigo: produto.codigo,
                    preco: produto.preco
                    } 
                })
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
