import Vue from 'vue'

export const chaveFornecedor = '__promocao_fornecedor'
export const baseApiUrl = 'http://179.177.119.112:8443' 

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, chaveFornecedor }