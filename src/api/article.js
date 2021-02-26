/**
 * 文章请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 */
export const getArticles = (params) =>{
    return request({
        method: 'GET',
        url: '/mp/v1_0/articles',
        //Body 参数用 data 设置
        //Query 参数使用 params 设置
        //Heders 参数使用 Heders 设置
        params
    })
}

/**
 * 获取文章列表频道数据
 */
export const getArticleChannels = () =>{
    return request({
        method: 'GET',
        url: '/mp/v1_0/channels',
    })
}

/**
 * 删除文章
 */
export const delArticle = (articleId) =>{
    return request({
        method: 'DELETE',
        url: `/mp/v1_0/articles/${articleId}`,
    })
}