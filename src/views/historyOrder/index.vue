<template>
  <div class="collectionOrder">
      <bread-crumb></bread-crumb>
      <div class="select-box">
          <el-form :inline="true" :model="collectionOrderForm">
              <el-form-item>
                  <el-select v-model="collectionOrderForm.column" placeholder="订单号" class="small-input">
                      <el-option v-for="item in columnOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                  <el-input class="small-seach" v-model="collectionOrderForm.value" placeholder="搜索内容"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-input class="small-short" v-model="collectionOrderForm.uid" placeholder="商户号"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-select v-model="collectionOrderForm.type" placeholder="所有支付方式" class="small-input">
                      <el-option v-for="item in payTypeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                  <el-input class="small-short" v-model="collectionOrderForm.channel" placeholder="通道ID"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-date-picker class="date-input" v-model="timeFrame"  @change="timeFrameChange" type="daterange" format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd" range-separator="-"  start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item>
                  <el-select v-model="collectionOrderForm.dstatus" placeholder="全部状态" class="small-input">
                      <el-option v-for="item in statusOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                  <el-button class="search" type="primary" @click="onSearch">搜索</el-button>
              </el-form-item>
              <el-form-item>
                  <el-button class="reset" @click="onReset">
                      <img src="@/assets/img/common/reset-button-icon.png" alt="" />
                  </el-button>
              </el-form-item>
              <!-- <el-form-item>         批量操作功能可不要
                  <el-dropdown @command="handleCommand">
                      <el-button> 批量操作<i class="el-icon-arrow-down el-icon--right"></i> </el-button>
                      <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="a">改未完成</el-dropdown-item>
                          <el-dropdown-item command="b">改已完成</el-dropdown-item>
                          <el-dropdown-item command="c">冻结订单</el-dropdown-item>
                          <el-dropdown-item command="d">解冻订单</el-dropdown-item>
                          <el-dropdown-item command="e">删除订单</el-dropdown-item>
                      </el-dropdown-menu>
                  </el-dropdown>
              </el-form-item> -->
          </el-form>
          <div class="operate">
              <el-button class="fullScreen" @click="fullScreen">
                  <img src="@/assets/img/common/fullScreen-button-icon.png" alt="" />
              </el-button>
              <el-popover placement="bottom" trigger="click">
                  <template #reference>
                      <el-button class="more" slot="reference">
                          <img src="@/assets/img/common/more-button-icon.png" alt="" />
                      </el-button>
                  </template>
                  <div>
                      <el-checkbox-group v-model="activityType" @change="dropDownChange" class="checkbox-wrap" :min="2">
                          <el-checkbox :label="item" size="large" style="display: block" v-for="(item, index) in checkboxList" :key="index"/>
                      </el-checkbox-group>
                  </div>
              </el-popover>
          </div>
      </div>
      <div class="table-box">
          <el-table
              v-loading="tableLoading"
              element-loading-text="加载中"
              :data="tableData" @selection-change="handleSelectionChange">
              <!-- <el-table-column type="selection" width="64"> </el-table-column> -->
              <template v-for="(item, index) in columnList">
                  <el-table-column :key="index" :prop="item.prop" v-if="item.show" :width="item.width">
                      <template slot="header">
                          <div>
                              {{ item.label.split('-')[0] }}
                              <br v-if="item.label.split('-').length == 2" />
                              {{ item.label.split('-')[1] ? item.label.split('-')[1] : '' }}
                          </div>
                      </template>
                      <template slot-scope="scope">
                          <span v-if="scope.column.property == 'trade_no'">
                              <el-button type="text" style="font-size: 14px; user-select: all;" @click="goToDetail(scope.row)">{{ scope.row[scope.column.property] }}</el-button>
                              <br />
                              {{ scope.row.api_trade_no }}
                          </span>
                          <span v-if="scope.column.property == 'out_trade_no'">
                              <span>{{ scope.row[scope.column.property] }} <el-button type="text" @click="handleCheckOrder(scope.row)">查单</el-button></span>
                              <br />
                              <el-button type="text" style="font-size: 14px;" @click="$router.push({path: '/businessListings', query: {uid: scope.row.uid, column: 'uid'}})">{{ scope.row.uid }}</el-button>
                          </span>
                          <span v-else-if="scope.column.property == 'name'">
                              {{ scope.row[scope.column.property] }}
                              <br />
                              ￥{{ scope.row.money }}
                          </span>
                          <span v-else-if="scope.column.property == 'realmoney'">
                              ￥{{ scope.row[scope.column.property] }}
                              <br />
                              ￥{{ scope.row.getmoney }}
                          </span>
                          <span v-else-if="scope.column.property == 'typeshowname'">
                              <span class="typeshowname">
                                  <img width="16" height="16" :src="iconMap[scope.row.type]" alt="" />
                                  {{ scope.row[scope.column.property] }}({{ scope.row.channel }})
                                  <br />
                                  {{ scope.row.plugin }}
                              </span>
                          </span>
                          <span v-else-if="scope.column.property == 'addtime'">
                              {{ scope.row[scope.column.property] }}
                              <br />
                              {{ scope.row.endtime }}
                          </span>
                          <span v-else-if="scope.column.property == 'status'">
                                <div class="status">
                                    <el-tag v-if="scope.row[scope.column.property] == '0'">未支付</el-tag>
                                    <template v-else>
                                        <el-tag type="success" >已支付</el-tag>
                                        <br />
                                        <el-tag style="margin-top: 5px" type="danger" v-if="scope.row.notify == '-1'">通知失败</el-tag>
                                        <el-tag style="margin-top: 5px" type="success" v-else>已通知</el-tag>
                                    </template>
                                </div>
                          </span>

                          <span class="operate" v-else-if="scope.column.property == 'operate' && scope.row.status == '1'">
                              <el-dropdown @command="(e) =>  handleCommandRow(e, scope.row)">
                                  <span class="el-dropdown-link"> 操作订单<i class="el-icon-arrow-down el-icon--right"></i> </span>
                                  <el-dropdown-menu slot="dropdown">
                                      <el-dropdown-item command="undone">改未完成</el-dropdown-item>
                                      <el-dropdown-item command="api">API退款</el-dropdown-item>
                                      <el-dropdown-item command="reNotify">重新通知</el-dropdown-item>
                                      <el-dropdown-item command="del">删除订单</el-dropdown-item>
                                  </el-dropdown-menu>
                              </el-dropdown>
                          </span>
                          <!-- 这里打算是 未支付状态的操作，上面是支付状态的操作-->
                          <span class="operate" v-else-if="scope.column.property == 'operate' && scope.row.status == '0'">
                              <el-dropdown @command="(e) =>  handleCommandRow(e, scope.row)">
                                  <span class="el-dropdown-link"> 操作订单<i class="el-icon-arrow-down el-icon--right"></i> </span>
                                  <el-dropdown-menu slot="dropdown">
                                      <el-dropdown-item command="done">改已完成</el-dropdown-item>
                                      <el-dropdown-item command="manual">手动补单</el-dropdown-item>
                                      <el-dropdown-item command="del">删除订单</el-dropdown-item>
                                  </el-dropdown-menu>
                              </el-dropdown>
                          </span>

                          <!-- <span v-else>{{ scope.row[scope.column.property] }}</span> -->
                      </template>
                  </el-table-column>
              </template>
          </el-table>
          <div class="pagination">
              <div class="dataInformation">
                  显示结果：{{ (collectionOrderForm.pageNumber - 1) * collectionOrderForm.pageSize + 1 }}-{{
                      (collectionOrderForm.pageNumber - 1) * collectionOrderForm.pageSize + tableData.length
                  }}，总共{{ total }}条
              </div>
              <el-pagination
                  :current-page.sync="collectionOrderForm.pageNumber"
                  @current-change="handleCurrentChange"
                  :page-size="collectionOrderForm.pageSize"
                  background
                  layout="prev, pager, next, jumper"
                  :total="total"
              >
              </el-pagination>
          </div>
      </div>
      <el-dialog :visible.sync="refundDialogVisible" title="API 退款确认" width="400px">
          <p style="margin-bottom: 24px;">此操作将直接原路退款该订单，每个订单只能操作一次退款，退款金额不能大于订单金额。</p>
          
          <el-form :model="refundDetail" ref="refundForm" :rules="rules">
              <el-form-item label="退款金额" prop="money" :label-width="formLabelWidth">
                  <el-input v-model="refundDetail.money" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="支付密码" prop="paypwd" :label-width="formLabelWidth">
                  <el-input v-model="refundDetail.paypwd" autocomplete="off"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="handleRefund">确 定</el-button>
              <el-button @click="refundDialogVisible = false">取 消</el-button>
          </span>
      </el-dialog>
      <OrderDetail :dialogVisible="dialogVisible" :detail="currentDetail" @close="closeDetail"></OrderDetail>
  </div>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb.vue';
import '@/styles/collectionOrder.less';
import bus from '@/utils/bus.js';
import { queryOrderList, getOrderDetail, setStatusOrder, reNotify, manualRefund, getProvince, setRefund, checkOrder} from '@/api/history';
import zfbPay from '@/assets/img/common/table-zfbPay-icon.png';
import wxPay from '@/assets/img/common/wxpay.png';
import OrderDetail from './orderDetail.vue';

const iconMap = {
  1: zfbPay,
  2: wxPay,
  4: '/assets/icon/bank.ico'
}

export default {
  name: 'historyOrder',
  components: {
      BreadCrumb,
      OrderDetail
  },
  data() {
      return {
          refundDialogVisible: false,
          refundDetail: {
              money: '',
              paypwd: '',
              trade_no: ''
          },
          formLabelWidth: '100px',
          rules: {
              money: [
                  { required: true, message: '请输入退款金额', trigger: 'blur' }
              ],
              paypwd: [
                  { required: true, message: '请输入支付密码', trigger: 'blur' }
              ],
          },
          dialogVisible: false,
          currentDetail: {},
          collapse: false,
          iconMap: iconMap,
          collectionOrderForm: {
              value: '',
              uid: '',
              channel: '',
              starttime: '',
              endtime: '',
              dstatus: '-1',
              type: '0',
              column: 'trade_no',
              pageSize: 30,
              pageNumber: 1
          },
          total: 0,
          tableLoading: false,
          columnOption: [
              {
                  value: 'trade_no',
                  label: '系统单号'
              },
              {
                  value: 'out_trade_no',
                  label: '商户单号'
              },
              {
                  value: 'api_trade_no',
                  label: '充值单号'
              },
              {
                  value: 'buyer',
                  label: '用户账号'
              },
              {
                  value: 'ip',
                  label: '用户IP'
              }
          ],
          payTypeOption: [
              {
                  value: '0',
                  label: '支付方式'
              },
              {
                  value: '1',
                  label: '支付宝'
              },
              {
                  value: '2',
                  label: '微信支付'
              },
              // {
              //     value: '3',
              //     label: 'QQ钱包'
              // },
              {
                  value: '4',
                  label: '网银支付 '
              },
              // {
              //     value: '5',
              //     label: '京东支付'
              // },
              // {
              //     value: '6',
              //     label: 'PayPal'
              // }
          ],
          statusOption: [
              {
                  value: '-1',
                  label: '全部状态'
              },
              {
                  value: '0',
                  label: '未支付'
              },
              {
                  value: '1',
                  label: '已支付'
              },
              {
                  value: '2',
                  label: '已退款'
              },
              // {
              //     value: '3',
              //     label: '状态已冻结'
              // },
              // {
              //     value: '4',
              //     label: '状态预授权'
              // },
              {
                  value: '5',
                  label: '已支付未回调'
              }
          ],
          tableData: [],
          columnList: [
              { prop: 'trade_no', label: '系统订单号-充值订单号', width: 250, show: true },
              { prop: 'out_trade_no', label: '商户订单号-商户号', width: 216, show: true },
              { prop: 'name', label: '商品名称-订单金额', width: 90, show: true },
              { prop: 'realmoney', label: '实际支付-商户分成 ', width: 100, show: true },
              { prop: 'typeshowname', label: '支付方式-支付模式',  width: 120, show: true },
              { prop: 'addtime', label: '充值时间-回调时间', show: true },
              { prop: 'status', label: '充值状态', width: 80, show: true },
              { prop: 'operate', label: '操作', width: 110, show: true }
          ],
          timeFrame: '',
          multipleSelection: [],
          activityType: [],
          checkboxList: []
      };
  },
  watch: {
      refundDialogVisible(val) {
          if (!val) {
              this.$refs.refundForm.resetFields();
          }
      }
  },
  methods: {
      // 全屏
      fullScreen() {
          this.collapse = !this.collapse;
          bus.$emit('collapse', this.collapse);
      },
      closeDetail() {
          this.dialogVisible = false;
          this.currentDetail = {};
      },
      dropDownChange(val) {
          let arr = this.checkboxList.filter((i) => !val.includes(i));
          this.columnList.map((i, index) => {
              if (arr.indexOf(i.label.replace('-', '/')) != -1) {
                  this.$set(this.columnList[index], 'show', false);
              } else {
                  this.$set(this.columnList[index], 'show', true);
              }
          });
      },
      /**
       * 选择时间
       */
      timeFrameChange(valArr) {
          if (!valArr) {
              this.collectionOrderForm.starttime = '';
              this.collectionOrderForm.endtime = '';
              return;
          }
          this.collectionOrderForm.starttime = valArr[0];
          this.collectionOrderForm.endtime = valArr[1];
      },
      /**
       * 搜索
       */
      onSearch() {
          let searchObj = {
              ...this.collectionOrderForm
          };
          this.getData(searchObj);
      },
      /**
       * 获取收款订单数据
       */
      getData(searchObj) {
          //这里是新加的访问后端接口，写的不好，你自己改下。后端接口我会全部设置允许跨域的
          const data = {
              pageSize: '30',
              pageNumber: '1',
              subchannel: '',
              column: 'trade_no',
              value: '',
              uid: '',
              type: '0',
              starttime: '',
              endtime: '',
              dstatus: '-1',
              offset: (this.collectionOrderForm.pageNumber - 1) * 30,
              limit: 30,
              ...this.collectionOrderForm,
          };
          this.tableLoading = true;
          
          queryOrderList(data)
          .then(result => {
              console.log(result);
              this.tableData = result.rows || [];
              this.total =  Number(result.total) || 0;
          })
          .catch(error =>{
              console.error(error);
          }).finally(() => {
              this.tableLoading = false;
          });
      },

      handleCheckOrder(row) {
          checkOrder({ trade_no: row.trade_no }).then(res => {
              this.$alert(res.msg, '信息', {
                  type: res.code === 	0 ? 'success' : 'error',
              })
          })
      },

      /**
       * 重置
       */
      onReset() {
          this.collectionOrderForm = {
              value: '',
              uid: '',
              channel: '',
              starttime: '',
              endtime: '',
              dstatus: '-1',
              type: '0',
              column: 'trade_no',
              pageSize: 30,
              pageNumber: 1
          };
          this.timeFrame = '';
          this.getData();
      },
      /**
       * 表格选择
       */
      handleSelectionChange(val) {
          this.multipleSelection = val;
      },

      changeStatus(id, status) {
          setStatusOrder(id, status)
          .then(result => {
              this.$message.success('操作成功');
              this.getData();
          })
          .catch(error =>{
              console.error(error);
          });
      },

      /**
       * 批量操作
       */
      handleCommand(command) {
          if (this.multipleSelection.length > 0) {
              if (command == 'a') {
                  console.log('调用接口-改未完成');
              }
              if (command == 'b') {
                  console.log('调用接口-改已完成');
              }
              if (command == 'c') {
                  console.log('调用接口-冻结订单');
              }
              if (command == 'd') {
                  console.log('调用接口-解冻订单');
              }
              if (command == 'e') {
                  console.log('调用接口-删除订单');
              }
              this.getData();
          } else {
              this.$message.error('请至少选择一条订单！');
          }
      },

      /**
       * api退款
       * @param row 
       */
      apiRefund(row) {
          getProvince({
              trade_no: row.trade_no,
              api: 1
          }).then(res => {
              this.refundDialogVisible = true;
              this.refundDetail.trade_no = row.trade_no;
              this.refundDetail.money = res.money;
          })
      },

      handleRefund() {
          this.$refs.refundForm.validate(valid => {
              if (valid) {
                  setRefund(this.refundDetail)
                  .then(res => {
                      if (res.code == 0) {
                          this.$message.success(res.msg);
                          this.refundDialogVisible = false;
                          this.getData();
                      } else {
                          this.$message.error(res.msg);
                      }
                  })
                  .catch(error => {
                      console.error(error);
                  });
              }
          })
      },

      /**
       * 行内批量操作
       */
      handleCommandRow(command, row) {
          if (command == 'undone') {
              this.changeStatus(row.trade_no, '0')
              console.log('调用接口-改未完成');
          }
          if (command == 'done') {
              this.changeStatus(row.trade_no, '1')
              console.log('调用接口-改已完成');
          }
          if (command == 'api') {
              console.log('调用接口-API退款');
              this.apiRefund(row);
          }
          if (command == 'reNotify') {
              console.log('调用接口-重新通知');
              reNotify({trade_no: row.trade_no})
              .then(res => {
                  if (res.code != 0) {
                      this.$alert('回调失败', '信息')
                      return
                  }
                  this.$message.success('操作成功');
              })
              .catch(error => {
                  console.error(error);
              });
          }
          if (command == 'manual') {
              console.log('调用接口-手动补单');
              this.$confirm('此操作将不管该订单是否真的支付，直接改为已支付状态并给商户分成，是否确定？', '提示', {
                  type: 'warning'
              })
              .then(() => {
                  manualRefund({trade_no: row.trade_no})
                  .then(res => {
                      if (res.code != 0) {
                          this.$alert(res.msg, '信息')
                          return
                      }
                      this.$alert(res.msg, '信息', {
                          confirmButtonText: '确定',
                          callback: action => {
                              this.getData();
                          }
                      })
                  })
                  .catch(error => {
                      console.error(error);
                  });
              })
          }
          if (command == 'del') {
              console.log('调用接口-删除订单');
              this.$confirm('你确实要删除此订单吗？', '提示', {
                  type: 'warning'
              })
              .then(() => {
                  setStatusOrder(row.trade_no, '5')
                  .then(res => {
                      if (res.code == 200) {
                          this.getData();   
                      } else {
                          this.$message.error(res.msg);
                      }
                  })
                  .catch(error => {
                      console.error(error);
                  });
              })
          }
      },
      goToDetail(row) {
          getOrderDetail(row.trade_no).then(res => {
              console.log(res);
              if (res.code !== 0) {
                  this.$message.error(res.msg);
                  return;
              }
              this.currentDetail = res.data;
              this.dialogVisible = true;
          })
      },

      /**
       * 翻页
       */
      handleCurrentChange(v) {
          this.collectionOrderForm.pageNumber = v;
          this.getData();
      }
  },
  mounted() {
      // document.cookie = 'admin_token=9ea1ipTrAtWVazRsgocvR3%2B8wqYRbQRK8H6b4MK%2Ft0gXEXLcG0doM0m5bMKMuYvv1sneNcXVMNU9M3EmLMqxgheSQM2fltiOQuqv7kfk;';
      // document.cookie = 'PHPSESSID=njvs02a1pd4uneh9clvftojcam';
      this.getData();
      this.columnList.forEach((item) => {
          this.checkboxList.push(item.label.replace('-', '/'));
      });
      this.activityType = this.checkboxList;
      if (document.body.clientWidth < 1500) {
          // this.collapseChage();
      }
  }
};
</script>