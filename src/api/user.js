/**
 * 用户请求模块
 */
import request from '@/utils/request.js'

 //用户登录
export const login = (data) => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

 //获取用户请求数据
export const getUserInfd = () => {

}

 //修改用户数据
 export const updateUser = () => {

 }