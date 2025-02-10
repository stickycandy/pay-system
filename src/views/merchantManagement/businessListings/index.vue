<template>
    <div class="businessListings">
        <div class="select-box">
            <el-form :inline="true" :model="businessListForm">
                <el-form-item>
                    <el-select v-model="businessListForm.column" placeholder="商户号" class="small-input">
                        <el-option v-for="item in merchantIdOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input class="small-input" v-model="businessListForm.value" placeholder="搜索内容"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="businessListForm.dstatus" placeholder="全部用户" class="small-input">
                        <el-option v-for="item in userTypeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker
                        class="date-input"
                        v-model="timeFrame"
                        @change="timeFrameChange"
                        type="daterange"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
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
                    <el-button class="add" @click="toAddMerchant">添加商户</el-button>
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
            <el-table v-loading="tableLoading"
                element-loading-text="加载中"
                height="calc(100% - 60px)"
                :data="tableData">
                <template v-for="(item, index) in columnList">
                    <el-table-column :key="index" :prop="item.prop" :label="item.label" :width="item.width" v-if="item.show">
                        <template slot-scope="scope">
                            <span v-if="scope.column.property == 'uid'">
                                <span class="viewKey">
                                    {{ scope.row[scope.column.property] }}
                                    <el-button type="text" @click="viewKey(scope.row)">[查看密钥]</el-button>
                                </span>
                                <br />
                                <span class="userGroup"> {{ scope.row.groupname }} </span>
                            </span>
                            <span v-else-if="scope.column.property == 'current_payrate'">
                                <el-button style="font-size: 14px;" type="text" @click="getUserRateList(scope.row, '0')">{{ scope.row.current_money }}</el-button>
                                <br />
                                <span style="color: #67C23A;">{{ scope.row[scope.column.property] }}</span>
                            </span>
                            <span v-else-if="scope.column.property == 'yestday_payrate'">
                                <el-button style="font-size: 14px;" type="text" @click="getUserRateList(scope.row, '-1')">{{ scope.row.yestday_money }}</el-button>
                                <br />
                                <span style="color: #67C23A;">{{ scope.row[scope.column.property] }}</span>
                            </span>
                            <span v-else-if="scope.column.property == 'thirty_payrate'">
                                <el-button style="font-size: 14px;" type="text">{{ scope.row.thirty_money }}</el-button>
                                <br />
                                <span style="color: #67C23A;">{{ scope.row[scope.column.property] }}</span>
                            </span>
                            <span v-else-if="scope.column.property == 'ten_payrate'">
                                <el-button style="font-size: 14px;" type="text">{{ scope.row.ten_money }}</el-button>
                                <br />
                                <span style="color: #67C23A;">{{ scope.row[scope.column.property] }}</span>
                            </span>
                            <span v-else-if="scope.column.property == 'status'" class="status-wrap">
                                <span class="status" :class="scope.row.status === '1' ? 'active' : ''" @click="handleSetUser('user', scope.row, scope.row.status)">
                                    <i v-if="scope.row.status === '1'" class="el-icon-success"></i>
                                    <i v-else class="el-icon-error"></i>
                                    <a class="statusValue">{{ scope.row.status === '1' ? '正常' : '封禁' }}</a>
                                </span>
                                <span class="realName block" :class="scope.row.cert === '1' ? 'active' : 'normal'" @click="handleCheckCert(scope.row)">
                                    <i v-if="scope.row.cert === '1'" class="el-icon-success"></i>
                                    <i v-else class="el-icon-error"></i>
                                    <a class="realNameValue item">{{ scope.row.cert === '1' ? '已实名' : '未实名' }}</a>
                                </span>
                                <br />
                                <span class="pay" :class="scope.row.pay === '1' ? 'active' : ''" @click="handleSetUser('pay', scope.row, scope.row.pay)">
                                    <i v-if="scope.row.pay === '1'" class="el-icon-success"></i>
                                    <i v-else class="el-icon-error"></i>
                                    <a class="payValue">支付</a>
                                </span>
                                <span class="settlement block" :class="scope.row.settle === '1' ? 'active' : ''" @click="handleSetUser('settle', scope.row, scope.row.settle)">
                                    <i v-if="scope.row.settle === '1'" class="el-icon-success"></i>
                                    <i v-else class="el-icon-error"></i>
                                    <a class="settlementValue">结算</a>
                                </span>
                            </span>
                            <span class="operate" v-else-if="scope.column.property == 'operate'">
                                <el-button type="text" @click="settlementNotice(scope.row)">结算通知</el-button>
                                <el-button type="text" @click="order(scope.row)">订单</el-button>
                                <el-button type="text" @click="login(scope.row)">登录</el-button>
                                <br />
                                <el-button type="text" @click="details(scope.row)">明细</el-button>
                                <el-button type="text" @click="change(scope.row)">
                                    <img src="@/assets/img/common/table-change-icon.png" alt="" />
                                </el-button>
                                <el-button type="text" @click="deleteItem(scope.row)">
                                    <img src="@/assets/img/common/table-delete-icon.png" alt="" />
                                </el-button>
                            </span>
                            <span v-else>{{ scope.row[scope.column.property] }}</span>
                        </template>
                    </el-table-column>
                </template>
            </el-table>
            <div class="pagination">
                <div class="dataInformation">
                    显示结果：{{ (businessListForm.pageNumber - 1) * businessListForm.pageSize + 1 }}-{{
                        (businessListForm.pageNumber - 1) * businessListForm.pageSize + tableData.length
                    }}，总共{{ tableData.length }}条
                </div>
                <el-pagination
                    :current-page.sync="businessListForm.pageNumber"
                    @current-change="handleCurrentChange"
                    :page-size="businessListForm.pageSize"
                    background
                    layout="prev, pager, next"
                    :total="total"
                >
                </el-pagination>
            </div>
        </div>
        <el-dialog title="查看密钥" :visible.sync="dialogVisible" width="360px" >
            <span>{{ currentKey }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="copyItem(currentKey)">复制</el-button>
                <el-button  @click="handleReset(currentRow)">重置</el-button>
                <el-button  @click="dialogVisible = false">关闭</el-button>
            </span>
        </el-dialog>
        <el-dialog title="查看实名认证信息" :visible.sync="certVisible" width="360px" >
            <ul class="cert-detail">
                <li><span>商户号</span>{{ certDetail.uid }}</li>
                <li><span>认证类型</span>{{ certTypeMap[certDetail.certtype] }}</li>
                <li><span>认证方式</span>{{ certDetail.certmethodname }}</li>
                <li><span>真实姓名</span>{{ certDetail.certname }}</li>
                <li><span>身份证号</span>{{ certDetail.certno }}</li>
                <li><span>认证时间</span>{{ certDetail.certtime }}</li>
            </ul>
        </el-dialog>
        <EditMerchantDetail :dialogVisible="detailVisible"  :uid="editUid" :editDetail="editDetail" @close="handleClose" />
        <el-dialog title="分费率跑量" :visible.sync="rateVisible" width="420px" >
            <div v-html="rateDetail"></div>
        </el-dialog>
    </div>
</template>

<script>
import bus from '@/utils/bus.js';
import { queryUserList, resetAppkey, setUser, quertUserCert, setSettlementNotify, deleteUser, queryMerchantDetail, queryUserRateList } from '@/api/merchantManagement';
import { copy } from '@/utils';
import EditMerchantDetail from './editMerchantDetail.vue';

// 认证类型映射
const certTypeMap = {
    0: '个人认证',
    1: '企业认证',
}

export default {
    name: 'businessListings',
    components: {
        EditMerchantDetail
    },
    data() {
        return {
            rateVisible: false,
            rateDetail: '',
            detailVisible: false,
            editDetail: {},
            editUid: '',
            certTypeMap,
            currentRow: {},
            currentKey: '',
            collapse: false,
            dialogVisible: false,
            certVisible: false,
            certDetail: {},
            businessListForm: {
                column: 'uid',
                value: '',
                dstatus: '0',
                starttime: '',
                endtime: '',
                pageSize: 30,
                pageNumber: 1
            },
            merchantIdOption: [
                {
                    value: 'uid',
                    label: '商户号'
                },
                {
                    value: 'key',
                    label: '密钥'
                },
                {
                    value: 'account',
                    label: '结算账号'
                },
                {
                    value: 'username',
                    label: '结算姓名'
                },
                {
                    value: 'url',
                    label: '域名'
                },
                {
                    value: 'qq',
                    label: 'QQ'
                },
                {
                    value: 'phone',
                    label: '手机号码'
                },
                {
                    value: 'email',
                    label: '邮箱'
                }
            ],
            userTypeOption: [
                {
                    value: '0',
                    label: '全部用户'
                },
                {
                    value: 'pay_2',
                    label: '待审核用户'
                },
                {
                    value: 'status_1',
                    label: '用户状态正常'
                },
                {
                    value: 'status_0',
                    label: '用户状态封禁'
                },
                {
                    value: 'url',
                    label: '支付状态正常'
                },
                {
                    value: 'qq',
                    label: '支付状态关闭'
                },
                {
                    value: 'settle_1',
                    label: '结算状态正常'
                },
                {
                    value: 'settle_0',
                    label: '结算状态关闭'
                }
            ],
            timeFrame: '',
            tableData: [],
            columnList: [
                { prop: 'uid', label: '商户号/用户组', width: '120', show: true },
                { prop: 'current_payrate', label: '当天量/成率', width: '80', show: true },
                { prop: 'yestday_payrate', label: '昨天量/成率', width: '80', show: true },
                { prop: 'thirty_payrate', label: '30m量/成率', width: '80', show: true },
                { prop: 'ten_payrate', label: '10m量/成率', width: '80', show: true },
                { prop: 'money', label: '跑单总额', show: true },
                { prop: 'addtime', label: '域名/添加时间', width: '170', show: true },
                { prop: 'status', label: '状态', width: '200', show: true },
                { prop: 'operate', label: '操作', width: '200', show: true }
            ],
            total: 0,
            activityType: [],
            checkboxList: [],
            tableLoading: false
        };
    },
    watch: {
        rateVisible(val) {
            if (!val) {
                this.rateDetail = '';
            }
        }
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
         * 选择时间
         */
        timeFrameChange(valArr) {
            if (!valArr) {
                this.businessListForm.starttime = '';
                this.businessListForm.endtime = '';
                return;
            }
            this.businessListForm.starttime = valArr[0];
            this.businessListForm.endtime = valArr[1];
        },
        /**
         * 搜索
         */
        onSearch() {
            let searchObj = {
                ...this.businessListForm
            };
            this.getData(searchObj);
        },
        /**
         * 重置
         */
        onReset() {
            this.businessListForm = {
                column: 'uid',
                value: '',
                dstatus: '0',
                starttime: '',
                endtime: '',
                pageSize: 30,
                pageNumber: 1
            };
            this.timeFrame = '';
            this.total = 0;
            this.getData();
        },
        /**
         * 添加商户
         */
        toAddMerchant() {
            //页面跳转
            this.detailVisible = true;
        },

        getUserRateList(row, dateType) {
            queryUserRateList({
                uid: row.uid,
                dateType,
                starttime: this.businessListForm.starttime,
                endtime: this.businessListForm.endtime
            }).then(res => {
                this.rateDetail = res.content;
                this.rateVisible = true;
            })
        },

        /**
         * 获取数据列表
         */
        getData(searchObj) {

            const params = {
                ...this.businessListForm,
                ...(searchObj || {}),
                offset: (this.businessListForm.pageNumber - 1) * 30,
                limit: 30
            }

            this.tableLoading = true;
            queryUserList(params)
            .then(result => {
                console.log(result);
                this.tableData = result.rows || [];
                this.total =  Number(result.total) || 0;
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                this.tableLoading = false;
            });

            // this.tableData = [
            //     {
            //         uid: '1041',
            //         current_payrate: '10%',
            //         yestday_payrate: '10%',
            //         ten_payrate: '10%',
            //         thirty_payrate: '10%',
            //         money: '0.00',
            //         addtime: '2024-11-29 23:54:02'
            //     },
            //     {
            //         uid: '1041',
            //         current_payrate: '10%',
            //         yestday_payrate: '10%',
            //         ten_payrate: '10%',
            //         thirty_payrate: '10%',
            //         money: '0.00',
            //         addtime: '2024-11-29 23:54:02'
            //     },
            //     {
            //         uid: '1041',
            //         current_payrate: '10%',
            //         yestday_payrate: '10%',
            //         ten_payrate: '10%',
            //         thirty_payrate: '10%',
            //         money: '0.00',
            //         addtime: '2024-11-29 23:54:02'
            //     },
            //     {
            //         uid: '1041',
            //         current_payrate: '10%',
            //         yestday_payrate: '10%',
            //         ten_payrate: '10%',
            //         thirty_payrate: '10%',
            //         money: '0.00',
            //         addtime: '2024-11-29 23:54:02'
            //     },
            //     {
            //         uid: '1041',
            //         current_payrate: '10%',
            //         yestday_payrate: '10%',
            //         ten_payrate: '10%',
            //         thirty_payrate: '10%',
            //         money: '0.00',
            //         addtime: '2024-11-29 23:54:02'
            //     },
            //     {
            //         uid: '1041',
            //         current_payrate: '10%',
            //         yestday_payrate: '10%',
            //         ten_payrate: '10%',
            //         thirty_payrate: '10%',
            //         money: '0.00',
            //         addtime: '2024-11-29 23:54:02'
            //     }
            // ];
            // this.total = 18;
        },
        /**
         * 翻页
         */
        handleCurrentChange(v) {
            this.businessListForm.pageNumber = v;
            this.getData();
        },
        /**
         * 查看秘钥
         */
        viewKey(row) {
            console.log(row);
            this.currentRow = row;
            this.currentKey = row.key;
            this.dialogVisible = true;
        },
        copyItem(val) {
            copy(val);
            this.$message.success('复制成功');
        },
        // 重置密钥
        handleReset(row) {
            resetAppkey(row.uid).then((res) => {
                console.log(res, 'XXXXX');
                if (res.code == 0) {
                    this.currentKey = res.key;
                    this.$message.success(res.msg);
                    this.$set(row, 'key', res.key);
                    this.currentRow = {
                        ...row,
                        key: res.key
                    };
                }
            }).catch((e) => {
                this.$message.error('操作失败');
            });
        },

        // 修改商户的各种状态 封禁 支付 结算
        handleSetUser(type, row, status) {
            const params = {
                uid: row.uid,
                type,
                status: status == '1' ? '0' : '1'
            };
            setUser(params).then((res) => {
                if (res.code == 0) {
                    // this.$message.success(res.msg);
                    this.getData();
                }
            }).catch((e) => {
                this.$message.error('操作失败');
            });
        },

        // 查看实名状态
        handleCheckCert(row) {
            quertUserCert(row.uid).then((res) => {
                console.log(res);
                const data = res.data;
                // 处理 vue 的 null不展示问题
                Object.keys(data).forEach(key => {
                    if (data[key] === null) {
                        data[key] = 'null';
                    }
                })
                this.certDetail = {
                    ...data,
                    uid: res.uid
                };
                this.certVisible = true;
            });
        },
        /**
         * 结算通知
         */
        settlementNotice(row) {
            this.$confirm('确定给商户的飞机群组发送结算通知吗？', '信息', {
                type: 'warning',
            }).then(() => {
                setSettlementNotify(row.uid).then((res) => {
                    if (res.code !== 0) {
                        this.$message.error(res.msg);
                        return;
                    }
                    this.$message.success(res.msg);
                })
            })
        },
        /**
         * 订单
         */
        order(row) {
            this.$router.push({
                path: '/collectionOrder',
                query: {
                    uid: row.uid
                }
            });
        },
        /**
         * 登录
         */
        login(row) {
            window.open(`https://jiu.shouxuanzp.cn/admin/sso.php?uid=${row.uid}`);
        },
        /**
         * 明细
         */
        details(row) {
            this.$router.push({
                path: '/financialDetails',
                query: {
                    uid: row.uid
                }
            });
        },
        /**
         * 编辑
         */
        change(row) {
            queryMerchantDetail(row.uid).then(res => {
                if (res.code === 0) {
                    this.editDetail = { ...res.data };
                    this.detailVisible = true;
                    this.editUid = row.uid;
                } else {
                    this.$message.error(res.msg);
                }
            })
        },

        handleClose(isOk) {
            this.detailVisible = false;
            this.editUid = '';
            this.editDetail = {};
            if (isOk) {
                this.getData();
            }
        },
        /**
         * 删除
         */
        deleteItem(row) {
            this.$confirm('你确实要删除此商户吗？', '信息', {
                type: 'warning',
            }).then(() => {
                deleteUser(row.uid).then((res) => {
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
        this.businessListForm.value = this.$route.query.uid || '';
        this.businessListForm.column = this.$route.query.column || 'uid';

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