<template>
        <div class="user px-2">
            <router-link to="/">
                <img class="user-img" :src="imagem">
            </router-link>
                    <div v-if="fornecedor.descricao" class="name">
                        {{fornecedor.descricao}}
                    <i class="fa fa-image text-secondary" v-on:click="inputClick()"></i></div>
            
            <div class="user-info mt-3 pl-2">
                <p v-if="fornecedor.email" class="email">
                    <i class="fa fa-envelope text-primary"></i>
                    {{fornecedor.email}}
                </p>
                <p v-if="fornecedor.telefone" class="telefone">
                    <i class="fa fa-phone text-primary"></i>
                    {{maskedPhone}}
                </p>
            </div>
            <input class="image-file" type="file" v-on:change="persistImage()"/>
        </div>
</template>

<script>
import { showError, baseApiUrl } from '@/global'
import axios from 'axios'

import { mapState } from "vuex"
export default {
    name: 'User',
    data: function() {
        return { 
            imagem: null,
        }    
    },
    methods: {
        inputClick() {
            document.querySelector('input[type=file]').click()
        },
        onFileChange () {
            return new Promise(function(resolve) {
                var FR = new FileReader();
                var preview = document.querySelector('img');
                var file    = document.querySelector('input[type=file]').files[0];

                FR.onload = function (e) {
                    preview.src = FR.result
                    resolve(e.target.result)
                }

                if (file) {
                    FR.readAsDataURL(file);
                } else {
                    preview.src = "";
                }
            }
            )},
        persistImage () {
            this.onFileChange().then(res => {
                axios.put(`${baseApiUrl}/fornecedores/${this.fornecedor.id}`, {imagem: res})
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                    })
                    .catch(showError)
            })
        },
    },
    computed: {
        ...mapState(['fornecedor']),
        maskedPhone() {
            return this.fornecedor.telefone.replace(/(.{2})/, '($1) ').replace(/(.{4}$)/, '-$1')
        }
    },
    created() {
        axios.get(`${baseApiUrl}/fornecedores/${this.fornecedor.id}/imagem`)
            .then(res => {
                this.imagem = res.data.imagem
            })
            .catch(showError)
    }
}
</script>

<style>
.user {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.user a {
    text-decoration: none;
    color: black;
}
.user a:hover {
    text-decoration: none;
    color: black;
}
.user-img {
    margin-top: 10px;
    max-height: 100px;
    max-width: 100%;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-position: center center;
    justify-content: center;
}

.user-info {
    font-size: 14px;
    align-self: flex-start;
}

@media (min-width: 992px) {
    .user-img {
    max-height: 150px;
    max-width: 100%;
    }

    .user-info {
    font-size: 18px;
    }
}

.name {
    margin-top: 5px;
    background-color: #A4E7FF88;
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 22px;
    font-weight: 600;
    text-align: center;
}

.user-info p i{
    width: 25px;
}

.image-file {
    display: none
}

.fa-image {
    font-size: 16px
}
</style>
