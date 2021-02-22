/**
 * 基于 axios 的请求模块
 */
import axios from 'axios'
//创建axois实例
//通过实例发送请求,把需要的配置发送给这个实例
const request = axios.create({
    //baseURL: 'ttapi.research.itcast.cn/'//请求的基础路径
    baseURL: 'http://api-toutiao-web.itheima.net'
})


//请求拦截器

//响应拦截器

//导出请求包
export default request