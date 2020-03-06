<template>
    <div class="search">
        <div class="search-info">
            <h2 class="text-white">标题关键词：{{keyword}}</h2>
        </div>
        <blog-item v-for="item in searchList" :key="item.index" :Info="item"/>
    </div>
</template>

<script>
import { getSomeBlog } from 'network/home'

import BlogItem from 'content-cpn/blogItem/BlogItem'

export default {
    name:'Search',
    components:{
        BlogItem
    },
    data(){
        return {
            keyword:null,
            searchList:[]
        }
    },
    created(){
        this.keyword = this.$route.params.keyword;
        this.getSomeBlog()
    },
    methods:{
        getSomeBlog(){
            getSomeBlog(null,this.keyword).then(res => {
                this.searchList = res.data.data
            })
        }
    }
}
</script>

<style lang="less">
    .search{
        .search-info{
            padding: 1rem 0;
        }
    }
</style>