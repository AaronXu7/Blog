<template>
    <form id="login">
        <div class="form-group">
            <label for="username">账号</label>
            <input type="text" class="form-control" id="username" v-model="username">
        </div>
        <div class="form-group">
            <label for="password">密码</label>
            <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <button type="submit" class="btn" @click.prevent="toLogin">登录</button>
        <div class="tips" v-if="isWrong">
            <p class="h6 text-center">登录失败</p>
            <p class="h6">请重新输入正确的账号和密码！</p>
        </div>
    </form>
</template>

<script>
import { postLogin } from 'network/user.js'
import { getSomeBlog } from 'network/home'

export default {
    name:'Login',
    data(){
        return {
            username:'',
            password:'',
            isWrong:false
        }
    },
    methods:{
        toLogin(){
            postLogin(this.username,this.password).then(res => {
                if(res.data.errnum === 0){
                    getSomeBlog(res.data.data.realname).then(res => {
                        this.$emit('closeLogin',res.data.data)
                    })
                }else{
                    this.isWrong = true
                    setTimeout(()=>{
                        this.isWrong = false
                    },1500)
                }
            })
        }
    }
}
</script>

<style lang="less">
    #login{
        width: 40vw;
        max-width: 420px;
        .box-window;
    }
</style>