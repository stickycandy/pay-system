<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#2463EB" unique-opened router>
            <div class="user-img">
                <img src="https://jiu.shouxuanzp.cn/assets/img/logo.png" alt="" />
            </div>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <img :src="item.icon" alt="图标" />
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.title">{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <img v-if="onRoutes == item.index" :src="item.iconActive" alt="图标" />
                        <img v-else :src="item.icon" alt="图标" />
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '@/utils/bus.js';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    index: 'homePage',
                    title: '平台首页',
                    icon: require('../../assets/img/Sidebar/index_icon.png'),
                    iconActive: require('../../assets/img/Sidebar/index_icon_active.png')
                },
                {
                    index: 'collectionOrder',
                    title: '收款订单',
                    icon: require('../../assets/img/Sidebar/collection_order_icon.png'),
                    iconActive: require('../../assets/img/Sidebar/collection_order_icon_active.png')
                },
                {
                    index: 'historyOrder',
                    title: '历史订单',
                    icon: require('../../assets/img/Sidebar/collection_order_icon.png'),
                    iconActive: require('../../assets/img/Sidebar/collection_order_icon_active.png')
                },
                {
                    index: 'merchantManagement',
                    title: '商户管理',
                    icon: require('../../assets/img/Sidebar/merchant_management_icon.png'),
                    iconActive: require('../../assets/img/Sidebar/merchant_management_icon_active.png')
                },
                {
                    index: 'paymentInterface',
                    title: '支付接口',
                    icon: require('../../assets/img/Sidebar/payment_interface_icon.png'),
                    iconActive: require('../../assets/img/Sidebar/payment_interface_icon_active.png')
                },
                {
                    index: 'systemSettings',
                    title: '系统设置',
                    icon: require('../../assets/img/Sidebar/system_settings_icon.png'),
                    subs: [
                        {
                            index: 'websiteInformation',
                            title: '网站信息配置'
                        },
                        {
                            index: 'blacklistManagement',
                            title: '黑名单管理'
                        },
                        {
                            index: 'paymentRelated',
                            title: '支付相关配置'
                        },
                        {
                            index: 'settlementRules',
                            title: '结算规则配置'
                        },
                        {
                            index: 'enterprisePayment',
                            title: '企业支付配置'
                        },
                        {
                            index: 'quickLogin',
                            title: '快捷登录配置'
                        },
                        {
                            index: 'messageReminder',
                            title: '消息提醒配置'
                        },
                        // {
                        //     index: 'realNameAuthentication',
                        //     title: '实名认证配置'
                        // },
                        // {
                        //     index: 'websiteAnnouncementConfiguration',
                        //     title: '网站公告配置'
                        // },
                        // {
                        //     index: 'homepageTemplate',
                        //     title: '首页模版配置'
                        // },
                        // {
                        //     index: 'emailAndSms',
                        //     title: '邮箱与短信配置'
                        // },
                        {
                            index: 'h5Wxkf',
                            title: 'H5跳转微信客服支付'
                        }
                    ]
                },
                {
                    index: 'otherSetting',
                    title: '其他功能',
                    icon: require('../../assets/img/Sidebar/other_functions_icon.png'),
                    subs: [
                        {
                            index: 'exportOrder',
                            title: '导出订单'
                        },
                        {
                            index: 'otherEnterprisePayment',
                            title: '企业付款'
                        },
                        {
                            index: 'paymentRecords',
                            title: '付款记录'
                        },
                        // {
                        //     index: 'riskControlRecords',
                        //     title: '风控记录'
                        // },
                        {
                            index: 'loginLog',
                            title: '登录日志'
                        },
                        {
                            index: 'dataCleansing',
                            title: '数据清理'
                        },
                        // {
                        //     index: 'accountingRules',
                        //     title: '分账规则'
                        // },
                        // {
                        //     index: 'separateAccountRecords',
                        //     title: '分账记录'
                        // },
                        {
                            index: 'userID',
                            title: '用户标识'
                        },
                    ]
                },
                // {
                //     index: 'other',
                //     title: '其他',
                //     icon: require('../../assets/img/Sidebar/exit_icon.png')
                // }
            ]
        };
    },
    computed: {
        onRoutes() {
            if (this.$route.meta.activeMenu) {
                return this.$route.meta.activeMenu;
            } else {
                return this.$route.path.replace('/', '');
            }
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style lang="less" scoped>
.sidebar {
    // width: 200px;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
    background: #2463eb;
}
.user-img {
    display: flex;
    justify-content: center;
    margin: 40px 0 21px;
    img {
        width: 54px;
        // height: 54px;
        border-radius: 5px;
    }
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
    // margin-left: 20px;
}
.sidebar > ul {
    height: 100%;
}
.el-menu {
    border: 0 !important;
    padding: 0 20px;
    .el-menu-item {
        height: 42px;
        line-height: 42px;
        border-radius: 4px;
        color: #ffffff;
        font-size: 16px;
        img {
            margin-right: 8px;
        }
    }
    .el-menu-item.is-active {
        color: #2463eb;
        background: #ffffff !important;
    }
    /deep/.el-submenu__title {
        height: 42px;
        line-height: 42px;
        color: #ffffff !important;
        font-size: 16px;
        img {
            margin-right: 8px;
        }
        i {
            color: #d8d8d8;
            font-size: 14px;
        }
        .el-submenu__icon-arrow {
            right: 8px;
        }
    }
    .el-submenu {
        .el-menu-item {
            min-width: auto;
        }
    }
}
</style>
