<template>
    <div class="clientes">
        <PageTitle icon="fa fa-users" main="Clientes" 
        sub="Entre em contato com seus clientes"/>
        <b-col class="filtro">
            <b-form-input id="filter" type="text"
                v-model="filter"
                placeholder="Pesquisar ..." />
        </b-col>
        <b-table :stacked="mobile" hover striped :items="clientes" :filter="filter" :fields="fields" small>
            <template slot="actions" slot-scope="data">
                    <a :href="'tel:'+ data.item.telefone">
                    <b-button v-b-tooltip.hover="{title: 'Ligar', delay: 300}" variant="success" class="mr-2">
                        <i class="fa fa-phone"></i>
                    </b-button>
                    </a>
                    <a :href="'mailto:'+ data.item.email">
                    <b-button v-b-tooltip.hover="{title: 'Enviar e-mail', delay: 300}" variant="success" class="mr-2">
                        <i class="fa fa-envelope"></i>
                    </b-button>
                    </a>
                    <a :href="'sms:/'+ data.item.telefone">
                    <b-button v-b-tooltip.hover="{title: 'Enviar mensagem', delay: 300}" variant="success" class="mr-2">
                        <i class="fa fa-comment"></i>
                    </b-button>
                    </a>
            </template>
        </b-table>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle.vue'
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: 'Clientes',
    components: { PageTitle },
    data: function() {
        return {
            clientes: [],
            width: window.innerWidth,
            filter: '',
            fields: [
                { key: 'descricao', label: 'Nome', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true, class: 'word-wrap'},
                { key: 'telefone', label: 'Telefone', sortable: true, formatter: (value) => {
                    return value.replace(/(.{2})/, '($1) ').replace(/(.{4}$)/, '-$1')
                }},
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
        this.consultaClientes()
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
