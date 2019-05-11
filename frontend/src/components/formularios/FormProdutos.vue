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
        </b-form>
    </div>
</template>

<script>
import { showError, baseApiUrl, chaveFornecedor } from '@/global'
import axios from 'axios'

export default {
    name: 'FormProdutos',
    data: function() {
        return {
            produto: {}
        }
    },
    methods: {
        salvar() {
            if (this.produto.id) {
                axios.put(`${baseApiUrl}/produtos/${this.produto.id}`, this.produto)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.produto = {}
                    this.$router.push({ path: '/produtos' })
                })
                .catch(showError)
            } else {
                axios.post(`${baseApiUrl}/produtos`, this.produto)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.produto = {}
                    this.$router.push({ path: '/produtos' })
                })
                .catch(showError)
            }
        },
        cancelar() {
            this.$router.push({ path: '/produtos' })
        }
    },
    created() {
        this.produto.idfornecedor = JSON.parse(localStorage.getItem(chaveFornecedor)).id

        this.produto.id = this.$route.params.id
        this.produto.descricao = this.$route.params.descricao
        this.produto.codigo = this.$route.params.codigo
        this.produto.preco = this.$route.params.preco
    }
}
</script>

<style>
.form-produtos button {
    float: right;
    margin-bottom: 10px;
}

.form-produtos form {
    clear: right;
}
</style>
