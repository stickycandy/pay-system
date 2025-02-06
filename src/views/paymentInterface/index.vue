<template>
  <div class="paymentInterface">
    <bread-crumb></bread-crumb>
    <div class="tabs-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="支付通道" name="first"></el-tab-pane>
        <el-tab-pane label="支付方式" name="second"></el-tab-pane>
        <el-tab-pane label="支付插件" name="third"></el-tab-pane>
        <el-tab-pane label="支付通道轮询" name="fourth"></el-tab-pane>
        <el-tab-pane label="公众号小程序" name="fifth"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb.vue';
import '@/styles/paymentInterface.less';
export default {
    name: 'paymentInterface',
    components: {
      BreadCrumb
  },
  data() {
    return {
      activeName: 'first'
    }
    },
    methods: {
      handleClick(tab, event) {
        if (tab.name == 'first') {
          this.$router.push('/paymentChannel')
        }
        if (tab.name == 'second') {
          this.$router.push('/paymentMethod')
        }
        if (tab.name == 'third') {
          this.$router.push('/paymentPlugin')
        }
        if (tab.name == 'fourth') {
          this.$router.push('/paymentChannelPolling')
        }
        if (tab.name == 'fifth') {
          this.$router.push('/officialAccountApplet')
        }
      }
  }
};
</script>