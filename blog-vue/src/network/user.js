import {request} from './request'

// 添加新文章
export function postNewBlog(title,content){
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        transformRequest: [function(data) {
            data = JSON.stringify(data)
            return data
        }],
        method: 'post',
        url: '/blog/new',
        data: {
            title,
            content
        }
    })
}

// 更新文章
export function postEditBlog(id,title,content){
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        transformRequest: [function(data) {
            data = JSON.stringify(data)
            return data
        }],
        method: 'post',
        url:'/blog/update?id=' + id,
        data:{
            title,
            content
        }
    })
}

// 删除文章
export function delBlog(id){
    return request({
        method: 'post',
        url:'/blog/del?id=' + id
    })
}

// 登录
export function postLogin(username,password){
    return request({
        headers: {
            'Content-Type': 'application/json'
        },
        transformRequest: [function(data) {
            data = JSON.stringify(data)
            return data
        }],
        method:'post',
        url:'/user/login',
        data:{
            "username":username,
            "password":password
        }
    })
}

// 登录验证
export function getCheck(){
    return request({
        url:'/user/check'
    })
}