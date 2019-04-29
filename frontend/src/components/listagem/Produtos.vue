<template>
    <b-table hover striped :items="produtos" :fields="fields"></b-table>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
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
            ]
        }
    },
    methods: {
        consultaProdutos() {
            const url = `${baseApiUrl}/produtos`
            axios.get(url).then(res => {
                this.produtos = res.data
            })
        }
    },
    mounted() {
        this.consultaProdutos()
    }
}
</script>

<style>

</style>
