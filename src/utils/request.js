import axios from 'axios';
import Vue from 'vue';
import baseConfig from '../../baseconfig';
import qs from 'qs';

// 辅助函数：将对象转换为查询字符串
const object2query = (data) => 
     qs.stringify(data, { 
      indices: false,  // 数组不使用索引
      allowDots: true  // 支持嵌套对象
    });


const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000,
    baseURL: process.env.NODE_ENV === 'development' ? '' : '', // baseConfig.apiDomain, // 自动拼接域名
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

service.interceptors.request.use(
    config => {
        // config.headers['Referer'] = 'https://jiu.shouxuanzp.cn/admin/order.php?pageSize=30&pageNumber=1&column=trade_no&type=0&dstatus=-1';
        return {
            ...config,
            transformRequest: [
                function (data, headers) {
                  // 依自己的需求对请求数据进行处理
                    return object2query(data);
                },
              ],
        };
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (typeof response.data === 'string' && response.data.includes('/login.php')) {
            window.location.replace('/newadmin/#/login');
            return response.data;
        }

        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);


Vue.prototype.$axios = service;

export default service;
