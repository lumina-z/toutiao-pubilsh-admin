
import axios from 'axios'
import JSONbig from 'json-bigint'

/**
 * 配置mock的请求 
 */
const requestMock = axios.create({
    baseURL: '/user',

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
export default requestMock