<template>
    <b-table :stacked="mobile" hover striped :items="resgates" :fields="fields" small></b-table>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: 'Resgates',
    data: function() {
        return {
            resgates: [],
            width: window.innerWidth,
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
        this.consultaResgates()
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
.word-wrap {
    word-break: break-all;
}
</style>