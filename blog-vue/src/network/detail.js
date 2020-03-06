import {request} from './request'

export function getBlog(id){
    return request({
        url:'/blog/detail',
        params:{
            id
        }
    })
}