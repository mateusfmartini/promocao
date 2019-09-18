<template>
    <b-table hover striped :items="resgates" :fields="fields" small></b-table>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: 'Resgates',
    data: function() {
        return {
            resgates: [],
            fields: [
                { key: 'codigocupom', label: 'Código do Cupom', sortable: true },
                { key: 'nomecliente', label: 'Cliente', sortable: true, class: 'word-wrap'},
                { key: 'dataresgate', label: 'Data do Resgate', sortable: true }
            ]
        }
    },
    methods: {
        consultaResgates() {
            const url = `${baseApiUrl}/frontend/promocoes/clientes`
            axios.get(url).then(res => {
                this.resgates = res.data
            })
        }
    },
    mounted() {
        this.consultaResgates()
    }
}
</script>

<style>
.word-wrap {
    word-break: break-all;
}
</style>