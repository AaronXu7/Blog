const { login } = require('../controller/user')
const { SuccessModel,ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req,res) => {
    const method = req.method

    // 登录
    if(method === 'POST' && res.path === '/api/user/login'){
        const { username,password } = req.body
        const result = login(username,password)
        return result.then(data =>{
            if(data.username){
                req.session.username = data.username;
                req.session.realname = data.realname;
                // 同步到redis
                set(req.sessionId, req.session)
                return new SuccessModel(req.session)
            }else{
                return new ErrorModel('密码错误')
            }
        })
    }
    
    // 登录验证
    if(method === 'GET' && res.path === '/api/user/check'){
        return promise = new Promise((resolve,reject) => {
            resolve(req.session)
        })
    }
}

module.exports = handleUserRouter