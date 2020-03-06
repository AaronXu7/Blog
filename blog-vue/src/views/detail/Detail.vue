<template>
    <div class="jumbotron">
        <h1 class="display-6">{{blogDetail.title}}</h1>
        <p class="lead">{{blogDetail.author}} | {{blogDetail.createtime | showDate}}</p>
        <hr class="my-4">
        <p>{{blogDetail.content}}</p>
    </div>
</template>

<script>
import { getBlog } from 'network/detail'
import { formatDate } from 'common/js/utils.js'

export default {
    name:'Detail',
    data(){
        return {
            id:null,
            blogDetail:{}
        }
    },
    created(){
        this.id = this.$route.params.id;
        this.getBlog();
    },
    filters:{
        showDate(value){
            let date = new Date(value)
            return formatDate(date,'YYYY-MM-DD hh:mm:ss')
        }
    },
    methods:{
        getBlog(){
            getBlog(this.id).then(res =>{
                this.blogDetail = res.data.data
            })
        }
    }
}
</script>

<style lang="less">
    .jumbotron{
        height: 100vh;
        background-color: rgba(255,255,255,.5);
    }
</style>