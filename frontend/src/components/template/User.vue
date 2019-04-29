<template>
        <div class="user px-2">
            <router-link to="/"><div class="user-img">
                <div class="name">{{nome}}</div>
            </div></router-link>
            <div class="user-info mt-3 pl-2">
                <p class="email">
                    <i class="fa fa-envelope text-primary"></i>
                    {{email}}
                </p>
                <p class="telefone">
                    <i class="fa fa-phone text-primary"></i>
                    {{telefone}}
                </p>
            </div>
        </div>
</template>

<script>
export default {
    name: 'User',
    props: ['nome', 'email', 'telefone'],
    data: function() {
        return { 
            imageUrl: null
        }    
    },
    computed: {
        userImage() {
            return this.imageUrl ? this.imageUrl : "user.png"
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

@media (min-width: 992px) {
    .user-img {
    min-height: 250px;
    background-size: 250px 100%;
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
