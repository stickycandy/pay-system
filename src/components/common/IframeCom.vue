<template>
    <iframe :src="currentSrc" frameborder="0" style="width: 100%; height: 100%"></iframe>
</template>

<script>
const apiDomain = '';
export default {
    name: "IframeCom",
    props: ["src"],
    computed: {
        currentSrc() {
            return apiDomain + this.src;
        }
    }
};
</script>

