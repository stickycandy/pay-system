<template>
    <div class="businessSetings" style="height: 1000px;">
        <iframe :src="src" frameBorder="0" width="100%" height="100%" allowFullScreen frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            src: 'https://jiu.shouxuanzp.cn/admin/record.php?pageSize=30&pageNumber=1&column=uid'
        }
    },
    methods: {
    }
}
</script>

<style>

</style>