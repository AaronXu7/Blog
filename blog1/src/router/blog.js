const { 
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')
const { SuccessModel,ErrorModel } = require('../model/resModel')

const loginCheck = (req) => {
    if(!req.session.username){
        return Promise.resolve(
            new ErrorModel('err',req.session)
        )
    }
}

const handleBlogRouter = (req,res) => {
    const method = req.method
    const id = req.query.id
    // 获取博客列表
    if(method === 'GET' && res.path === '/api/blog/list'){
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        // const listData = getList(author,keyword)
        // return new SuccessModel(listData)
        const result = getList(author,keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if(method === 'GET' && res.path === '/api/blog/detail'){
        const result = getDetail(id)
        return result.then(detailData => {
            return new SuccessModel(detailData)
        })
        
    }

    // 新建博客
    if(method === 'POST' && res.path === '/api/blog/new'){
        // 验证登录
        const loginResult = loginCheck(req)
        if(loginResult){
            return loginResult
        }
        req.body.author = req.session.realname
        const result = newBlog(req.body)
        return result.then(newData => {
            return new SuccessModel(newData)
        })
    }

    // 更新博客
    if(method === 'POST' && res.path === '/api/blog/update'){
        // 验证登录
        const loginResult = loginCheck(req)
        if(loginResult){
            return loginResult
        }
        const result = updateBlog(id,req.body)
        return result.then(val => {
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('更新博客失败')
            }
        })
    }
    // 删除博客
    if(method === 'POST' && res.path === '/api/blog/del'){
        // 验证登录
        const loginResult = loginCheck(req)
        if(loginResult){
            return loginResult
        }
        req.body.author = req.session.realname
        const result = delBlog(id,req.body.author)
        return result.then(val => {
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('删除博客失败')
            }
        })
    }
}

module.exports = handleBlogRouter