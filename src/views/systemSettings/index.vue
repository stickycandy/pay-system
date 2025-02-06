<template>
  <div class="websiteInformationConfiguration">
    <bread-crumb></bread-crumb>
    <div class="tabs-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="网站信息" name="websiteInformation"></el-tab-pane>
        <el-tab-pane label="黑名单管理" name="blacklistManagement"></el-tab-pane>
        <el-tab-pane label="支付相关" name="paymentRelated"></el-tab-pane>
        <el-tab-pane label="结算规则" name="settlementRules"></el-tab-pane>
        <el-tab-pane label="企业付款" name="enterprisePayment"></el-tab-pane>
        <el-tab-pane label="快捷登录" name="quickLogin"></el-tab-pane>
        <el-tab-pane label="消息提醒" name="messageReminder"></el-tab-pane>
        <!-- <el-tab-pane label="实名认证" name="realNameAuthentication"></el-tab-pane>
        <el-tab-pane label="首页模版" name="homepageTemplate"></el-tab-pane>
        <el-tab-pane label="公告与排版" name="announcementAndLayout"></el-tab-pane>
        <el-tab-pane label="邮箱与短信" name="emailAndSms"></el-tab-pane> -->
        <el-tab-pane label="LOGO设置 " name="logoSetting"></el-tab-pane>
        <el-tab-pane label="IP地址" name="ipAddress"></el-tab-pane>
        <el-tab-pane label="任务计划" name="taskPlan"></el-tab-pane>
        <el-tab-pane label="中转代理" name="transferAgent"></el-tab-pane>
        <el-tab-pane label="修改密码" name="changePwd"></el-tab-pane>
        <el-tab-pane label="H5跳转微信客服" name="h5Wxkf"></el-tab-pane>
      </el-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb.vue';
import '@/styles/websiteInformationConfiguration.less';
export default {
  name: 'websiteInformationConfiguration',
  components: {
    BreadCrumb
  },
  data() {
    return {
    }
  },
  computed: {
    activeName: {
      get(){
        return this.$route.path.substring(1)
      },
      set(newValue) {
        console.log(newValue);
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name == 'websiteInformation') {
        this.$router.push('/websiteInformation')
      }
      if (tab.name == 'blacklistManagement') {
        this.$router.push('/blacklistManagement')
      }
      if (tab.name == 'changePwd') {
        this.$router.push('/changePwd')
      }
      if (tab.name == 'paymentRelated') {
        this.$router.push('/paymentRelated')
      }
      if (tab.name == 'settlementRules') {
        this.$router.push('/settlementRules')
      }
      if (tab.name == 'enterprisePayment') {
        this.$router.push('/enterprisePayment')
      }
      if (tab.name == 'quickLogin') {
        this.$router.push('/quickLogin')
      }
      if (tab.name == 'ipAddress') {
        this.$router.push('/ipAddress')
      }
      if (tab.name == 'taskPlan') {
        this.$router.push('/taskPlan')
      }
      if (tab.name == 'transferAgent') {
        this.$router.push('/transferAgent')
      }
      if (tab.name == 'messageReminder') {
        this.$router.push('/messageReminder')
      }
      if (tab.name == 'realNameAuthentication') {
        this.$router.push('/realNameAuthentication')
      }
      if (tab.name == 'homepageTemplate') {
        this.$router.push('/homepageTemplate')
      }
      if (tab.name == 'logoSetting') {
        this.$router.push('/logoSetting')
      }
      if (tab.name == 'announcementAndLayout') {
        this.$router.push('/announcementAndLayout')
      }
      if (tab.name == 'emailAndSms') {
        this.$router.push('/emailAndSms')
      }
      if (tab.name == 'h5Wxkf') {
        this.$router.push('/h5Wxkf')
      }
    }
  }
};
</script>