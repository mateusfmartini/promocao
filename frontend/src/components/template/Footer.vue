<template>
    <div class="footer">
        <span>Desenvolvido com <i class="fa fa-heart text-danger"/> por <strong>MFM</strong> © 2019</span>
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
.footer {
    grid-area: footer;
    background-color: #7CAFC2;
    color: #333;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;
}
</style>
