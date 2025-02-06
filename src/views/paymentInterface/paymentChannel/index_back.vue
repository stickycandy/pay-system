<template>
    <div class="paymentChannel">
        <div class="select-box">
            <el-form :inline="true" :model="paymentChannelListForm">
                <el-form-item>
                    <el-input class="small-input" v-model="paymentChannelListForm.kw" placeholder="通道ID/名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input class="small-input" v-model="paymentChannelListForm.plugin" placeholder="支付插件"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="paymentChannelListForm.type" placeholder="所有支付方式" class="small-input">
                        <el-option v-for="item in payTypeOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="paymentChannelListForm.dstatus" placeholder="全部状态" class="small-input">
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
                <el-form-item>
                    <el-button class="add" @click="toAdd">添加</el-button>
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
                            <span v-if="scope.column.property == 'mode'">
                                {{ scope.row[scope.column.property] == 0 ? '平台代收' : '' }}
                            </span>
                            <span v-else-if="scope.column.property == 'typeshowname'">
                                <span class="typeshowname">
                                    <img src="@/assets/img/common/table-zfbPay-icon.png" alt="" />
                                    {{ scope.row[scope.column.property] }}
                                </span>
                            </span>
                            <span v-else-if="scope.column.property == 'current_money'">
                                <span class="current_money">
                                    <el-button type="text" @click="getCurrent_money">[刷新]</el-button>
                                </span>
                            </span>
                            <span v-else-if="scope.column.property == 'yestday_money'">
                                <span class="yestday_money">
                                    <el-button type="text" @click="getYestday_money">[刷新]</el-button>
                                </span>
                            </span>
                            <span v-else-if="scope.column.property == 'status'">
                                <div class="status">
                                    <el-tag color="#EFF6FF" v-if="scope.row[scope.column.property] == '1'">已开启</el-tag>
                                </div>
                            </span>
                            <span class="operate" v-else-if="scope.column.property == 'operate'">
                                <el-button type="text" @click="configureKey(scope.row)">配置密钥</el-button>
                                <el-button type="text" @click="order(scope.row)">订单</el-button>
                                <el-button type="text" @click="test(scope.row)">测试</el-button>
                                <el-button type="text" @click="change(scope.row)">
                                    <img src="@/assets/img/common/table-change-icon.png" alt="" />
                                </el-button>
                                <el-button type="text" @click="copy(scope.row)">
                                    <img src="@/assets/img/common/table-copy-icon.png" alt="" />
                                </el-button>
                                <el-button type="text" @click="delete scope.row">
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
                    显示结果：{{ (paymentChannelListForm.pageNumber - 1) * paymentChannelListForm.pageSize + 1 }}-{{
                        (paymentChannelListForm.pageNumber - 1) * paymentChannelListForm.pageSize + tableData.length
                    }}，总共{{ tableData.length }}条
                </div>
                <el-pagination
                    :current-page.sync="paymentChannelListForm.pageNumber"
                    @current-change="handleCurrentChange"
                    :page-size="paymentChannelListForm.pageSize"
                    background
                    layout="prev, pager, next"
                    :total="total"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import bus from '@/utils/bus.js';
export default {
    data() {
        return {
            collapse: false,
            paymentChannelListForm: {
                kw: '',
                plugin: '',
                dstatus: '-1',
                type: '0',
                pageSize: 6,
                pageNumber: 1
            },
            payTypeOption: [
                {
                    value: '0',
                    label: '所有支付方式'
                },
                {
                    value: '1',
                    label: '支付宝'
                },
                {
                    value: '2',
                    label: '微信支付'
                },
                {
                    value: '3',
                    label: 'QQ钱包'
                },
                {
                    value: '4',
                    label: '网银支付 '
                },
                {
                    value: '5',
                    label: '京东支付'
                },
                {
                    value: '6',
                    label: 'PayPal'
                }
            ],
            statusOption: [
                {
                    value: '-1',
                    label: '全部状态'
                },
                {
                    value: '1',
                    label: '状态已开启'
                },
                {
                    value: '0',
                    label: '状态已关闭'
                }
            ],
            tableData: [
                {
                    id: '139',
                    name: 'demo测试',
                    mode: '0',
                    rate: '	100.00',
                    typeshowname: '支付宝',
                    typename: 'alipay',
                    status: '1'
                },
                {
                    id: '139',
                    name: 'demo测试',
                    mode: '0',
                    rate: '	100.00',
                    typeshowname: '支付宝',
                    typename: 'alipay',
                    status: '1'
                },
                {
                    id: '139',
                    name: 'demo测试',
                    mode: '0',
                    rate: '	100.00',
                    typeshowname: '支付宝',
                    typename: 'alipay',
                    status: '1'
                },
                {
                    id: '139',
                    name: 'demo测试',
                    mode: '0',
                    rate: '	100.00',
                    typeshowname: '支付宝',
                    typename: 'alipay',
                    status: '1'
                },
                {
                    id: '139',
                    name: 'demo测试',
                    mode: '0',
                    rate: '	100.00',
                    typeshowname: '支付宝',
                    typename: 'alipay',
                    status: '1'
                },
                {
                    id: '139',
                    name: 'demo测试',
                    mode: '0',
                    rate: '	100.00',
                    typeshowname: '支付宝',
                    typename: 'alipay',
                    status: '1'
                }
            ],
            columnList: [
                { prop: 'id', label: 'ID', width: '90', show: true },
                { prop: 'name', label: '显示名称', show: true },
                { prop: 'mode', label: '通道模式', show: true },
                { prop: 'rate', label: '分成比例', show: true },
                { prop: 'typeshowname', label: '支付方式', show: true },
                { prop: 'typename', label: '支付插件 ', show: true },
                { prop: 'current_money', label: '今日收款', show: true },
                { prop: 'yestday_money', label: '昨日收款 ', show: true },
                { prop: 'status', label: '状态', show: true },
                { prop: 'operate', label: '操作', width: '330', show: true }
            ],
            total: 0,
            activityType: [],
            checkboxList: []
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
                ...this.paymentChannelListForm
            };
            this.getData(searchObj);
        },
        /**
         * 重置
         */
        onReset() {
            this.paymentChannelListForm = {
                kw: '',
                plugin: '',
                dstatus: '-1',
                type: '0',
                pageSize: 6,
                pageNumber: 1
            };
            this.total = 0;
        },
        /**
         * 添加
         */
        toAdd() {
            //页面跳转
        },
        /**
         * 获取数据列表
         */
        getData(searchObj) {
            this.tableData = [
                {
                    id: '139',
                    name: 'demo测试',
                    mode: '0',
                    rate: '	100.00',
                    typeshowname: '支付宝',
                    typename: 'alipay',
                    status: '1'
                },
                {
                    id: '139',
                    name: 'demo测试',
                    mode: '0',
                    rate: '	100.00',
                    typeshowname: '支付宝',
                    typename: 'alipay',
                    status: '1'
                },
                {
                    id: '139',
                    name: 'demo测试',
                    mode: '0',
                    rate: '	100.00',
                    typeshowname: '支付宝',
                    typename: 'alipay',
                    status: '1'
                },
                {
                    id: '139',
                    name: 'demo测试',
                    mode: '0',
                    rate: '	100.00',
                    typeshowname: '支付宝',
                    typename: 'alipay',
                    status: '1'
                },
                {
                    id: '139',
                    name: 'demo测试',
                    mode: '0',
                    rate: '	100.00',
                    typeshowname: '支付宝',
                    typename: 'alipay',
                    status: '1'
                },
                {
                    id: '139',
                    name: 'demo测试',
                    mode: '0',
                    rate: '	100.00',
                    typeshowname: '支付宝',
                    typename: 'alipay',
                    status: '1'
                }
            ];
            this.total = 18;
        },
        /**
         * 翻页
         */
        handleCurrentChange(v) {
            this.businessListForm.pageNumber = v;
            this.getData();
        },
        /**
         * 配置密钥
         */
        configureKey(row) {},
        /**
         * 订单
         */
        order(row) {},
        /**
         * 测试
         */
        test(row) {},
        /**
         * 修改
         */
        change(row) {},
        /**
         * 复制
         */
        copy(row) {},
        /**
         * 删除
         */
        delete(row) {},
        /**
         * 刷新当前收益
         */
        getCurrent_money(row) {},
        /**
         * 刷新昨日收益
         */
        getYestday_money(row) {}
    },
    mounted() {
        this.getData();
        this.columnList.forEach((item) => {
            this.checkboxList.push(item.label.replace('-', '/'));
            this.activityType = this.checkboxList;
        });
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>