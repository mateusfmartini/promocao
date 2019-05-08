<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Content'

}
</script>

<style>
    .content.auth {
        margin: 0;
        background-color: #f1f1f1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

.content {
    grid-area: content;
    padding: 20px;
    margin: 0px 15px 15px 15px;
    background-color: white;
    box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19);
    font-size: 14px;
    display: block;
}

@media (min-width: 768px) {
.content {
    margin: 15px 15px 15px 0px;
    font-size: 18px;
} }

</style>
