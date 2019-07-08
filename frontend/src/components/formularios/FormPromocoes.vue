<template>
    <div class="form-promocoes">
        <b-button variant="danger" @click="cancelar">Cancelar</b-button>
        <b-button variant="primary" @click="salvar">Salvar</b-button>
        <div class="tabs">
        <b-tabs content-class="mt-3" justified>
            <b-tab title="Cadastro" active>
                <b-form>
                    <input id="promocao-id" type="hidden" v-model="promocao.id" />
                    <b-row>
                        <b-col sm="12">
                            <b-form-group label="Nome:" label-for="promocao-descricao">
                                <b-form-input id="promocao-descricao" type="text"
                                    v-model="promocao.descricao" required
                                    placeholder="Informe o nome da promoção..." />
                            </b-form-group>
                        </b-col>
                        <b-col sm="12">
                            <b-form-group label="Descrição:" label-for="promocao-descricaodetalhada">
                                <b-form-textarea id="promocao-descricaodetalhada"
                                    v-model="promocao.descricaodetalhada" required
                                    placeholder="Informe a descrição da promoção..." />
                            </b-form-group>
                        </b-col>
                        <b-col md="4" sm="12">
                            <b-form-group label="Data de Início:" label-for="promocao-vigencia_ini">
                                <b-form-input id="promocao-vigencia_ini" type="date"
                                    v-model="promocao.vigencia_ini" required
                                    placeholder="Informe a data de início da promoção..." />
                            </b-form-group>
                        </b-col>
                        <b-col md="4" sm="12">
                            <b-form-group label="Data de Fim:" label-for="promocao-vigencia_fim">
                                <b-form-input id="promocao-vigencia_fim" type="date"
                                    v-model="promocao.vigencia_fim" required
                                    placeholder="Informe a data de fim da promoção..." />
                            </b-form-group>
                        </b-col>
                        <b-col md="4" sm="12">
                            <b-form-group label="Quantidade Máxima:" label-for="promocao-quantidademaxima">
                                <b-form-input id="promocao-quantidademaxima" type="text"
                                    v-model="promocao.quantidademaxima" required
                                    placeholder="Quantidade máxima de pedidos..." />
                            </b-form-group>
                        </b-col>
                        <b-col md="6" sm="12">
                            <b-form-group label="Código do Cupom:" label-for="promocao-codigo">
                                <b-form-input id="promocao-codigo" type="text"
                                    v-model="promocao.codigo" required
                                    placeholder="Informe o código cupom ..." />
                            </b-form-group>
                        </b-col>
                        <b-col md="6" sm="12">
                            <b-form-group label="Percentual de Desconto (%):" label-for="promocao-percentual">
                                <b-form-input id="promocao-percentual" type="number"
                                    v-model="promocao.percentual" required
                                    placeholder="Informe o desconto da promoção..." />
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-form>
            </b-tab>
            <b-tab title="Produtos">
                <b-table
                :items="produtos"
                :fields="fields"
                :tbody-tr-class="rowClass"
                >                    
                    <template slot="quantidade" slot-scope="data">
                        <b-form-input id="data-quantidade" v-model="data.item.quantidade" required type="number" />
                    </template> 
                </b-table>{{promocao}}<br>
                {{selected}}
            </b-tab>
        </b-tabs>
        </div>
    </div>
</template>

<script>
import { showError, baseApiUrl, chaveFornecedor } from '@/global'
import axios from 'axios'

export default {
    name: 'FormPromocoes',
    data: function() {
        return {
            selectAll: false,
            promocao: {},
            produtos: [{codigo:'123', descricao: 'asdsada', quantidade: 5}],
            selected: [],
            fields: [
                { key: 'codigo', label: 'Código', sortable: true },
                { key: 'descricao', label: 'Descrição', sortable: true },
                { key: 'quantidade', label: 'Quantidade'}
            ]
        }
    },
    methods: {
        salvar() {
            if (this.promocao.id) {
                    axios.put(`${baseApiUrl}/promocoes/${this.promocao.id}`, this.promocao)
                    .then(() => {
                        this.salvarProdutosDaPromocao(this.promocao.id)
                        this.$toasted.global.defaultSuccess()
                        this.promocao = {}
                        this.$router.push({ path: '/promocoes' })
                    })
                    .catch(showError)
                } else {
                    axios.post(`${baseApiUrl}/promocoes`, this.promocao)
                    .then((result) => {
                        this.salvarProdutos(result.data.id)
                        this.$toasted.global.defaultSuccess()
                        this.promocao = {}
                        this.$router.push({ path: '/promocoes' })
                    })
                    .catch(showError)
            }
        },
        cancelar() {
            this.$router.push({ path: '/promocoes' })
        },
        goToProdutosPromocao() {
            this.$router.push({ path: '/promocoes/produtos/form' })
        },
        rowSelected(items) {
            items.forEach((item) => {
                item.idpromocao = this.promocao.id
            })
            this.selected = items
        },
        rowClass(item) {
            if (item.quantidade && item.quantidade > 0) return 'table-success'
        },
        consultaProdutos() {
            const url = `${baseApiUrl}/fornecedores/${this.promocao.idfornecedor}/produtos`
            axios.get(url).then(res => {
                this.produtos = res.data
            })
        },
        consultaProdutosDaPromocao() {
            const url = `${baseApiUrl}/promocoes/${this.promocao.id}/produtos`
            axios.get(url).then(res => {
                this.rowSelected(res.data)
            })
     
        },
        salvarProdutosDaPromocao(id) {
            const array = Array.from(this.selected)
            for (var i = 0; i < array.length; i++) {  
                const vinculo = {idproduto: array[i].id, idpromocao: id, quantidade: array[i].quantidade}
                        axios.post(`${baseApiUrl}/promocoes/produtos`, vinculo)
                        .catch(showError)
            }
        },
        selectRow(item) {
            if (item.quantidade != 0 || item.quantidade != null) {
                item._rowVariant = "info"
            } else {
                item._rowVariant = "default"
            }
        }
    },
    created() {
        this.promocao.idfornecedor = JSON.parse(localStorage.getItem(chaveFornecedor)).id

        this.promocao.id = this.$route.params.id
        this.promocao.descricao = this.$route.params.descricao
        this.promocao.descricaodetalhada = this.$route.params.descricaodetalhada
        this.promocao.vigencia_ini = this.$route.params.vigencia_ini
        this.promocao.vigencia_fim = this.$route.params.vigencia_fim
        this.promocao.quantidademaxima = this.$route.params.quantidademaxima
        this.promocao.codigo = this.$route.params.codigo
        this.promocao.percentual = this.$route.params.percentual

        this.consultaProdutos()
        this.consultaProdutosDaPromocao()

    }
}
</script>

<style>
.form-promocoes button {
    float: right;
    margin-bottom: 10px;
    margin-right: 10px;
}

.form-promocoes .tabs {
    clear: right;
}

</style>
