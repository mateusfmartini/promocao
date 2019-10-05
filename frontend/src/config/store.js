import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        fornecedor: null
    },
    mutations: {
        setFornecedor(state, fornecedor) {
            state.fornecedor = fornecedor
            if (fornecedor) {
                axios.defaults.headers.common['Authorization'] = `bearer ${fornecedor.token}`
            } else {
                delete axios.defaults.headers.common['Authorization']
            }
        },
        removeImagem(state){
            state.fornecedor.imagem = null
        }
    }
})