<template>
    <b-table hover striped :items="clientes" :fields="fields"></b-table>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'Clientes',
    data: function() {
        return {
            clientes: [],
            fields: [
                { key: 'descricao', label: 'Nome', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true, class: 'word-wrap'},
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        consultaClientes() {
            const url = `${baseApiUrl}/clientes`
            axios.get(url).then(res => {
                this.clientes = res.data
            })
        }
    },
    mounted() {
        this.consultaClientes()
    }
}
</script>

<style>
.word-wrap {
    word-break: break-all;
}
</style>
