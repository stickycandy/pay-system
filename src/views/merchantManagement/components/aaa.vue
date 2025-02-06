<template>
    <div>
        <router-link v-for="(item, index) in list" :key="index" :to="item.path" style="margin-right: 10px;">{{ item.name }}</router-link>
        <div>
            aaa的内容
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {
                    path: '/aaa',
                    name: 'aaa'
                },
                {
                    path: '/bbb',
                    name: 'bbb'
                }
            ]
        };
    }
};
</script>

<style>
</style>