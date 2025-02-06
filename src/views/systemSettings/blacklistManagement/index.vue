<template>
  <div class="black-list-container">
      <div class="select-box">
          <el-form :inline="true" :model="blackListForm">
            <el-form-item>
                <el-input class="small-input" v-model="blackListForm.kw" placeholder="黑名单内容"></el-input>
            </el-form-item>
              <el-form-item>
                  <el-select v-model="blackListForm.type" placeholder="黑名单类型" class="small-input">
                      <el-option v-for="item in merchantIdOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
              <el-form-item>
                  <el-button class="add" @click="toAddBlacklist">添加</el-button>
              </el-form-item>
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
                          <el-checkbox
                              :label="item"
                              size="large"
                              style="display: block"
                              v-for="(item, index) in checkboxList"
                              :key="index"
                          />
                      </el-checkbox-group>
                  </div>
              </el-popover>
          </div>
      </div>
      <div class="table-box">
          <el-table :data="tableData">
              <template v-for="(item, index) in columnList">
                  <el-table-column :key="index" :prop="item.prop" :label="item.label" :min-width="item.width" v-if="item.show">
                      <template slot-scope="scope">
                          <span class="operate" v-if="scope.column.property == 'operate'">
                              <el-button type="danger" @click="deleteItem(scope.row)">
                                  删除
                              </el-button>
                          </span>
                          <span v-else-if="scope.column.property == 'type'">
                              {{ blacklistTypeMap[scope.row[scope.column.property]] }}
                          </span>
                          <span v-else>{{ scope.row[scope.column.property] }}</span>
                      </template>
                  </el-table-column>
              </template>
          </el-table>
          <div class="pagination">
              <div class="dataInformation">
                  显示结果：{{ (blackListForm.pageNumber - 1) * blackListForm.pageSize + 1 }}-{{
                      (blackListForm.pageNumber - 1) * blackListForm.pageSize + tableData.length
                  }}，总共{{ tableData.length }}条
              </div>
              <el-pagination
                  :current-page.sync="blackListForm.pageNumber"
                  @current-change="handleCurrentChange"
                  :page-size="blackListForm.pageSize"
                  background
                  layout="prev, pager, next"
                  :total="total"
              >
              </el-pagination>
          </div>
      </div>
      <el-dialog title="添加黑名单" :visible.sync="dialogVisible" width="500px">
        <el-form :model="addForm" ref="ruleForm" :rules="rules">
            <el-form-item label="拉黑类型" :label-width="formLabelWidth" prop="type">
              <el-select v-model="addForm.type" placeholder="黑名单类型" style="width: 100%">
                      <el-option v-for="item in merchantIdOption" v-if="item.value !== '-1'" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
            </el-form-item>
            <el-form-item label="拉黑内容" :label-width="formLabelWidth" prop="content">
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
          <div class="dialog-footer" slot="footer"> 
              <el-button type="primary" @click="onSubmit">确 认</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
          </div>
      </el-dialog>
  </div>
</template>

<script>
import bus from '@/utils/bus.js';
import { queryBlackList, deleteBlackList, addBlackList } from '@/api/blacklist';
import '@/styles/blackList.less';

export default {
  data() {
      return {
          formLabelWidth: '120px',
          collapse: false,
          dialogVisible: false,
          blackListForm: {
              kw:'',
              type: '-1',
              pageSize: 30,
              pageNumber: 1
          },
          addForm: {
            type: '0',
            content: '',
            days: 0,
            remark: ''
          },
          blacklistTypeMap: {
              '-1': '黑名单类型',
              '0': '支付账号',
              '1': 'IP 地址',
          },
          merchantIdOption: [
              {
                  value: '-1',
                  label: '黑名单类型'
              },
              {
                  value: '0',
                  label: '支付账号'
              },
              {
                  value: '1',
                  label: 'IP 地址'
              },
            
          ],
          tableData: [],
          columnList: [
              { prop: 'id', label: 'ID', width: '60', show: true },
              { prop: 'type', label: '黑名单类型',width: '100', show: true },
              { prop: 'content', label: '黑名单内容',width: '150', show: true },
              { prop: 'addtime', label: '添加时间',width: '120', show: true },
              { prop: 'endtime', label: '过期时间',width: '120', show: true },
              { prop: 'remark', label: '备注', show: true },
              { prop: 'operate', label: '操作', width: '100', show: true }
          ],
          total: 0,
          activityType: [],
          checkboxList: [],
          rules: {
              type: [
                  { required: true, message: '请选择拉黑类型', trigger: 'blur' }
              ],
              content: [
                  { required: true, message: '请输入黑名单内容', trigger: 'blur' }
              ]
          }
      };
  },
  methods: {
      // 全屏
      fullScreen() {
          this.collapse = !this.collapse;
          bus.$emit('collapse', this.collapse);
      },
      dropDownChange(val) {
          let arr = this.checkboxList.filter((i) => !val.includes(i));
          this.columnList.filter((i, index) => {
              if (arr.indexOf(i.label.replace('-', '/')) != -1) {
                  this.$set(this.columnList[index], 'show', false);
              } else {
                  this.$set(this.columnList[index], 'show', true);
              }
          });
      },
      /**
       * 搜索
       */
      onSearch() {
          let searchObj = {
              ...this.blackListForm
          };
          this.getData(searchObj);
      },
      /**
       * 重置
       */
      onReset() {
          this.blackListForm = {
            kw:'',
              type: '-1',
              pageSize: 30,
              pageNumber: 1
          };
          this.total = 0;
          this.getData();
      },
      /**
       * 添加黑名单
       */
       toAddBlacklist() {
          //页面跳转
          this.dialogVisible = true;
      },

      onSubmit() {
          this.$refs.ruleForm.validate((valid) => {
              if (valid) {
                addBlackList(this.addForm).then(() => {
                  this.$message.success('添加成功');
                  this.getData();
                }).finally(() => {
                  this.dialogVisible = false;
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
      },
      /**
       * 获取数据列表
       */
      getData(searchObj) {

          const params = {
              ...this.blackListForm,
              ...(searchObj || {}),
              offset: (this.blackListForm.pageNumber - 1) * 30,
              limit: 30
          }

          queryBlackList(params)
          .then(result => {
              console.log(result);
              this.tableData = result.rows || [];
              this.total =  Number(result.total) || 0;
          }).catch(error => {
              console.error(error);
          });
      },
      /**
       * 翻页
       */
      /**
       * 翻页回调
       * @param {Number} v -当前页数
       */
      handleCurrentChange(v) {
          this.blackListForm.pageNumber = v;
          this.getData();
      },

      /**
       * 删除
       */
      deleteItem(row) {
          this.$confirm('确定要删除此黑名单吗？', '信息', {
              type: 'warning',
          }).then(() => {
            deleteBlackList({ id: row.id }).then((res) => {
                  if (res.code !== 0) {
                      this.$message.error(res.msg);
                      return;
                  }
                  this.$message.success('删除成功');
                  this.getData();
              })
          })
      }
  },
  mounted() {
      this.getData();
      this.columnList.forEach((item) => {
          this.checkboxList.push(item.label.replace('-', '/'));
      });
      this.activityType = this.checkboxList;
      if (document.body.clientWidth < 1500) {
          this.collapseChage();
      }
  }
};
</script>