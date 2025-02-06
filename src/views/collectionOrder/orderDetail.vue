<template>
  <el-dialog
    title="订单详细信息"
    :visible.sync="dialogVisible"
    width="650px"
    append-to-body="true"
    @close="() => {
      $emit('close');
    }"
    >
    <ul>
      <li><span>系统单号</span>{{ detail.trade_no }}</li>
      <li><span>商户订单号</span>{{ detail.out_trade_no }}</li>
      <li><span>接口订单号</span>{{ detail.api_trade_no }}</li>
      <li><span>商户ID</span><el-button type="text" @click="$router.push({path: '/businessListings', query: {uid: detail.uid}})">{{ detail.uid }}</el-button></li>
      <li><span>支付方式</span>{{ detail.typename }}</li>
      <li><span>支付通道</span><el-button type="text" @click="$router.push({path: '/paymentChannel', query: {type: 0, dstatus: -1}})">{{ detail.channelname }}</el-button></li>
      <li><span>商品名称</span>{{ detail.name }}</li>
      <li><span>订单金额</span>{{ detail.money }}</li>
      <li><span>实际支付金额</span>{{ detail.realmoney }}</li>
      <li><span>商户分成金额</span>{{ detail.getmoney }}</li>
      <li><span>创建时间</span>{{ detail.addtime }}</li>
      <li><span>完成时间</span>{{ detail.endtime }}</li>
      <li><span>支付账号</span>{{ detail.buyer }} <el-button style="margin-left: 10px;" size="mini" type="danger" @click="handleBlack('0', detail.buyer)">拉黑</el-button></li>
      <li><span>网站域名</span> <a :href="detail.domain" target="_blank" rel="noreferrer">{{ detail.domain }}</a></li>
      <li>
        <span>支付IP</span>
        <a :href="'https://m.ip138.com/iplookup.asp?ip=' + detail.ip" target="_blank" rel="noreferrer">{{ detail.ip }}</a>
        <el-button style="margin-left: 10px;" size="mini" type="danger" @click="handleBlack('1', detail.ip)">拉黑</el-button>
      </li>
      <li><span>扩展参数</span>{{ detail.ext || 'null' }}</li>
      <li><span>订单状态</span> <el-tag :type="detail.status === '1' ? 'success' : 'danger'" size="mini" style="width: 60px;">{{ statusMap[detail.status] }}</el-tag></li>
      <li v-if="detail.status === '1'"><span>通知状态</span><el-tag :type="detail.notify === '-1' ? 'danger' : 'success'" size="mini" style="width: 70px;">{{ detail.notify === '-1' ? '通知失败' : '已通知' }}</el-tag></li> 
    </ul>
      <el-dialog
        title="添加黑名单"
        :visible.sync="blackVisible"
        width="400px"
        append-to-body="true"
        >
        <el-form :model="addForm" ref="ruleForm" :rules="rules">
            <el-form-item :label="addForm.type === '1' ? '支付IP' : '支付账号'" :label-width="formLabelWidth" prop="content">
                <el-input v-model="addForm.content" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="有效期" :label-width="formLabelWidth" prop="days">
                <el-input v-model="addForm.days" autocomplete="off" placeholder="0为永久" type="number">
                  <template slot="append">天</template>
                </el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
                <el-input v-model="addForm.remark" autocomplete="off" placeholder="选填"></el-input>
            </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="onSubmit">确 定</el-button>
          <el-button @click="blackVisible = false">取 消</el-button>
        </span>
      </el-dialog>
  </el-dialog>
</template>

<script lang="js">
import { addBlackList } from '@/api/blacklist'
export default {
    name: 'orderDetail',
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        detail: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            statusMap: {
              0: '未支付',
              1: '已支付',
              2: '已退款',
              5: '已支付未回调'
            },
            formLabelWidth: '100px',
            blackVisible: false,
            addForm: {
              type: '',
              content: '',
              days: 0,
              remark: ''
            },
            rules: {
              content: [
                { required: true, message: '请输入拉黑内容', trigger: 'blur' }
              ],
              days: [
                { required: true, message: '请输入有效期', trigger: 'blur' }
              ]
            }
        }
    },
    methods: {
      handleBlack(type, value) {
        this.blackVisible = true
        this.addForm = {
          ...this.addForm,
          type,
          content: value
        }
      },
      onSubmit() {
        this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              addBlackList(this.addForm).then(() => {
                this.$message.success('添加成功');
              }).finally(() => {
                this.blackVisible = false;
                this.addForm = {
                  type: '0',
                  content: '',
                  days: 0,
                  remark: ''
                };
              })
            } else {
                console.log('error submit!!');
                return false;
            }
        })
      }
    }
}
</script>

<style lang="less" scoped>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      line-height: 40px;
      border-bottom: 1px solid #E0E0E0;
      span {
        display: inline-block;
        width: 160px;
        background-color: #d9edf7;
        padding-left: 10px;
        margin-right: 10px;
      }
    }
  }
</style>