// 防抖函数
export function debounce(func,delay){
    let timer = null
    return function (...args){
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this,args)
        },delay)
    }
}

// 时间戳格式化
export function formatDate(date,fmt){
    if(/(Y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+' : date.getMonth() + 1,
        'D+' : date.getDate(),
        'h+' : date.getHours(),
        'm+' : date.getMinutes(),
        's+' : date.getSeconds()
    }
    for (let item in o){
        if(new RegExp(`(${item})`).test(fmt)){
            let str = o[item] + ''
            fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : leftZero(str))
        }
    }
    return fmt
}
function leftZero(str){
    return ('00' + str).substr(str.length)
}