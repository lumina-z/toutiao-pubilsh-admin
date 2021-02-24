/**
 * 用户请求模块
 */
import request from '@/utils/request.js'

 //用户登录
export const login = (data) => {
    return request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data
    })
}

 //获取用户请求数据
export const getUserProfile = () => {
    //const user = JSON.parse(window.localStorage.getItem('user'))
    return request({
        method: 'GET',
        url: '/mp/v1_0/user/profile'
        //axois 可以通过header 选项设置请求头
        // headers: {
        //     //属性名和值都要看接口文档
        //     //Authorization: 'Bearer ' +user.token 
        //     Authorization: `Bearer ${user.token}`  //es6的字符串拼接
        // }        在拦截器中统一设置
    })
}

 //修改用户数据
 export const updateUser = () => {

 }