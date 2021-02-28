import request from '@/utils/requestMock.js'

/**
 * 获取虚拟数据
 */
export const getMocksUser = () =>{
    return request({
        method: 'GET',
        url: '/userinfo',
    })
}