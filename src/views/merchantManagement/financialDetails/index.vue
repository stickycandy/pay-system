<template>
    <div class="businessSetings" style="height: 1000px;">
        <iframe :src="src" width="100%" height="100%" frameBorder="0" allowFullScreen></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            src: '/admin/record.php?pageSize=30&pageNumber=1&column=uid'
        }
    },
    methods: {
    }
}
</script>

<style>

</style>