<template>
    <div class="user-info">
        <div class="btn-group dropdown">
            <h2><i class="fas fa-hat-cowboy"></i>{{userName}}</h2>
            <button type="button" class="btn dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
            <div class="dropdown-menu">
            <div class="list" @click="toNew">
                <i class="fas fa-file-alt"></i>新建博客
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'UserInfo',
    props:{
        userName:{
            type:String,
            default(){
                return ''
            }
        }
    },
    methods:{
        toNew(){
            this.$emit('toNew')
        }
    }
}
</script>

<style lang="less">
    .user-info{
      padding: 2rem;
      background-color: #fff;
      h2{
        color: @main-color;
        padding-right: .5rem;
      }
      .btn{
        color: @main-color;
      }
      .list{
        cursor: pointer;
        text-align: center;
        color: @main-color;
      }
    }
</style>