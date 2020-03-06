<template>
    <div class="blog-item text-white">
        <div class="blog-info">
            <h3 @click="toDetail(Info.id)">{{Info.title}}</h3>
            <p class="h6">作者:{{Info.author}}</p>
            <p class="h6">更新时间:{{Info.createtime | showDate}}</p>
        </div>
        <div class="edit" v-if="edit">
            <button type="button" class="btn btn-primary" @click="toEdit(Info.id)"><i class="fas fa-edit"></i>编辑</button>
            <button type="button" class="btn btn-danger" @click="toDel(Info.id)"><i class="fas fa-trash-alt"></i>删除</button>
            <edit-blog :isShow="isShow" :editContent="editContent" @close="close"/>
        </div>
    </div>
</template>

<script>
import {
    delBlog
} from 'network/user.js'
import { formatDate } from 'common/js/utils.js'
import EditBlog from 'views/user/childCpn/EditBlog'

export default {
    name:'BlogItem',
    components:{
        EditBlog
    },
    inject:['reload'],
    props:{
        Info:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            edit:false,
            isShow:false,
            editContent:{
                title:'',
                content:'',
                id:''
            }
        }
    },
    filters:{
        showDate(value){
            let date = new Date(value)
            return formatDate(date,'YYYY-MM-DD hh:mm:ss')
        }
    },
    created(){
        if(this.$route.path === '/user'){
            this.edit = true
        }
        this.editContent.content = this.Info.content
        this.editContent.title = this.Info.title
        this.editContent.id = this.Info.id
    },
    methods:{
        toDetail(id){
            this.$router.push('/detail/' + id)
        },
        toDel(id){
            delBlog(id).then(res => {
                if(res.data.errnum === 0){
                    alert('删除成功')
                    this.reload()
                }
            })
        },
        close(){
            this.isShow = false
        },
        toEdit(){
            this.isShow = true
        }
    }
}
</script>

<style lang="less">
    .blog-item{
        text-align: left;
        padding: 1rem 0;
        margin: 0 1rem;
        border-bottom: 1px solid #fff;
        display: flex;
        justify-content: space-between;
        .blog-info{
            min-width:240px;
            h3{
                cursor: pointer;
                transition: .5s;
                @media (max-width: 1024px){
                    font-size:1.2rem;
                    .ellipsis;
                }
                &:hover{
                    color: @cp-color;
                }
            }
            .h6{
                color:@cp-color;
            }
            small{
                padding-left: 1rem;
            }
        }
        .edit{
            display: flex;
            justify-content: space-around;
            flex-direction: column;
        }
    }
</style>