import {request} from './request'

export function getSomeBlog(author,keyword){
    return request({
        url:'/blog/list',
        params:{
            author,
            keyword
        }
    })
}