<template>
  <div class="websiteInformationConfiguration">
    <bread-crumb></bread-crumb>
    <router-view></router-view>
  </div>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb.vue';

export default {
  name: 'otherSetting',
  components: {
    BreadCrumb
  },
  data() {
    return {
      activeName: 'websiteInformation'
    }
  },
  methods: {
  }
}
</script>