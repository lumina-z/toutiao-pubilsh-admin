/**
 * 基于 axios 的请求模块
 */
import axios from 'axios'
import JSONbig from 'json-bigint'
//创建axois实例
//通过实例发送请求,把需要的配置发送给这个实例
const request = axios.create({
    //baseURL: 'ttapi.research.itcast.cn/'//请求的基础路径
    baseURL: 'http://api-toutiao-web.itheima.net',

    //定制后端返回的原始数据的处理
    /**
     * data 后端返回的原始数据(未经处理的JSON字符串)
     */
    transformResponse: [function (data) {
        // Do whatever you want to transform the data
        try {
            return JSONbig.parse(data);

        } catch (error) {
            return data;
        }
    }],
})


//请求拦截器
request.interceptors.request.use((config) => {
    //所有请求会经过这里
    //config 是当前请求的配置信息对象
    //console.log(config);
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
}, (error) => {

    //请求失败在这里
    return Promise.reject(error)
})

//响应拦截器

//导出请求包
export default request