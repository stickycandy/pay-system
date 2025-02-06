import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import baseconfig from '../baseconfig';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import 'babel-polyfill';

Vue.config.productionTip = false;
Vue.use(ElementUI, {
    size: 'small'
});


function thousandsSeparator(value) {
    // Check if the value is a number
    if (value === null || value === undefined) return ''
    
    // Convert to number and check if it's a valid number
    const num = Number(value)
    if (isNaN(num)) return value
  
    // Use toLocaleString to add thousands separators
    return num.toLocaleString('en-US')
  }

import * as echarts from 'echarts';

Vue.filter('thousandsSeparator', thousandsSeparator)
Vue.prototype.$echarts = echarts;
// 设置全局属性
Vue.prototype.$apiDomain = baseconfig.apiDomain;


// //使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    // const role = localStorage.getItem('ms_username');
    // if (!role && to.path !== '/login') {
    //     next('/login');
    // } else if (to.meta.permission) {
    //     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    //     role === 'admin' ? next() : next('/403');
    // } else {
    //     // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    //     if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
    //         Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
    //             confirmButtonText: '确定'
    //         });
    //     } else {
    //         next();
    //     }
    // }
    next();
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
