<template>
    <form id="edit" :class="{'hide-window':!isShow}">
        <div class="form-group">
            <label for="editTitle">标题名</label>
            <input type="email" class="form-control" id="editTitle" v-model="editContent.title">
        </div>
        <div class="form-group">
            <label for="editTextarea">文章内容</label>
            <textarea class="form-control" id="editTextarea" v-model="editContent.content" rows="10"></textarea>
        </div>
        <div class="close-window" @click="close">
            <i class="far fa-times-circle fa-2x"></i>
        </div>
        <button type="button" class="btn" @click.prevent="postEditBlog">提交</button>
    </form>
</template>

<script>
import {
    postEditBlog
} from 'network/user.js'

export default {
    name:'EditBlog',
    inject:['reload'],
    props:{
        isShow:{
            type:Boolean,
            default:false
        },
        editContent:{
            type:Object,
            default(){
                return {
                    title:'',
                    content:'',
                    id:''
                }
            }
        }
    },
    methods:{
        postEditBlog(){
            postEditBlog(this.editContent.id,this.editContent.title,this.editContent.content).then(res => {
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
    #edit{
        width: 70vw;
        .box-window;
        @media (max-width: 1024px) {
            width: 90vw;
        }
    }
</style>