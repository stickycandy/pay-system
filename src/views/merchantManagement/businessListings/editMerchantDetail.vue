<template>
  <el-dialog
    :title="uid ? '修改商户信息 UID:' + uid : '添加商户'"
    :visible.sync="dialogVisible"
    width="70%"
    @close="handleClose">
    <el-form :model="DetailForm" ref="DetailRef" :rules="rules" label-width="150px">
      <div class="edit-merchant-detail">
        <div class="info">
          <div class="basicTitle">
            <span class="block"></span>
            基本信息
          </div>
          <el-form-item label="手机号(登录账号):" prop="phone">
            <el-input v-model="DetailForm.phone" placeholder="可留空"></el-input>
          </el-form-item>
          <el-form-item v-if="!uid" label="登录密码:" prop="pwd">
            <el-input v-model="DetailForm.pwd" placeholder="留空则只能使用密钥登录"></el-input>
          </el-form-item>
          <el-form-item label="用户组:" prop="gid">
            <el-select style="width: 100%" v-model="DetailForm.gid" placeholder="请选择">
              <el-option v-for="item in Object.entries(userGroupList)" :key="item[0]" :label="item[1]" :value="item[0]"></el-option>
              <!-- <el-option label="测试-支付宝" value="30"></el-option>
              <el-option label="付款测试" value="31"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="可用代付余额:" prop="money">
            <el-input v-model="DetailForm.money"></el-input>
          </el-form-item>
          <el-form-item label="ip白名单(代付用):" prop="whiteip">
            <el-input v-model="DetailForm.whiteip" placeholder="多个ip用英文逗号,隔开"></el-input>
          </el-form-item>
          <el-form-item label="每ip限制下单数:" prop="qq">
            <el-input v-model="DetailForm.qq" placeholder="可留空"></el-input>
          </el-form-item>
          <el-form-item v-if="uid" label="商品名称自定义:" prop="ordername">
            <el-input v-model="DetailForm.ordername" placeholder="默认以系统里面设置的为准"></el-input>
            <span style="font-size: 12px; line-height: 12px; color: #8492a6;">支持变量值：[name]原商品名称，[order]支付订单号，[outorder]商户订单号，[time]时间戳，[qq]当前商户的联系QQ</span>
          </el-form-item>
          <div class="basicTitle">
            <span class="block"></span>
            结算信息
          </div>
          <el-form-item label="结算方式:" prop="settle_id">
            <el-select style="width: 100%" v-model="DetailForm.settle_id" placeholder="请选择">
              <el-option label="支付宝" value="1"></el-option>
              <el-option label="微信" value="2"></el-option>
              <el-option label="银行卡" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="结算账号:" prop="account">
            <el-input v-model="DetailForm.account"></el-input>
          </el-form-item>
          <el-form-item label="结算账号姓名:" prop="username">
            <el-input v-model="DetailForm.username"></el-input>
          </el-form-item>
        </div>
        <div class="info">
          <template v-if="uid">
            <div class="basicTitle">
              <span class="block"></span>
              通知飞机群组
            </div>
            <el-form-item label="填写所有的群组id:" prop="chat_ids">
              <el-input v-model="DetailForm.chat_ids" placeholder="多个群组id用,英文逗号分隔"></el-input>
            </el-form-item>
          </template>
          <div class="basicTitle">
            <span class="block"></span>
            功能开关
          </div>
          <el-form-item label="手续费扣除模式:" prop="mode">
            <el-select style="width: 100%" v-model="DetailForm.mode" placeholder="请选择">
              <el-option label="余额扣费" value="0"></el-option>
              <el-option label="订单加费" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商户状态:" prop="status">
            <el-select style="width: 100%" v-model="DetailForm.status" placeholder="请选择">
              <el-option label="正常" value="1"></el-option>
              <el-option label="封禁" value="0"></el-option>
              <el-option label="未审核" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付权限:" prop="pay">
            <el-select style="width: 100%" v-model="DetailForm.pay" placeholder="请选择">
              <el-option label="1_开启" value="1"></el-option>
              <el-option label="0_关闭" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="结算权限:" prop="settle">
            <el-select style="width: 100%" v-model="DetailForm.settle" placeholder="请选择">
              <el-option label="1_开启" value="1"></el-option>
              <el-option label="0_关闭" value="0"></el-option>
            </el-select>
          </el-form-item>

          <template v-if="uid">
            <div class="basicTitle">
              <span class="block"></span>
              密码修改
            </div>
            <el-form-item label="重置登录密码:" prop="pwd">
              <el-input v-model="DetailForm.pwd" placeholder="不重置密码请留空"></el-input>
            </el-form-item>
          </template>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="large" type="primary" @click="handleSubmit">确定{{ uid ? '修改' : '添加' }} </el-button>
    </span>
  </el-dialog>
</template>

<script>
import '@/styles/merchantDetail.less';
import { addMerchant, editMerchant, queryUserGroup } from '@/api/merchantManagement';
  export default {
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },
      uid: {
        type: String | Number, 
        default: ''
      },
      editDetail: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        DetailForm: {
          phone: '',
          email: '',
          pwd: '',
          gid: '30',
          money: '0.00',
          whiteip: '',
          url: '',
          settle_id: '4',
          account: '',
          username: '',
          mode: '1',
          status: '1',
          pay: '1',
          settle: '1'
        },
        userGroupList: {},
        rules: {
          account: [
            { required: true, message: '请输入结算账号', trigger: 'change' }
          ],
          username: [
            { required: true, message: '请输入结算账号姓名', trigger: 'change' }
          ],
        }
      }
    },
    methods: {
      handleClose() {
        this.$emit('close');
      },

      getsUserGroup() {
        queryUserGroup().then(res => {
          if (res.code == 1) {
            this.userGroupList = res.rows;
          } else {
            this.$message.error(res.msg);
          }
        })
      },

      handleSubmit() {
        this.$refs.DetailRef.validate(valid => {
          if (valid) {
            if (this.DetailForm.gid == 0 || this.DetailForm.gid == null) {
              this.$message.error('请选择用户组');
            }
            const queryDataFun = this.uid ? editMerchant(this.uid, this.DetailForm) : addMerchant(this.DetailForm);
            queryDataFun.then(res => {
              if (res.code == 0) {
                this.$alert(this.uid ? '修改商户信息成功！' : `添加商户成功！商户ID：${res.uid}
                  密钥：${res.key}`, '信息', {
                  confirmButtonText: '确定',
                  type: 'success',
                  callback: action => {
                    this.$emit('close', 'ok');
                  }
                });
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(error => {
              console.error(error);
            });
          }
        })
      }
    },
    watch: {
      editDetail: {
        handler(newVal) {
          this.DetailForm = { ...newVal };
          this.$refs.DetailRef.resetFields();
        },
        deep: true
      },
      dialogVisible(val) {
        if (val) {
          this.getsUserGroup();
        }
      }
    }
  }
</script>