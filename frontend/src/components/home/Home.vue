<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Página de Início" 
        sub="Seja bem vindo ao sistema de promoções e descontos"/>
        <graph-bar
                :height="300"
                :labels="labels"
                :values="values">
            <note :text="'Promoções retiradas na semana'"></note>
            <tooltip :names="['']" :position="'left'"></tooltip>
        </graph-bar>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle.vue'
import { showError, baseApiUrl } from '@/global'
import axios from 'axios'
import { mapState } from "vuex"


export default {
    name: 'Home',
    components: { PageTitle },
    data: function() {
        return { 
            labels: [],
            values: [],
        }    
    },
    methods: {
        consultarDashboard() {
            axios.get(`${baseApiUrl}/dashboard/8`)
            .then(res => {
                this.labels = res.data[0].retiradassemana.datasemana
                this.values = res.data[0].retiradassemana.qtdresgates
            })
            .catch(showError)
        }
    },
    computed: {
        ...mapState(['fornecedor']),
    },
    created() {
        this.consultarDashboard()
    }
}
</script>

<style>

</style>
