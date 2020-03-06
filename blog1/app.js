const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { set,get } = require('./src/db/redis')

// session数据
// const SESSION_DATA = {};

// 获取cookie过期时间
const getCookieExpires = () => {
    const date = new Date();
    date.setTime(date.getTime() + (72 * 60 * 60 * 1000));
    return date.toGMTString();
}

// 用于处理POST数据
const getPostData = (req) => {
    const post = new Promise((resolve,reject) => {
        if(req.method !== 'POST'){
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if(!postData){
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return post
}

const serverHandle = (req,res) => {
    // 设置返回格式为JSON
    res.setHeader('Content-Type', 'application/json; charset=utf-8')

    // 获取path
    const url = req.url
    res.path = url.split('?')[0]

    // 解析query
    req.query = querystring.parse(url.split('?')[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    // 解析session
    // let needSetCookie = false;
    // let userId = req.cookie.userId;
    // if(userId){
    //     if(!SESSION_DATA[userId]){
    //         SESSION_DATA[userId] = {};
    //     }
    // }else{
    //     needSetCookie = true;
    //     userId = `${Date.now()}_${Math.random()}`;
    //     SESSION_DATA[userId] = {};
    // }
    // req.session = SESSION_DATA[userId];
    let needSetCookie = false
    let userId = req.cookie.userid
    if (!userId) {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        // 初始化 redis 中的 session 值
        set(userId, {})
    }
    // 处理post数据
    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            // 初始化 redis 中的 session 值
            set(req.sessionId, {})
            // 设置 session
            req.session = {}
        } else {
            // 设置 session
            req.session = sessionData
        }

        // 处理 post data
        return getPostData(req)
    })
    .then(postData => {
        req.body = postData
        // 处理blog路由
        // const blogData = handleBlogRouter(req,res)
        // if(blogData){
        //     res.end(JSON.stringify(blogData))
        //     return
        // }
        const blogResult = handleBlogRouter(req,res)
        if(blogResult){
            blogResult.then(blogData => {
                // 操作cookie
                if(needSetCookie){
                    res.setHeader('Set-cookie',`userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }


        // 处理user路由
        const userResult = handleUserRouter(req,res)
        if(userResult){
            userResult.then(userData => {
                // 操作cookie
                if(needSetCookie){
                    res.setHeader('Set-cookie',`userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userData))
            })
            return
        }

        // 未命中路由返回404
        res.writeHead(404,{'Context-type':'text/plain'})
        res.write('404 Not Found\n')
        res.end()
    })

}

module.exports = serverHandle