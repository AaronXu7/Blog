<template>
    <form id="new" :class="{'hide-window':!isShow}">
        <div class="form-group">
            <label for="newTitle">标题名</label>
            <input type="email" class="form-control" id="newTitle" v-model="title" placeholder="请填写新文章的标题">
        </div>
        <div class="form-group">
            <label for="newTextarea">文章内容</label>
            <textarea class="form-control" id="newTextarea" v-model="content" placeholder="请填写新文章的内容" rows="10"></textarea>
        </div>
        <div class="close-window" @click="close">
            <i class="far fa-times-circle fa-2x"></i>
        </div>
        <button type="button" class="btn" @click.prevent="postNewBlog">提交</button>
    </form>
</template>

<script>
import {
    postNewBlog
} from 'network/user.js'

export default {
    name:'NewBlog',
    inject:['reload'],
    props:{
        isShow:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            title:'',
            content:''
        }
    },
    methods:{
        postNewBlog(){
            postNewBlog(this.title,this.content).then(res => {
                this.reload();
            }).catch(err => {
                console.log('err:',err);
            })
        },
        close(){
            this.$emit('close')
        }
    }
}
</script>

<style lang="less">
    #new{
        width: 70vw;
        .box-window;
        @media (max-width: 1024px) {
            width: 90vw;
        }
    }
</style>