<template>
    <div class="produtos">
        <PageTitle icon="fa fa-cube" main="Produtos" 
        sub="Cadastre seus produtos"/>
        <b-button variant="primary" @click="adicionarProdutos">Adicionar</b-button>
        <b-col class="filtro" sm="9">
            <b-form-input id="filter" type="text"
                v-model="filter"
                placeholder="Pesquisar ..." />
        </b-col>
        <b-table :stacked="mobile" hover striped :items="produtos" :filter="filter" :fields="fields" small>
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
import PageTitle from '@/components/template/PageTitle.vue'
import { baseApiUrl, showError, chaveFornecedor } from '@/global'
import axios from 'axios'

export default {
    name: 'Produtos',
    components: { PageTitle },
    data: function() {
        return {
            produtos: [],
            width: window.innerWidth,
            filter: '',
            fields: [
                { key: 'codigo', label: 'Código', sortable: true },
                { key: 'descricao', label: 'Descrição', sortable: true },
                { key: 'preco', label: 'Preço', sortable: true, formatter: value => {
                    return `R$ ${value.replace('.',',')}`
                }},
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
        },
        myEventHandler() {
            this.width = window.innerWidth
        }
    },
    computed: {
        mobile() {
            return this.width < 576 ? true : false
        }
    },
    mounted() {
        this.consultaProdutos()
    },
    created() {
        window.addEventListener("resize", this.myEventHandler);
    },
    destroyed() {
        window.removeEventListener("resize", this.myEventHandler);
    },
}
</script>

<style>
    .produtos > button {
        float: right;
        margin: 0 10px 10px 0;
    }
    .table {
        clear: both;
    }

    .filtro {
        display: inline-block;
        margin-bottom: 10px;
    }

</style>
