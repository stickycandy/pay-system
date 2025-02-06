<template>
    <div class="wrapper">
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import vSidebar from '@/components/common/Sidebar.vue';
import bus from '@/utils/bus.js';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        };
    },
    components: {
        vSidebar
    },
    created() {
        bus.$on('collapse-content', (msg) => {
            this.collapse = msg;
        });
    }
};
</script>
