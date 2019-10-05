<template>
    <div class="resgates">
    <PageTitle icon="fa fa-shopping-cart" main="Promoções Retiradas" 
        sub="Consulte os clientes que retiraram suas promoções"/>
    <b-table :stacked="mobile" hover striped :items="resgates" :fields="fields" small></b-table>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle.vue'
import { baseApiUrl, chaveFornecedor } from '@/global'
import axios from 'axios'

export default {
    name: 'Resgates',
    components: { PageTitle },
    data: function() {
        return {
            resgates: [],
            width: window.innerWidth,
            fields: [
                { key: 'codigocupom', label: 'Código do Cupom', sortable: true },
                { key: 'nomecliente', label: 'Cliente', sortable: true, class: 'word-wrap'},
                { key: 'datahoraresgate', label: 'Data do Resgate', sortable: true }
            ],
            fornecedor: JSON.parse(localStorage.getItem(chaveFornecedor))
        }
    },
    methods: {
        consultaResgates() {
            const url = `${baseApiUrl}/fornecedores/${this.fornecedor.id}/promocoes/clientes`
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