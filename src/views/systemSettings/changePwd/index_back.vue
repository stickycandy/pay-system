<template>
  <div class="changePwd">
    <div class="basicTitle">
        <span class="block"></span>
        管理员账号配置
    </div>
    <el-form :model="userForm" ref="userForm" label-width="100px">
        <el-form-item label="用户名" prop="user">
            <el-input v-model="userForm.user" ></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldpwd">
            <el-input type="password" v-model="userForm.oldpwd" placeholder="请输入当前管理员密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pwd">
            <el-input type="password" v-model="userForm.newpwd" placeholder="不修改请留空"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pwd">
            <el-input type="password" v-model="userForm.newpwd2" placeholder="不修改请留空"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">{{userForm.submit}}</el-button>
        </el-form-item>
    </el-form>


    <div class="basicTitle">
        <span class="block"></span>
        支付密码修改
    </div>
    <el-form :model="payForm" ref="payForm" label-width="100px">
        <el-form-item label="旧密码" prop="oldpwd">
            <el-input type="password" v-model="payForm.oldpwd" placeholder="请输入当前管理员密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pwd">
            <el-input type="password" v-model="payForm.newpwd" placeholder="不修改请留空"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pwd">
            <el-input type="password" v-model="payForm.newpwd2" placeholder="不修改请留空"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">{{payForm.submit}}</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    data(){
        return{
          userForm: {
            do: 'submit',
            user: 'admin',
            oldpwd: '',
            newpwd: '',
            newpwd2: '',
            submit: '修改'
          },
          payForm: {
            do: 'submit',
            oldpwd: '',
            newpwd: '',
            newpwd2: '',
            submit: '修改'
          }
        }
    }
    
}
</script>

<style lang="less" scoped>
.changePwd {
  min-height: 800px;
  padding: 5px 30px 30px;
  background-color: #fff;
  .basicTitle{
      height: 50px;
      line-height: 50px;
      background: #F8FAFD;
      font-size: 16px;
      color: #333333;
      margin-bottom: 20px;
      .block{
          display: inline-block;
          margin: 0 16px 0 20px;
          vertical-align: middle;
          width: 4px;
          height: 20px;
          background: #2463EB;
      }
    }
}
</style>