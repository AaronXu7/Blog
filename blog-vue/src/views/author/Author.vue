<template>
  <div class="author">
      <div class="author-info">
          <h2 class="text-white">作者：{{author}}</h2>
      </div>
      <blog-item v-for="item in authorList" :key="item.index" :Info="item"/>
  </div>
</template>

<script>
import { getSomeBlog } from 'network/home'

import BlogItem from 'content-cpn/blogItem/BlogItem'

export default {
    name:'Author',
    components:{
        BlogItem
    },
    data(){
        return {
            author:null,
            authorList:[]
        }
    },
    created(){
        this.author = this.$route.params.author;
        this.getSomeBlog()
    },
    methods:{
        getSomeBlog(){
            getSomeBlog(this.author).then(res => {
                this.authorList = res.data.data
            })
        }
    }
}
</script>

<style lang="less">
    .author{
        .author-info{
            padding: 1rem 0;
        }
    }
</style>