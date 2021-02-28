const fs = require('fs')
const path = require('path')
const JSON5 = require('json5')
const Mock = require('mockjs')


function getJsonFile(filePath) {
    let json = fs.readFileSync(path.join(__dirname, './userInfo.json5'), 'utf-8');
    //console.log(json);

    return JSON5.parse(json);
    //console.log(obj);
}

module.exports = (app) => {
    if (process.env.MOCK == 'true') {
        app.get('/user/userInfo', (rep, res) => {
            let json = getJsonFile('./user/userInfo')
            res.json(Mock.mock(json))
        })
    }

}