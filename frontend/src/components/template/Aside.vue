<template>
    <aside class="aside">
        <User />
        <hr class="mx-3">
        <Menu />
    </aside>
</template>

<script>
import User from '@/components/template/User.vue'
import Menu from '@/components/template/Menu.vue'

export default {
    name: 'Aside',
    components:{ User, Menu },
    data: function() {
        return { 
            imageUrl: null
        }    
    },
    computed: {
        userImage() {
            return this.imageUrl ? this.imageUrl : "../assets/user.png"
        }
    }
}
</script>

<style>
.aside {
    grid-area: aside;
    margin: 15px 15px;
    background-color: white;
    font-size: 18px;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19);
}
</style>
