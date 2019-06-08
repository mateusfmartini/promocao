<template>
    <div class="form-produtos">
        <b-button variant="danger" @click="cancelar">Cancelar</b-button>
        <b-button variant="primary" @click="salvar">Salvar</b-button>

        <b-form>
            <input id="produto-id" type="hidden" v-model="produto.id" />
            <b-row>
                <b-col sm="12">
                    <b-form-group label="Nome:" label-for="produto-descricao">
                        <b-form-input id="produto-descricao" type="text"
                            v-model="produto.descricao" required
                            placeholder="Informe o Nome do Produto..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Código:" label-for="produto-codigo">
                        <b-form-input id="produto-codigo" type="text"
                            v-model="produto.codigo" required
                            placeholder="Informe o Código do Produto..." />
                    </b-form-group>
                </b-col>
                <b-col sm="6">
                    <b-form-group label="Preço:" label-for="produto-preco">
                        <b-form-input id="produto-preco" type="number"
                            v-model="produto.preco" required
                            placeholder="Informe o Preço do Produto..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12">
                    <b-form-group label="Segmentação:" label-for="produto-segmentacoes">
                        <Multiselect v-model="produto.segmentacoes" 
                            tag-placeholder="Adicione como uma nova segmentação" 
                            placeholder="Pesquise ou adicione uma segmentação" 
                            label="descricao" track-by="sglsegmentacao" :options="options" :taggable="true" :multiple="true" 
                            @tag="addTag" :closeOnSelect="false" selectedLabel="Selecionado"
                            deselectLabel="Clique ou pressione ENTER para remover" 
                            selectLabel="Clique ou pressione ENTER para selecionar">
                            <template slot="noOptions">Não há segmentações</template>
                        </Multiselect>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
        <div>
            
        </div>
    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { showError, baseApiUrl, chaveFornecedor } from '@/global'
import axios from 'axios'

export default {
    name: 'FormProdutos',
    components: { Multiselect },
    data: function() {
        return {
            produto: {segmentacoes: []},
            options: []
        }
    },
    methods: {
        salvar() {
            if (this.produto.id) {
                    axios.put(`${baseApiUrl}/produtos/${this.produto.id}`, this.produto)
                    .then(() => {
                        this.salvarSegmentacoesDoProduto(this.produto.id)
                        this.$toasted.global.defaultSuccess()
                        this.produto = {}
                        this.$router.push({ path: '/produtos' })
                    })
                    .catch(showError)
                } else {
                    axios.post(`${baseApiUrl}/produtos`, this.produto)
                    .then(result => {
                        this.salvarSegmentacoes(result.data.id)
                        this.$toasted.global.defaultSuccess()
                        this.produto = {}
                        this.$router.push({ path: '/produtos' })
                    })
                    .catch(showError)
            }
        },
        salvarSegmentacoes(id) {
            const array = Array.from(this.produto.segmentacoes)
            for (var i = 0; i < array.length; i++) {
                if (array[i].isNew) {
                    axios.post(`${baseApiUrl}/segmentacoes`, array[i])
                    .then(result => {
                        const vinculo = {idproduto: id, idsegmentacao: result.data.id}
                        axios.post(`${baseApiUrl}/produtos/segmentacoes`, vinculo)
                        .catch(showError)
                    })
                    .catch(showError)
            } else { 
                const vinculo = {idproduto: id, idsegmentacao: array[i].id}
                        axios.post(`${baseApiUrl}/produtos/segmentacoes`, vinculo)
                        .catch(showError)
            }}
        },
        salvarSegmentacoesDoProduto(id) {
            axios.delete(`${baseApiUrl}/produtos/${this.produto.id}/segmentacoes`)
            .then(this.salvarSegmentacoes(id))
            .catch(showError)
        },
        cancelar() {
            this.$router.push({ path: '/produtos' })
        },
        addTag (newTag) {
            const tag = {
                descricao: newTag.charAt(0).toUpperCase() + newTag.toLowerCase().slice(1),
                sglsegmentacao: newTag.toLowerCase().trim(),
                isNew: true
            }
            this.options.push(tag)
            this.produto.segmentacoes.push(tag)
        },
        getSegmentacoes() {
            axios.get(`${baseApiUrl}/segmentacoes`)
                .then(res => {
                    res.data.forEach((option) => {
                        this.options.push(option)
                    })
                })
        },
        getSegmentacoesDoProduto() {
            axios.get(`${baseApiUrl}/produtos/${this.produto.id}/segmentacoes`)
                .then(res => {
                    res.data.forEach((option) => {
                        this.produto.segmentacoes.push(option)
                    })
                })
        }
    },
    created() {
        this.produto.idfornecedor = JSON.parse(localStorage.getItem(chaveFornecedor)).id

        this.produto.id = this.$route.params.id
        this.produto.descricao = this.$route.params.descricao
        this.produto.codigo = this.$route.params.codigo
        this.produto.preco = this.$route.params.preco

        this.getSegmentacoes()
        if (this.produto.id) this.getSegmentacoesDoProduto()
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.form-produtos button {
    float: right;
    margin-bottom: 10px;
    margin-right: 10px;
}

.form-produtos form {
    clear: right;
}
</style>
