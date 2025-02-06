<template>
  <div class="merchantManagement">
    <bread-crumb></bread-crumb>
    <div class="tabs-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="商户列表" name="first"></el-tab-pane>
        <el-tab-pane label="商户组设置" name="second"></el-tab-pane>
        <el-tab-pane label="资金明细" name="third"></el-tab-pane>
        <el-tab-pane label="支付统计" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb.vue';
import '@/styles/merchantManagement.less';
const pathMap = {
  'first': '/businessListings',
  'second': '/businessSetings',
  'third': '/financialDetails',
  'fourth': '/paymentStatistics'
}
export default {
    name: 'merchantManagement',
    components: {
      BreadCrumb
    },
    data() {
      return {
        activeName: 'first'
      }
    },

    mounted() {
      Object.keys(pathMap).forEach(key => {
        if (pathMap[key] == this.$route.path) {
          this.activeName = key
        }
      })
    },
    watch: {
      $route: function(val) {
        console.log(val)
        if (val.path == '/businessListings') {
          this.activeName = 'first'
        }
        if (val.path == '/businessSetings') {
          this.activeName = 'second'
        }
        if (val.path == '/financialDetails') {
          this.activeName = 'third'
        }
        if (val.path == '/paymentStatistics') {
          this.activeName = 'fourth'
        }
      }
    },

    methods: {
      handleClick(tab, event) {
        if (tab.name == 'first') {
          this.$router.push('/businessListings')
        }
        if (tab.name == 'second') {
          this.$router.push('/businessSetings')
        }
        if (tab.name == 'third') {
          this.$router.push('/financialDetails')
        }
        if (tab.name == 'fourth') {
          this.$router.push('/paymentStatistics')
        }
      }
    }
};
</script>