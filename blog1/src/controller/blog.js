const { exec } = require('../db/mysql')

// 获取博客列表数据
const getList = (author,keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql += `and author='${author}' `
    }
    if(keyword){
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`
    return exec(sql)
}

// 获取博客详情数据
const getDetail = (id) => {
    let sql = `select * from blogs where id='${id}'`
    return exec(sql).then(arr => {
        return arr[0]
    })
}

// 添加新的博客内容
const newBlog = (newData = {}) => {
    // 更新的id
    // 一个博客的对象，包括title、content属性
    const title = newData.title;
    const content = newData.content;
    const author = newData.author;
    const createtime = Date.now();

    const sql = `
        insert into blogs(title,content,createtime,author) values ('${title}','${content}',${createtime},'${author}');
    `
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

// 更新博客
const updateBlog = ((id,updateData = {}) => {
    // 一个博客的对象，包括title、content属性
    const title = updateData.title;
    const content = updateData.content;

    const sql = `
        update blogs set title='${title}', content='${content}' where id="${id}"
    `
    return exec(sql).then(updateData => {
        if(updateData.affectedRows > 0){
            return true
        }else{
            return false
        }
    })
})

// 删除博客
const delBlog = (id,author) => {
    const sql = `delete from blogs where id='${id}' and author='${author}';` 
    return exec(sql).then(delData => {
        if(delData.affectedRows > 0){
            return true
        }else{
            return false
        }
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}