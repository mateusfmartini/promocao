<template>
        <div class="promocoes">
        <PageTitle icon="fa fa-dollar" main="Promoções" 
        sub="Cadastre promoções para seus clientes"/>
        <b-button variant="primary" @click="adicionarPromocoes">Adicionar</b-button>
        <b-col class="filtro" sm="9">
            <b-form-input id="filter" type="text"
                v-model="filter"
                placeholder="Pesquisar ..." />
        </b-col>
        <b-table :stacked="mobile" hover striped :items="promocoes" :filter="filter" :fields="fields" small> 
            <template slot="actions" slot-scope="data">
                <b-button v-b-tooltip.hover="{title: 'Editar', delay: 300}" variant="warning" @click="editarPromocao(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button v-b-tooltip.hover="{title: 'Excluir', delay: 300}" variant="danger" @click="removerPromocao(data.item)">
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
name: 'Promocoes',
components: { PageTitle },
    data: function() {
        return {
            promocoes: [],
            width: window.innerWidth,
            filter: '',
            fields: [
                { key: 'vigencia_ini', label: 'Início', sortable: true, formatter: (value) => {
                    return new Date(value).toLocaleString().substring(0,10)
                } },
                { key: 'vigencia_fim', label: 'Fim', sortable: true, formatter: (value) => {
                    return new Date(value).toLocaleString().substring(0,10)
                } },
                { key: 'codigo', label: 'Código', sortable: true },
                { key: 'descricao', label: 'Descrição', sortable: true },
                { key: 'percentual', label: 'Desconto', sortable: true, formatter: (value) => {
                    return `${value.replace('.',',')} %`
                } },
                { key: 'actions', label: 'Ações' }
            ],
            fornecedor: JSON.parse(localStorage.getItem(chaveFornecedor))
        }
    },
    methods: {
        consultaPromocoes() {
            const url = `${baseApiUrl}/fornecedores/${this.fornecedor.id}/promocoes`
            axios.get(url).then(res => {
                this.promocoes = res.data
            })
        },
        adicionarPromocoes() {
            this.$router.push({ path: '/promocoes/form' })
        },
        removerPromocao(promocao) {
            const url = `${baseApiUrl}/promocoes/${promocao.id}`
            axios.delete(url).then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.consultaPromocoes()
                })
                .catch(showError)
        },
        editarPromocao(promocao) {
            this.$router.push({
                name: 'formPromocoes',
                params: {
                    id: promocao.id,
                    descricao: promocao.descricao,
                    descricaodetalhada: promocao.descricaodetalhada,
                    vigencia_ini: promocao.vigencia_ini.toLocaleString().substring(0,10),
                    vigencia_fim: promocao.vigencia_fim.toLocaleString().substring(0,10),
                    quantidademaxima: promocao.quantidademaxima,
                    codigo: promocao.codigo,
                    percentual: promocao.percentual
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
    created() {
        window.addEventListener("resize", this.myEventHandler);
        this.consultaPromocoes()
    },
    destroyed() {
        window.removeEventListener("resize", this.myEventHandler);
    },
}
</script>
    
<style>
.promocoes > button {
        float: right;
        margin: 0 10px 10px 0;
    }
</style>
