<template>
    <swiper :options="swiperOption" ref="mySwiper" v-if="carouselArr.length > 0">
        <swiper-slide class="swiper-slide" v-for="(item,index) in carouselArr" :key="index" ref="slide">
            <div class="card border-0">
                <div class="card-body text-left">
                    <h3 class="card-title">{{item.title}}</h3>
                    <p class="card-text">{{item.content}}</p>
                    <a class="btn" @click="toDetail(item.id)">查看全文</a>
                </div>
            </div>
            <div class="card-author text-center" @click="toAuthor(item.author)">
                <h2>{{item.author}}</h2>
            </div>
        </swiper-slide>
        <!-- 分页器 -->
        <!-- <div class="swiper-pagination"  slot="pagination"></div>    -->
        <!-- 左右箭头 --> 
        <!-- <div class="swiper-button-prev" slot="button-prev"></div> 
        <div class="swiper-button-next" slot="button-next"></div>  -->
    </swiper>
</template>

<script>
    export default {
        props:{
            carouselArr:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return {
                swiperOption:{
                    slidesPerView: 3,
                    spaceBetween: 30,
                    centeredSlides: true,
                    //自动初始化swiper
                    observer:true, 
                    observeParents:true,
                    //显示分页
                    pagination: {
                      el: '.swiper-pagination'
                    },
                    //设置点击箭头
                    navigation: {
                      nextEl: '.swiper-button-next', 
                      prevEl: '.swiper-button-prev'
                    },
                    //自动轮播
                    autoplay: {
                      delay: 3000,
                      disableOnInteraction: false,
                    },
                    //开启循环模式
                    loop: true
                }
            }
        },
        created(){
            if(window.innerWidth < 1024){
                this.swiperOption.slidesPerView = 1;
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        methods:{
            toDetail(id){
                this.$router.push('/detail/' + id)
            },
            toAuthor(author){
                this.$router.push('/author/' + author)
            }
        }
    }
</script>

<style lang="less">
    .swiper-container {
      width: 100%;
      height: 30vw;
      @media (max-width: 1024px) {
            height: 80vw;
      }
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
    
      position: relative;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
	  transition: 300ms;
      transform: scale(0.8);
    }
	.swiper-slide-active,.swiper-slide-duplicate-active{
      transform: scale(1);
      .card-author{
          height: 15%;
      }
    }
    .card{
        width: 100%;
        .card-text{
            .multi-ellipsis(3)
        }
        .btn{
            color:#fff;
            background-color: @main-color;
        }
    }
    .card-author{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
        height: 100%;
        transition: .8s;
        cursor: pointer;
        h2{
            margin: 0;
            color:#fff;
        }
    }
</style>