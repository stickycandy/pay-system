<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
          class="breadcrumb-item"
          v-for="(item, index) in breadList"
          :key="index"
      >
          {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      breadList: [] // 路由集合
    };
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      // 包含当前路由的所有嵌套路径片段的路由记录
      const matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      // 赋值循环渲染
      this.breadList = matched
      
    }
  },
  created() {
    this.getBreadcrumb();
  }
};
</script>

<style scoped lang="less">
  .breadcrumb{
    margin-bottom: 20px;
    font-size: 16px;
  }
  .breadcrumb-item{
    font-size: 16px;
    &:last-child{
      /deep/.el-breadcrumb__inner{
        color: #333333;
        font-weight: 700;
      }
    }
  }
</style>