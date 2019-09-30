<template>
        <div class="user px-2">
            <router-link to="/">
                <div class="user-img">
                    <div v-if="fornecedor.descricao" class="name">{{fornecedor.descricao}}</div>
                </div>
            </router-link>
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
        </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    name: 'User',
    data: function() {
        return { 
            imageUrl: null
        }    
    },
    computed: {
        ...mapState(['fornecedor']),
        maskedPhone() {
            return this.fornecedor.telefone.replace(/(.{2})/, '($1) ').replace(/(.{4}$)/, '-$1')
        }
    }
}
</script>

<style>
.user a {
    text-decoration: none;
    color: black;
}
.user a:hover {
    text-decoration: none;
    color: black;
}
.user-img {
    min-height: 150px;

    background-image: url("../../assets/user.png");
    background-repeat: no-repeat;
    background-size: 150px 100%;
    background-position: center center;
    
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
}

.user-info {
    font-size: 14px;
}

@media (min-width: 992px) {
    .user-img {
    min-height: 250px;
    background-size: 250px 100%;
    }

    .user-info {
    font-size: 18px;
}
}

.user-img .name {
    background-color: #A4E7FF88;
    border-radius: 12px;
    padding: 5px 10px;
    font-size: 22px;
    font-weight: 600;
    text-align: center;
}

.user-info p i{
    width: 25px;
}

</style>
