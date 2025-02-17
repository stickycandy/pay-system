import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/homePage',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Container.vue'),
            children: [
                {
                    path: '/homePage',
                    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/homePage'),
                    meta: { title: '后台管理首页' }
                },
                {
                    path: '/collectionOrder',
                    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/collectionOrder'),
                    meta: { title: '收款订单' }
                },
                {
                    path: '/historyOrder',
                    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/historyOrder'),
                    meta: { title: '历史订单' }
                },
                {
                    path: '/merchantManagement',
                    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/merchantManagement'),
                    meta: { title: '商户管理' },
                    redirect: '/businessListings',
                    children: [
                        {
                            path: '/businessListings',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/merchantManagement/businessListings'),
                            meta: { title: '商户列表', activeMenu: 'merchantManagement' },
                        },
                        {
                            path: '/businessSetings',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/merchantManagement/businessSetings'),
                            meta: { title: '商户组设置' ,activeMenu: 'merchantManagement'},
                        },
                        {
                            path: '/financialDetails',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/merchantManagement/financialDetails'),
                            meta: { title: '资金明细', activeMenu: 'merchantManagement' },
                        },
                        {
                            path: '/paymentStatistics',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/merchantManagement/paymentStatistics'),
                            meta: { title: '支付统计', activeMenu: 'merchantManagement'},
                        },
                    ]
                },
                {
                    path: '/paymentInterface',
                    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/paymentInterface'),
                    meta: { title: '通道管理' },
                    redirect: '/paymentChannel',
                    children: [
                        {
                            path: '/paymentChannel',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/paymentInterface/paymentChannel'),
                            meta: { title: '支付通道', activeMenu: 'paymentInterface' },
                        },
                        {
                            path: '/paymentMethod',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/paymentInterface/paymentMethod'),
                            meta: { title: '支付方式' ,activeMenu: 'paymentInterface'},
                        },
                        {
                            path: '/paymentPlugin',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/paymentInterface/paymentPlugin'),
                            meta: { title: '支付插件', activeMenu: 'paymentInterface' },
                        },
                        {
                            path: '/paymentChannelPolling',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/paymentInterface/paymentChannelPolling'),
                            meta: { title: '支付通道轮询', activeMenu: 'paymentInterface'},
                        },
                        {
                            path: '/officialAccountApplet',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/paymentInterface/officialAccountApplet'),
                            meta: { title: '公众号小程序', activeMenu: 'paymentInterface'},
                        },
                    ]
                },
                {
                    path: '/systemSettings',
                    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/systemSettings'),
                    meta: { title: '系统设置' },
                    redirect: '/websiteInformation',
                    children: [
                        {
                            path: '/websiteInformation',
                            component: () => import(/* webpackChunkName: "websiteInformation" */ '@/views/systemSettings/websiteInformation'),
                            meta: { title: '网站信息配置', activeMenu: 'websiteInformation' },
                        },
                        {
                            path: '/blacklistManagement',
                            component: () => import(/* webpackChunkName: "blacklistManagement" */ '@/views/systemSettings/blacklistManagement'),
                            meta: { title: '黑名单管理', activeMenu: 'blacklistManagement' },
                        },
                        {
                            path: '/changePwd',
                            component: () => import(/* webpackChunkName: "changePwd" */ '@/views/systemSettings/changePwd/index'),
                            meta: { title: '修改密码', activeMenu: 'changePwd' },
                        },
                        {
                            path: '/paymentRelated',
                            component: () => import(/* webpackChunkName: "paymentRelated" */ '@/views/systemSettings/paymentRelated'),
                            meta: { title: '支付相关配置', activeMenu: 'paymentRelated' },
                        },
                        {
                            path: '/settlementRules',
                            component: () => import(/* webpackChunkName: "settlementRules" */ '@/views/systemSettings/settlementRules'),
                            meta: { title: '结算规则配置', activeMenu: 'settlementRules' },
                        },
                        {
                            path: '/enterprisePayment',
                            component: () => import(/* webpackChunkName: "enterprisePayment" */ '@/views/systemSettings/enterprisePayment'),
                            meta: { title: '企业支付配置', activeMenu: 'enterprisePayment' },
                        },
                        {
                            path: '/quickLogin',
                            component: () => import(/* webpackChunkName: "quickLogin" */ '@/views/systemSettings/quickLogin'),
                            meta: { title: '快捷登录配置', activeMenu: 'quickLogin' },
                        },
                        {
                            path: '/messageReminder',
                            component: () => import(/* webpackChunkName: "messageReminder" */ '@/views/systemSettings/messageReminder'),
                            meta: { title: '消息提醒配置', activeMenu: 'messageReminder' },
                        },
                        {
                            path: '/realNameAuthentication',
                            component: () => import(/* webpackChunkName: "realNameAuthentication" */ '@/views/systemSettings/realNameAuthentication'),
                            meta: { title: '实名认证配置', activeMenu: 'realNameAuthentication' },
                        },
                        {
                            path: '/homepageTemplate',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/systemSettings/homepageTemplate'),
                            meta: { title: '首页模版配置', activeMenu: 'homepageTemplate' },
                        },
                        {
                            path: '/emailAndSms',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/systemSettings/emailAndSms'),
                            meta: { title: '邮箱与短信配置', activeMenu: 'emailAndSms' },
                        },
                        {
                            path: '/announcementAndLayout',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/systemSettings/announcementAndLayout'),
                            meta: { title: '公告与排版配置', activeMenu: 'announcementAndLayout' },
                        },
                        {
                            path: '/logoSetting',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/systemSettings/logoSetting'),
                            meta: { title: 'LOGO设置配置', activeMenu: 'logoSetting' },
                        },
                        {
                            path: '/ipAddress',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/systemSettings/ipAddress'),
                            meta: { title: 'IP地址配置', activeMenu: 'ipAddress' },
                        },
                        {
                            path: '/taskPlan',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/systemSettings/taskPlan'),
                            meta: { title: '任务计划配置', activeMenu: 'taskPlan' },
                        },
                        {
                            path: '/transferAgent',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/systemSettings/transferAgent'),
                            meta: { title: '中转代理', activeMenu: 'transferAgent' },
                        },
                        {
                            path: '/h5Wxkf',
                            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/systemSettings/h5Change'),
                            meta: { title: 'H5跳转微信客服', activeMenu: 'h5Wxkf' },
                        }
                    ]

                },
                {
                    path: '/otherSetting',
                    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/otherSetting/index'),
                    meta: { title: '其他功能' },
                    redirect: '/exportOrder',
                    children: [
                        {
                            path: '/exportOrder',
                            component: () => import(/* webpackChunkName: "exportOrder" */ '@/views/otherSetting/exportOrder'),
                            meta: { title: '导出订单', activeMenu: 'exportOrder' },
                        },
                        {
                            path: '/otherEnterprisePayment',
                            component: () => import(/* webpackChunkName: "otherEnterprisePayment" */ '@/views/otherSetting/otherEnterprisePayment'),
                            meta: { title: '企业付款', activeMenu: 'otherEnterprisePayment' },
                        },
                        {
                            path: '/paymentRecords',
                            component: () => import(/* webpackChunkName: "paymentRecords" */ '@/views/otherSetting/paymentRecords'),
                            meta: { title: '付款记录', activeMenu: 'paymentRecords' },
                        },
                        {
                            path: '/loginLog',
                            component: () => import(/* webpackChunkName: "loginLog" */ '@/views/otherSetting/loginLog'),
                            meta: { title: '登录日志', activeMenu: 'loginLog' },
                        },
                        {
                            path: '/dataCleansing',
                            component: () => import(/* webpackChunkName: "dataCleansing" */ '@/views/otherSetting/dataCleansing'),
                            meta: { title: '数据清理', activeMenu: 'dataCleansing' },
                        },
                        {
                            path: '/userID',
                            component: () => import(/* webpackChunkName: "userID" */ '@/views/otherSetting/userID'),
                            meta: { title: '用户标识', activeMenu: 'userID' },
                        }
                    ]
                },
                {
                    path: '/websiteInformation',
                    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/systemSettings/websiteInformation'),
                    meta: { title: '网站信息配置' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
