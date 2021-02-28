// 使用 Mock
const Mock = require('mockjs')
let obj = Mock.mock({
    id: '@id',
    name: '@cname',
    image: "@image('200x100', '#50B347', '#FFF', 'Mock.js')",
    date: "@now()",
    color: "@color()"
})
// 输出结果
console.log(obj)