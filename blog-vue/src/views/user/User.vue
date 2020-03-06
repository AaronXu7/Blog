<template>
  <div id="user">
      <login v-if="showLogin === true" @closeLogin="closeLogin"/>
      <user-info :userName="userName" @toNew="toNew"/>
      <blog-item v-for="item in userBlog" :key="item.index" :Info="item"/>
      <new-blog :isShow="isShow" @close="close"/>
  </div>
</template>

<script>
import {
    postNewBlog,
    postLogin,
    getCheck
} from 'network/user.js'
import { getSomeBlog } from 'network/home'

import Login from './childCpn/Login'
import NewBlog from './childCpn/NewBlog'
import BlogItem from 'content-cpn/blogItem/BlogItem'
import UserInfo from './childCpn/UserInfo'

export default {
    name:'User',
    data(){
      return {
        showLogin:false,
        userBlog:[],
        userName:'请登录',
        isShow:false,
        Login:false
      }
    },
    components:{
      UserInfo,
      NewBlog,
      BlogItem,
      Login
    },
    created(){
      getCheck().then(res => {
        if(res.data.username){
          this.showLogin = false
          this.Login = true
          this.userName = res.data.realname
          getSomeBlog(res.data.realname).then(res => {
              this.userBlog = res.data.data
          })
        }else{
          this.showLogin = true
        }
      })
    },
    methods:{
      closeLogin(data){
        this.showLogin = false;
        this.userBlog = data;
        if(data[0].author){
          this.userName = data[0].author
        }
      },
      toNew(){
        this.isShow = true
      },
      close(){
        this.isShow = false
      }
    }
}
</script>

<style lang="less">
  #user{
  }
</style>