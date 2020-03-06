<template>
  <div id="home">
    <h2 class="text-white mt-4">最新文章</h2>
    <div class="swiper-c">
      <swiper :carouselArr="swiperBlog"/>
    </div>
  </div>
</template>

<script>
import Swiper from 'common-cpn/swiper/Swiper'

import {
    getSomeBlog
} from 'network/home'

export default {
    name:'Home',
    components:{
      Swiper
    },
    data(){
      return{
        swiperBlog:[]
      }
    },
    created(){
      this.getSomeBlog();
    },
    methods:{
      getSomeBlog(){
        getSomeBlog().then(res => {
          this.swiperBlog = res.data.data.slice(0,6)
        }).catch(err => {
          console.log(err);
        })
      }
    }
}
</script>

<style lang="less">
  #home{
    .swiper-c{
      display: flex;
      align-items: center;
      height: 40vw;
      @media (max-width: 1600px) {
        margin-top: 5rem;
      }
      @media (max-width:1024px) {
        height: 100%;
        padding: 0 .5rem;
      }
    }
  }
</style>