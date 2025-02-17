<template>
    <div class="homePage">
        <bread-crumb></bread-crumb>
        <div class="header-wrap mb">
            <div class="header-left mr">
                <div class="tip-wrap mb bg">
                    <div class="tips">
                        <img src="../../assets/img/home/trumpet.png" alt="通知" />
                        提示
                    </div>
                    <div class="message">请及时修改网站默认管理员密码！</div>
                </div>
                <div class="summary-wrap bg">
                    <div class="date">
                        <img src="../../assets/img/home/date.png" alt="日期" />
                        {{ timeData }}
                    </div>
                    <div class="summary-con">
                        <div class="summary-item">
                            <div class="icon-img">
                                <img src="../../assets/img/home/total_number_of_orders.png" alt="订单总数" />
                            </div>
                            <div class="item-con">
                                <div class="title">订单总数</div>
                                <div class="num">{{ detailData.order_num | thousandsSeparator }}</div>
                            </div>
                        </div>
                        <div class="summary-item">
                            <div class="icon-img">
                                <img src="../../assets/img/home/number_of_merchants.png" alt="商户数量" />
                            </div>
                            <div class="item-con">
                                <div class="title">商户数量</div>
                                <div class="num">{{ detailData.merchant_num  | thousandsSeparator }}</div>
                            </div>
                        </div>
                        <div class="summary-item">
                            <div class="icon-img">
                                <img src="../../assets/img/home/outstanding_balance.png" alt="未结余额（元）" />
                            </div>
                            <div class="item-con">
                                <div class="title">未结余额 <span>（元）</span></div>
                                <div class="num">{{ detailData.balance | thousandsSeparator  }}</div>
                                <div class="txt">1小时更新一次</div>
                            </div>
                        </div>
                        <div class="summary-item">
                            <div class="icon-img">
                                <img src="../../assets/img/home/payment_on_behalf.png" alt="未结余额（元）" />
                            </div>
                            <div class="item-con">
                                <div class="title">已代付总额<span>（元）</span></div>
                                <div class="num">{{ detailData.pay_amount | thousandsSeparator  }}</div>
                                <div class="txt">1小时更新一次</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-right bg">
                <div class="panel-title">管理员信息</div>
                <div class="user-wrap">
                    <div class="head-img">
                        <img src="/assets/img/logo.png?r=82626" alt="头像" />
                    </div>
                    <div class="label-con">
                        <div class="label">用户名：<span>admin</span></div>
                        <div class="label">用户权限：<span>管理员</span></div>
                    </div>
                </div>
                <div class="btn-group">
                    <!-- <div class="btn-item mr" @click="backHome">返回首页</div> -->
                    <div class="btn-item mr" @click="changePassword">修改密码</div>
                    <div class="btn-item primary" @click="logOut">退出登录</div>
                </div>
            </div>
        </div>
        <div class="count-wrap mb bg">
            <div class="count-left">
                <div class="count-item">
                    <div class="item-title">
                        <div class="circular"></div>
                        总成交
                    </div>
                    <div class="item-num">{{ detailData.total_trans_money | thousandsSeparator  }}</div>
                </div>
                <div class="count-item">
                    <div class="item-title">
                        <div class="circular"></div>
                        当月成交
                    </div>
                    <div class="item-num">{{ detailData.month_trans_money | thousandsSeparator  }}</div>
                </div>
                <div class="count-item">
                    <div class="item-title">
                        <div class="circular"></div>
                        上月成交
                    </div>
                    <div class="item-num">{{ detailData.last_month_trans_money | thousandsSeparator  }}</div>
                </div>
                <div class="count-item">
                    <div class="item-title">
                        <div class="circular"></div>
                        当周成交
                    </div>
                    <div class="item-num">{{ detailData.week_transMoney | thousandsSeparator  }}</div>
                </div>
                <div class="count-item">
                    <div class="item-title">
                        <div class="circular"></div>
                        上周成交
                    </div>
                    <div class="item-num">{{ detailData.lastweek_trans_money | thousandsSeparator  }}</div>
                </div>
            </div>
            <div class="count-right">
                <div class="count-item">
                    <div class="label">
                        <div class="label-name">今日成交</div>
                        <div class="label-num">{{ detailData.today_trans_money | thousandsSeparator  }}</div>
                    </div>
                    <!-- <div class="label">
                        <div class="label-name">成率</div>
                        <span>{{ detailData.success_rate }}%</span>
                    </div> -->
                </div>
                <div class="count-item">
                    <div class="label">
                        <div class="label-name">昨日成交</div>
                        <div class="label-num">{{ detailData.yesterday_trans_money | thousandsSeparator  }}</div>
                    </div>
                    <!-- <div class="label">
                        <div class="label-name">成率</div>
                        <span>{{ detailData.success_rate2 }}%</span>
                    </div> -->
                </div>
            </div>
        </div>
        <div class="mb bg channel-data">
            <div class="channel-title"><div class="circular"></div>   当天通道统计</div>
            <div class="channel-content">
                <div class="channel-item" v-for="(item, index) in Object.entries(channelData)" :key="index">
                    <div class="item-title enter">{{ item[0] }}</div>
                    <div class="enter item-count">{{ item[1] | thousandsSeparator }}</div>
                </div>
            </div>
        </div>
        <div class="trade-wrap mb">
            <!-- 近30天成交金额 -->
            <div class="trade-left mr bg">
                <div class="panel-title">近30天成交金额</div>
                <div class="chart" id="chart1"></div>
            </div>
            <!-- 交易数据 -->
            <div class="trade-right bg">
                <div class="panel-title flex">
                    <div>产品数据</div>
                    <!-- <div class="tab-wrap">
                        <div class="tab-item" :class="{ active: choseTransaction === 0 }" @click="changeTransaction(0)">按月</div>
                        <div class="tab-item" :class="{ active: choseTransaction === 1 }" @click="changeTransaction(1)">按周</div>
                    </div> -->
                </div>
                <div class="chart-wrap">
                    <div class="chart" id="chart2" style="width: 40%;"></div>
                    <div class="chart" id="chart3" style="width: 40%;"></div>
                </div>
            </div>
        </div>
        <div class="ranking-wrap mb">
            <!-- 当天商户排行榜 -->
            <div class="ranking-left mr bg">
                <div class="panel-title">当天商户排行榜</div>
                <div class="chart" id="chart5"></div>
            </div>
            <!-- 当月商户排行榜 -->
            <div class="ranking-right bg">
                <div class="panel-title">当月商户排行榜</div>
                <div class="chart" id="chart6"></div>
            </div>
        </div>
        <div class="bottom-wrap mb">
            <!-- 成交金额 -->
            <div class="bottom-left mr bg">
                <div class="panel-title flex">
                    <div>当天成交趋势</div>
                    <!-- <div class="tab-wrap">
                        <div class="tab-item" :class="{ active: choseTransactionAmount === 0 }" @click="changeTransactionAmount(0)">
                            按月
                        </div>
                        <div class="tab-item" :class="{ active: choseTransactionAmount === 1 }" @click="changeTransactionAmount(1)">
                            按周
                        </div>
                    </div> -->
                </div>
                <div class="chart" id="chart7"></div>
            </div>
            <!-- 用户分布图 -->
            <div class="bottom-right bg">
                <div class="panel-title flex">
                    <div>用户分布图</div>
                    <div class="tab-wrap" style="width: 54px;">
                        <div class="tab-item" :class="{ active: choseUserProfile === 0 }" @click="changeUserProfile(0)">按月</div>
                        <!-- <div class="tab-item" :class="{ active: choseUserProfile === 1 }" @click="changeUserProfile(1)">按周</div> -->
                    </div>
                </div>
                <div class="chart-con">
                    <div class="legend-wrap">
                        <div style="width: 100%">
                            <div class="legend-item" v-for="(item, index) in userProfileList" :key="index">
                                <div class="title">
                                    <div class="circular" :style="{ background: userColorList[index] || '#00CC99' }"></div>
                                    <div>{{ item.province }}</div>
                                </div>
                                <div class="txt">{{ item.pay_user_num }}/{{ item.pay_money }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="chart" id="chart8"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import geoJson from '@/utils/china.json';
import '@/styles/homePage.less';
import BreadCrumb from '@/components/common/BreadCrumb.vue';
import { queryDashboard, queryChannel } from '@/api/dashboard';
import { loginOut } from '@/api/login';

function isString(value) {
  return typeof value === 'string';
}
export default {
    name: 'homePage',
    components: {
        BreadCrumb
    },
    data() {
        return {
            channelData: {},
            detailData: {},
            choseTransaction: 0,
            choseTransactionAmount: 0,
            choseUserProfile: 0,
            timeData: '',
            timer: null,
            userColorList: [
                '#4CB6FF',
                '#2363E6',
                '#FF8635',
                '#F3D025',
                '#00CC99',
            ],
            userProfileList: []
        };
    },
    methods: {
        getData() {
            queryDashboard().then(res => {
                this.detailData = res.data.dataOverview;
                this.getDayRankData(res.data.currentDateMerchRank);
                this.getMonthRankData(res.data.currentMonthMerchRank);
                this.getTransAmountData(res.data.currentDateHourData);
                this.userProfileList = res.data.userDistributionArea;
                this.getUserProfileData(res.data.userDistributionArea)
                this.getTransactionData(res.data.productCurrentData);
                this.getTransactionData3(res.data.productMonthData);
                this.getNearMoneyData(res.data.thirtyData);
            })
        },
        getCurrentTimeToSeconds() {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            this.timeData = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        // 返回首页
        backHome() {
            console.log('返回首页');
        },
        // 修改密码
        changePassword() {
            console.log('修改密码');
            this.$router.push('/changePwd');
        },
        // 退出登录
        logOut() {
            loginOut().then(res => {
                this.$router.push('/login');
            })
            console.log('退出登录');
        },
        // 近30天成交金额
        getNearMoneyData(thirtyData) {
            let arr = [35, 36, 45, 54, 59, 42];
            const xAxis = Object.keys(thirtyData);
            const data = Object.values(thirtyData).map(item => {
                if (isString(item)) {
                    return parseFloat(item) * 10000;
                } else {
                    return item * 10000;
                }
            });
            let datalist = [];
            xAxis.forEach((item, index) => {
                datalist.push({
                    xAxis: index,
                    label: {
                        show: false
                    }
                });
            });
            let myCharts = this.$echarts.init(document.getElementById('chart1'));
            let option = {
                grid: {
                    left: '7%',
                    right: '0',
                    top: '10%'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        return (
                            params[0].name +
                            '<br/>' +
                            "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                            params[0].seriesName +
                            ' : ' +
                            Number((params[0].value.toFixed(4) / 10000).toFixed(2)).toLocaleString() +
                            ' 万<br/>'
                        );
                    }
                },
                xAxis: [
                    {
                        type: 'category',
                        data: xAxis,
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#718096'
                            },
                            fontSize: 12,
                            margin: 13
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            formatter: function(value) {
                                return value > 10000 ? (value / 10000).toFixed(0) + ' 万' : '';
                            },
                            textStyle: {
                                color: '#718096',
                                fontSize: 12
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    // {
                    //     name: '净销售额',
                    //     type: 'line',
                    //     data: [35, 36, 45, 54, 59, 42],
                    //     symbolSize: 16,
                    //     smooth: true,
                    //     yAxisIndex: 0,
                    //     showSymbol: false,
                    //     lineStyle: {
                    //         width: 3,
                    //         color: '#2463EB'
                    //     }
                    // },
                    {
                        name: '成交额',
                        type: 'line',
                        data: data,
                        symbolSize: 16,
                        smooth: true,
                        yAxisIndex: 0,
                        showSymbol: false,
                        lineStyle: {
                            width: 3,
                            color: '#FF970C'
                        },
                    },
                    {
                        tooltip: {
                            show: false,
                            trigger: 'axis',
                        },
                        name: '柱状图',
                        type: 'bar',
                        stack: '总量',
                        barWidth: 59,
                        itemStyle: {
                            normal: {
                                color: 'rgba(249, 250, 251, 0.8)'
                            }
                        },
                        markLine: {
                            symbol: ['none', 'none'], // 去掉箭头
                            label: {
                                show: false // 不显示文字
                            },
                            lineStyle: {
                                normal: {
                                    color: '#F1F2F4',
                                    type: 'solid',
                                    width: 1
                                }
                            },
                            data: datalist
                        },
                        // data: [120, 200, 150, 80, 70, 110, 130]
                    }
                ]
            };
            myCharts.setOption(option);
        },
        // 交易数据
        changeTransaction(num) {
            this.choseTransaction = num;
            if (num == 0) {
                let data1 = [
                    {
                        name: '产品占比1',
                        value: 40,
                        itemStyle: {
                            color: '#9973FD'
                        }
                    },
                    {
                        name: '产品占比2',
                        value: 30,
                        itemStyle: {
                            color: '#2463EB'
                        }
                    },
                    {
                        name: '产品占比3',
                        value: 30,
                        itemStyle: {
                            color: '#FFD023'
                        }
                    }
                ];
                this.getTransactionChart(data1);
                let data2 = [
                    {
                        name: '产品占比1',
                        value: 40,
                        itemStyle: {
                            color: '#9973FD'
                        }
                    },
                    {
                        name: '产品占比2',
                        value: 30,
                        itemStyle: {
                            color: '#2463EB'
                        }
                    },
                    {
                        name: '产品占比3',
                        value: 30,
                        itemStyle: {
                            color: '#FFD023'
                        }
                    }
                ];
                this.getTransactionChart3(data2);
                let data3 = [
                    {
                        name: '产品占比1',
                        value: 40,
                        itemStyle: {
                            color: '#9973FD'
                        }
                    },
                    {
                        name: '产品占比2',
                        value: 30,
                        itemStyle: {
                            color: '#2463EB'
                        }
                    },
                    {
                        name: '产品占比3',
                        value: 30,
                        itemStyle: {
                            color: '#FFD023'
                        }
                    }
                ];
                this.getTransactionChart4(data3);
            } else {
                let data1 = [
                    {
                        name: '产品占比1',
                        value: 60,
                        itemStyle: {
                            color: '#9973FD'
                        }
                    },
                    {
                        name: '产品占比2',
                        value: 30,
                        itemStyle: {
                            color: '#2463EB'
                        }
                    },
                    {
                        name: '产品占比3',
                        value: 10,
                        itemStyle: {
                            color: '#FFD023'
                        }
                    }
                ];
                this.getTransactionChart(data1);
                let data2 = [
                    {
                        name: '产品占比1',
                        value: 20,
                        itemStyle: {
                            color: '#9973FD'
                        }
                    },
                    {
                        name: '产品占比2',
                        value: 60,
                        itemStyle: {
                            color: '#2463EB'
                        }
                    },
                    {
                        name: '产品占比3',
                        value: 50,
                        itemStyle: {
                            color: '#FFD023'
                        }
                    }
                ];
                this.getTransactionChart3(data2);
                let data3 = [
                    {
                        name: '产品占比1',
                        value: 50,
                        itemStyle: {
                            color: '#9973FD'
                        }
                    },
                    {
                        name: '产品占比2',
                        value: 40,
                        itemStyle: {
                            color: '#2463EB'
                        }
                    },
                    {
                        name: '产品占比3',
                        value: 20,
                        itemStyle: {
                            color: '#FFD023'
                        }
                    }
                ];
                this.getTransactionChart4(data3);
            }
        },
        getTransactionData(productCurrentData) {
            const colorMap = ['#9973FD', '#2463EB', '#FFD023']
            const data = Object.entries(productCurrentData).map((item, index) => ({
                name: item[0],
                value:  isString(item[1]) ? parseFloat(item[1]) * 10000 : item[1] * 10000,
                itemStyle: {
                    color: colorMap[index]
                }
            }));
            this.getTransactionChart(data);
        },
        getTransactionChart(value) {
            let myCharts = this.$echarts.init(document.getElementById('chart2'));
            const data = value;
            let option = {
                title: {
                    text: '当天产品数据',
                    left: 'center',
                    // top: '5%',
                    bottom: '26%',
                    textStyle: {
                        color: '#718096',
                        fontSize: 16
                    }
                },
                legend: {
                    type: 'plain',
                    icon: 'circle',
                    orient: 'vertical',
                    left: '9%',
                    bottom: '3%',
                    align: 'left',
                    itemGap: 20,
                    itemWidth: 10, // 设置宽度
                    itemHeight: 10, // 设置高度
                    symbolKeepAspect: false,
                    textStyle: {
                        color: '#718096',
                        rich: {
                            name: {
                                width: 50,
                                fontSize: 12
                            },
                            value: {
                                width: 120,
                                fontSize: 12,
                            }
                        }
                    },
                    data: data.map((item) => item.name),
                    formatter: function (name) {
                        if (data && data.length) {
                            for (var i = 0; i < data.length; i++) {
                                if (name === data[i].name) {
                                    return '{name| ' + name + '}' + '{value| ' + (data[i].value > 10000 ? (data[i].value / 10000 + '万') : data[i].value) + '}';
                                }
                            }
                        }
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        const current = params.data;
                        return (
                            params.seriesName +
                            '<br/>' +
                            "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + current.itemStyle.color + "'></span>" +
                            current.name +
                            ' : ' +
                            Number((current.value.toFixed(4) / 10000).toFixed(2)).toLocaleString() +
                            ' 万<br/>'
                        );
                    },
                    rich: {
                        name: {
                            width: 50,
                            fontSize: 12
                        },
                        value: {
                            width: 120,
                            fontSize: 12,
                        }
                    }
                },
                series: [
                    {
                        name: '当天产品数据',
                        type: 'pie',
                        radius: ['60%', '85%'],
                        center: ['50%', '35%'],
                        data: data,
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        }
                    },
                    {
                        itemStyle: {
                            normal: {
                                color: '#F1F2F4'
                            }
                        },
                        type: 'pie',
                        hoverAnimation: false,
                        radius: ['60%', '100%'],
                        center: ['50%', '35%'],
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {
                                value: 1
                            }
                        ],
                        z: -1
                    }
                ]
            };
            myCharts.setOption(option);
        },
        getTransactionData3(productMonthData) {
            const colorMap = ['#0CAF60', '#2463EB', '#FFD023']
            const data = Object.entries(productMonthData).map((item, index) => ({
                name: item[0],
                value: isString(item[1]) ? parseFloat(item[1]) * 10000 : item[1] * 10000,
                itemStyle: {
                    color: colorMap[index]
                }
            }));
            this.getTransactionChart3(data);
        },
        getTransactionChart3(value) {
            let myCharts = this.$echarts.init(document.getElementById('chart3'));
            const data = value;
            let option = {
                title: {
                    text: '当月产品数据',
                    left: 'center',
                    // top: '5%',
                    bottom: '26%',
                    textStyle: {
                        color: '#718096',
                        fontSize: 16
                    }
                },
                legend: {
                    type: 'plain',
                    icon: 'circle',
                    orient: 'vertical',
                    left: '9%',
                    bottom: '3%',
                    align: 'left',
                    itemGap: 20,
                    itemWidth: 10, // 设置宽度
                    itemHeight: 10, // 设置高度
                    symbolKeepAspect: false,
                    textStyle: {
                        color: '#718096',
                        rich: {
                            name: {
                                width: 60,
                                fontSize: 12
                            },
                            value: {
                                width: 120,
                                fontSize: 12
                            }
                        }
                    },
                    data: data.map((item) => item.name),
                    formatter: function (name) {
                        if (data && data.length) {
                            for (var i = 0; i < data.length; i++) {
                                if (name === data[i].name) {
                                    return '{name| ' + name + '}' + '{value| ' + (data[i].value > 10000 ? (data[i].value / 10000 + '万') : data[i].value) + '}';
                                }
                            }
                        }
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        const current = params.data;
                        return (
                            params.seriesName +
                            '<br/>' +
                            "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:" + current.itemStyle.color + "'></span>" +
                            current.name +
                            ' : ' +
                            Number((current.value.toFixed(4) / 10000).toFixed(2)).toLocaleString() +
                            ' 万<br/>'
                        );
                    },
                    rich: {
                        name: {
                            width: 50,
                            fontSize: 12
                        },
                        value: {
                            width: 120,
                            fontSize: 12,
                            align: 'right'
                        }
                    }
                },
                series: [
                    {
                        name: '当月产品数据',
                        type: 'pie',
                        radius: ['60%', '85%'],
                        center: ['50%', '35%'],
                        data: data,
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        }
                    },
                    {
                        itemStyle: {
                            normal: {
                                color: '#F1F2F4'
                            }
                        },
                        type: 'pie',
                        hoverAnimation: false,
                        radius: ['60%', '100%'],
                        center: ['50%', '35%'],
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {
                                value: 1
                            }
                        ],
                        z: -1
                    }
                ]
            };
            myCharts.setOption(option);
        },
        getTransactionData4() {
            let data = [
                {
                    name: '产品占比1',
                    value: 40,
                    itemStyle: {
                        color: '#FF4545'
                    }
                },
                {
                    name: '产品占比2',
                    value: 30,
                    itemStyle: {
                        color: '#2463EB'
                    }
                },
                {
                    name: '产品占比3',
                    value: 30,
                    itemStyle: {
                        color: '#FFD023'
                    }
                }
            ];
            this.getTransactionChart4(data);
        },
        getTransactionChart4(value) {
            let myCharts = this.$echarts.init(document.getElementById('chart4'));
            const data = value;
            let option = {
                legend: {
                    type: 'plain',
                    icon: 'circle',
                    orient: 'vertical',
                    left: '9%',
                    bottom: '3%',
                    align: 'left',
                    itemGap: 20,
                    itemWidth: 10, // 设置宽度
                    itemHeight: 10, // 设置高度
                    symbolKeepAspect: false,
                    textStyle: {
                        color: '#718096',
                        rich: {
                            name: {
                                width: 100,
                                fontSize: 12
                            },
                            value: {
                                width: 60,
                                fontSize: 12
                            }
                        }
                    },
                    data: data.map((item) => item.name),
                    formatter: function (name) {
                        if (data && data.length) {
                            for (var i = 0; i < data.length; i++) {
                                if (name === data[i].name) {
                                    return '{name| ' + name + '}' + '{value| ' + data[i].value + '%}';
                                }
                            }
                        }
                    }
                },
                series: [
                    {
                        name: '数量',
                        type: 'pie',
                        radius: ['60%', '85%'],
                        center: ['50%', '35%'],
                        data: data,
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        }
                    },
                    {
                        itemStyle: {
                            normal: {
                                color: '#F1F2F4'
                            }
                        },
                        type: 'pie',
                        hoverAnimation: false,
                        radius: ['60%', '100%'],
                        center: ['50%', '35%'],
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {
                                value: 1
                            }
                        ],
                        z: -1
                    }
                ]
            };
            myCharts.setOption(option);
        },
        // 当天商户排行榜
        getDayRankData(currentDateMerchRank) {
            let myCharts = this.$echarts.init(document.getElementById('chart5'));
            let nameData = [];
            let valueData = [];
            Object.entries(currentDateMerchRank).map(item => {
                return {
                    name: item[0],
                    value: isString(item[1])? parseFloat(item[1]) * 10000 : item[1] * 10000
                }
            }).sort((a, b) => b.value - a.value).map(item => {
                nameData.push(item.name);
                valueData.push(item.value);
            });
            let moneyData = [];
            var color = ['#EE562B', '#FF970C', '#FFD023'];
            let maxData = [];
            nameData.forEach((item, index) => {
                moneyData.push({
                    value: valueData[index],
                    itemStyle: {
                        normal: {
                            show: true,
                            color: index > 2 ? '#BAC3D9' : color[index]
                        }
                    }
                });
                maxData.push(Math.max(...valueData));
            });
            //亮色图片
            let rank1 = require('../../assets/img/home/rank1.png');
            let rank2 = require('../../assets/img/home/rank2.png');
            let rank3 = require('../../assets/img/home/rank3.png');
            let rank4 = require('../../assets/img/home/rank4.png');
            let rank5 = require('../../assets/img/home/rank5.png');
            let option = {
                grid: {
                    left: '0',
                    right: '3%',
                    bottom: '-10%',
                    top: '8%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    },
                    formatter: function (params) {
                        return (
                            params[0].name +
                            '<br/>' +
                            "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                            params[0].seriesName +
                            ' : ' +
                            Number((params[0].value.toFixed(4) / 10000).toFixed(2)).toLocaleString() +
                            ' 万<br/>'
                        );
                    }
                },
                xAxis: {
                    show: false,
                    type: 'value'
                },
                yAxis: [
                    {
                        type: 'category',
                        inverse: true,
                        axisLabel: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        data: nameData
                    },
                    {
                        type: 'category',
                        inverse: true,
                        axisTick: 'none',
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            inside: true,
                            position: ['-20px', '-24px'],
                            verticalAlign: 'bottom',
                            lineHeight: '40',
                            textStyle: {
                                color: '#718096',
                                fontSize: 12,
                                fontWeight: 500
                            },
                            formatter: function(value) {
                                return value > 10000 ? (value / 10000).toFixed(2) + ' 万' : '';
                            },
                        },
                        data: valueData
                    }
                ],
                series: [
                    {
                        name: '金额',
                        type: 'bar',
                        zlevel: 1,
                        label: {
                            normal: {
                                color: '#b3ccf8',
                                show: true,
                                position: [0, '-25px'],
                                textStyle: {
                                    fontSize: 12
                                },
                                formatter: function (a) {
                                    let num = '';
                                    let str = '';
                                    num = a.dataIndex + 1;
                                    if (a.dataIndex === 0) {
                                        str = `{start1|}  {color4|${a.name}}`;
                                    } else if (a.dataIndex === 1) {
                                        str = `{start2|}  {color4|${a.name}}`;
                                    } else if (a.dataIndex === 2) {
                                        str = `{start3|}  {color4|${a.name}}`;
                                    } else if (a.dataIndex === 3) {
                                        str = `{start4|}  {color4|${a.name}}`;
                                    } else {
                                        str = `{start5|}  {color4|${a.name}}`;
                                    }
                                    return str;
                                },
                                rich: {
                                    start1: {
                                        backgroundColor: {
                                            image: rank1, // 背景图的URL
                                            repeat: 'no-repeat' // 背景图不重复
                                        },
                                        width: 34,
                                        height: 21
                                    },
                                    start2: {
                                        backgroundColor: {
                                            image: rank2, // 背景图的URL
                                            repeat: 'no-repeat' // 背景图不重复
                                        },
                                        width: 34,
                                        height: 21
                                    },
                                    start3: {
                                        backgroundColor: {
                                            image: rank3, // 背景图的URL
                                            repeat: 'no-repeat' // 背景图不重复
                                        },
                                        width: 34,
                                        height: 21
                                    },
                                    start4: {
                                        backgroundColor: {
                                            image: rank4, // 背景图的URL
                                            repeat: 'no-repeat' // 背景图不重复
                                        },
                                        width: 34,
                                        height: 21
                                    },
                                    start5: {
                                        backgroundColor: {
                                            image: rank5, // 背景图的URL
                                            repeat: 'no-repeat' // 背景图不重复
                                        },
                                        width: 34,
                                        height: 21
                                    },
                                    color1: {
                                        color: '#ff9500',
                                        fontWeight: 700
                                    },
                                    color2: {
                                        color: '#02d8f9',
                                        fontWeight: 700
                                    },
                                    color3: {
                                        color: '#718096',
                                        fontSize: 12,
                                        fontWeight: 500
                                    },
                                    color4: {
                                        color: '#111827',
                                        fontSize: 12
                                    }
                                }
                            }
                        },
                        barWidth: 12,
                        barBorderRadius: 2,
                        data: moneyData
                    },
                    {
                        name: '背景',
                        type: 'bar',
                        barWidth: 12,
                        barGap: '-100%',
                        data: maxData,
                        itemStyle: {
                            normal: {
                                color: '#F9FAFB',
                                barBorderRadius: 2
                            }
                        }
                    }
                ]
            };
            myCharts.setOption(option);
        },
        // 当月商户排行榜
        getMonthRankData(currentMonthMerchRank) {
            let myCharts = this.$echarts.init(document.getElementById('chart6'));
            let nameData = [];
            let valueData = [];
            Object.entries(currentMonthMerchRank).map(item => {
                return {
                    name: item[0],
                    value: isString(item[1])? parseFloat(item[1]) * 10000 : item[1] * 10000
                }
            }).sort((a, b) => b.value - a.value).map(item => {
                nameData.push(item.name);
                valueData.push(item.value);
            });
            let moneyData = [];
            var color = ['#EE562B', '#FF970C', '#FFD023'];
            let maxData = [];
            nameData.forEach((item, index) => {
                moneyData.push({
                    value: valueData[index],
                    itemStyle: {
                        normal: {
                            show: true,
                            color: index > 2 ? '#BAC3D9' : color[index]
                        }
                    }
                });
                maxData.push(Math.max(...valueData));
            });
            //亮色图片
            let rank1 = require('../../assets/img/home/rank1.png');
            let rank2 = require('../../assets/img/home/rank2.png');
            let rank3 = require('../../assets/img/home/rank3.png');
            let rank4 = require('../../assets/img/home/rank4.png');
            let rank5 = require('../../assets/img/home/rank5.png');
            let option = {
                grid: {
                    left: '0',
                    right: '3%',
                    bottom: '-10%',
                    top: '8%',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none'
                    },
                    formatter: function (params) {
                        return (
                            params[0].name +
                            '<br/>' +
                            "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                            params[0].seriesName +
                            ' : ' +
                            Number((params[0].value.toFixed(4) / 10000).toFixed(2)).toLocaleString() +
                            ' 万<br/>'
                        );
                    }
                },
                xAxis: {
                    show: false,
                    type: 'value'
                },
                yAxis: [
                    {
                        type: 'category',
                        inverse: true,
                        axisLabel: {
                            show: false,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        data: nameData
                    },
                    {
                        type: 'category',
                        inverse: true,
                        axisTick: 'none',
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            inside: true,
                            position: ['-20px', '-24px'],
                            verticalAlign: 'bottom',
                            lineHeight: '40',
                            textStyle: {
                                color: '#718096',
                                fontSize: 12,
                                fontWeight: 500
                            },
                            formatter: function(value) {
                                return value > 10000 ? (value / 10000).toFixed(2) + ' 万' : '';
                            },
                        },
                        data: valueData
                    }
                ],
                series: [
                    {
                        name: '金额',
                        type: 'bar',
                        zlevel: 1,
                        label: {
                            normal: {
                                color: '#b3ccf8',
                                show: true,
                                position: [0, '-25px'],
                                textStyle: {
                                    fontSize: 12
                                },
                                formatter: function (a) {
                                    let num = '';
                                    let str = '';
                                    num = a.dataIndex + 1;
                                    if (a.dataIndex === 0) {
                                        str = `{start1|}  {color4|${a.name}}`;
                                    } else if (a.dataIndex === 1) {
                                        str = `{start2|}  {color4|${a.name}}`;
                                    } else if (a.dataIndex === 2) {
                                        str = `{start3|}  {color4|${a.name}}`;
                                    } else if (a.dataIndex === 3) {
                                        str = `{start4|}  {color4|${a.name}}`;
                                    } else {
                                        str = `{start5|}  {color4|${a.name}}`;
                                    }
                                    return str;
                                },
                                rich: {
                                    start1: {
                                        backgroundColor: {
                                            image: rank1, // 背景图的URL
                                            repeat: 'no-repeat' // 背景图不重复
                                        },
                                        width: 34,
                                        height: 21
                                    },
                                    start2: {
                                        backgroundColor: {
                                            image: rank2, // 背景图的URL
                                            repeat: 'no-repeat' // 背景图不重复
                                        },
                                        width: 34,
                                        height: 21
                                    },
                                    start3: {
                                        backgroundColor: {
                                            image: rank3, // 背景图的URL
                                            repeat: 'no-repeat' // 背景图不重复
                                        },
                                        width: 34,
                                        height: 21
                                    },
                                    start4: {
                                        backgroundColor: {
                                            image: rank4, // 背景图的URL
                                            repeat: 'no-repeat' // 背景图不重复
                                        },
                                        width: 34,
                                        height: 21
                                    },
                                    start5: {
                                        backgroundColor: {
                                            image: rank5, // 背景图的URL
                                            repeat: 'no-repeat' // 背景图不重复
                                        },
                                        width: 34,
                                        height: 21
                                    },
                                    color1: {
                                        color: '#ff9500',
                                        fontWeight: 700
                                    },
                                    color2: {
                                        color: '#02d8f9',
                                        fontWeight: 700
                                    },
                                    color3: {
                                        color: '#718096',
                                        fontSize: 12,
                                        fontWeight: 500
                                    },
                                    color4: {
                                        color: '#111827',
                                        fontSize: 12
                                    }
                                }
                            }
                        },
                        barWidth: 12,
                        barBorderRadius: 2,
                        data: moneyData
                    },
                    {
                        name: '背景',
                        type: 'bar',
                        barWidth: 12,
                        barGap: '-100%',
                        data: maxData,
                        itemStyle: {
                            normal: {
                                color: '#F9FAFB',
                                barBorderRadius: 2
                            }
                        }
                    }
                ]
            };
            myCharts.setOption(option);
        },
        // // 成交金额
        // changeTransactionAmount(num) {
        //     this.choseTransactionAmount = num;
        //     if (num == 0) {
        //         let data = ['1200', '1400', '1008', '1411', '1026'];
        //         this.getTransAmountChart(data);
        //     } else {
        //         let data = ['1300', '1500', '1208', '1011', '1126'];
        //         this.getTransAmountChart(data);
        //     }
        // },
        getTransAmountData(currentDateHourData) {
            let data = Object.values(currentDateHourData).map(item => {
                if (isString(item)) {
                    return parseFloat(item) * 10000;
                } else {
                    return item * 10000;
                }

            });
            const xAxis = Object.keys(currentDateHourData);
            this.getTransAmountChart(xAxis, data);
        },
        getTransAmountChart(xAxis, seriesData) {
            let myCharts = this.$echarts.init(document.getElementById('chart7'));
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#ddd'
                        }
                    },
                    formatter: function (params) {
                        return (
                            params[0].name +
                            '<br/>' +
                            "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                            params[0].seriesName +
                            ' : ' +
                            Number((params[0].value.toFixed(4) / 10000).toFixed(2)).toLocaleString() +
                            ' 万<br/>'
                        );
                    },
                    backgroundColor: 'rgba(255,255,255,1)',
                    padding: [5, 10],
                    textStyle: {
                        color: '#7588E4'
                    },
                    extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
                },
                grid: {
                    left: '5%',
                    right: '3%',
                    bottom: '10%',
                    top: '8%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: xAxis,
                    boundaryGap: false,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ['#F1F2F4'],
                            type: 'dashed'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        margin: 20,
                        textStyle: {
                            fontSize: 12,
                            color: '#A0AEC0'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#609ee9'
                        }
                    },
                    axisLabel: {
                        show: false,
                        margin: 10,
                        textStyle: {
                            fontSize: 14
                        }
                    }
                },
                series: [
                    {
                        name: '今日',
                        type: 'line',
                        smooth: true,
                        showSymbol: false,
                        symbol: 'circle',
                        symbolSize: 6,
                        data: seriesData,
                        areaStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [
                                        {
                                            offset: 0,
                                            color: 'rgba(36, 99, 235, 0.3)'
                                        },
                                        {
                                            offset: 1,
                                            color: 'rgba(199, 237, 250,0)'
                                        }
                                    ],
                                    false
                                )
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#2463EB'
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 3
                            }
                        }
                    }
                ]
            };
            myCharts.setOption(option);
        },
        // 用户分布图
        changeUserProfile(num) {
            this.choseUserProfile = num;
        },
        getUserProfileData(userDistributionArea) {
            this.$echarts.registerMap('china', geoJson);
            let myCharts = this.$echarts.init(document.getElementById('chart8'));
            const color = ['#4CB6FF', '#2363E6', '#FF8635', '#EE562B', '#FF970C', '#FFD023'];
            const data = (userDistributionArea|| []).map((item, index) => ({
                name: item.province.replace('省', ''),
                value: isString(item.pay_money) ? parseFloat(item.pay_money) * 10000 : item.pay_money * 10000,
                selected: true,
                select: {
                    label: {
                        show: false
                    },
                    itemStyle: {
                        areaColor: color[index]
                    }
                }
            }));

            const formarNum =  num  => {
                return num > 10000 ? (num / 10000).toFixed(2) + '万' : num;
            }


            let option = {
                tooltip: {
                    trigger: 'item',
                    position: function (p) {
                        //其中p为当前鼠标的位置
                        return [p[0] + 10, p[1] - 10];
                    },
                    formatter: function (params) {
                        if (typeof params.value[2] == 'undefined') {
                            if (params.value) {
                                return params.name + ' : ' + formarNum(params.value);
                            } else {
                                return params.name + ' : ' + '0';
                            }
                        } else {
                            return params.name + ' : ' + formarNum(params.value[2]);
                        }
                    }
                    // formatter: function (e, t, n) {
                    //     if (typeof e.value[2] == 'undefined') {
                    //         if (e.value == '0') {
                    //             return e.name + "：<span style='color: #999;'>未开发</span>";
                    //         } else if (e.value == '1') {
                    //             return e.name + "：<span style='color: blue;'>开发中</span>";
                    //         } else {
                    //             return e.name + "：<span style='color: red;'>" + e.value + '</span> 万';
                    //         }
                    //     }
                    //     //有数量时，显示城市和当前城市所做项目数
                    //     else {
                    //         return e.name + "：<span style='color: red;'>" + e.value[2] + '</span> 万'; //params.value[2]  取出value值中的第三个值  前两个值是经纬度，第三个值是数量
                    //     }
                    // }
                },
                series: [
                    {
                        type: 'map',
                        mapType: 'china',
                        roam: true,
                        zoom: 1.2,
                        selectedMode: 'multiple', // 允许多选
                        data: data,
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                borderColor: '#fff', //区域边框颜色
                                borderWidth: 1.5,
                                shadowBlur: 6,
                                // color: 'red',
                                shadowColor: '#EDEDED'
                            },
                            emphasis: {
                                // areaColor: '#02102b',
                                // areaColor: '#EDEDED',
                                label: {
                                    show: false,
                                    color: '#fff'
                                }
                            }
                        }
                    }
                ]
            };
            myCharts.setOption(option);
        },
        getChannelData() {
            queryChannel().then(res => {
                if (res.code == 0) {
                    this.channelData = res.data;
                }
            });
        },
    },


    mounted() {
        this.getData();
        this.getCurrentTimeToSeconds();
        this.getChannelData();
        this.timer = setInterval(() => {
            this.getCurrentTimeToSeconds();
        }, 1000);
        // this.getNearMoneyData();
        // this.getTransactionData();
        // this.getTransactionData3();
        // this.getTransactionData4();
        // this.getUserProfileData();
        this.resizefun = () => {
            this.$echarts.init(document.getElementById('chart1')).resize();
            this.$echarts.init(document.getElementById('chart2')).resize();
            this.$echarts.init(document.getElementById('chart3')).resize();
            // this.$echarts.init(document.getElementById('chart4')).resize();
            this.$echarts.init(document.getElementById('chart5')).resize();
            this.$echarts.init(document.getElementById('chart6')).resize();
            this.$echarts.init(document.getElementById('chart7')).resize();
            this.$echarts.init(document.getElementById('chart8')).resize();
        };
        window.addEventListener('resize', this.resizefun);
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        window.removeEventListener('resize', this.resizefun);
    }
};
</script>