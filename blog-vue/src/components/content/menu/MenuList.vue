<template>
    <navbar>
        <template v-slot:brand>
            <a class="navbar-brand text-white" href="#">
                <i class="far fa-smile fa-lg"></i>
                Hello Blog！
            </a>
        </template>
        <template v-slot:link>
            <menu-item path='/home' itemName="首页"/>
            <menu-item path='/user' itemName="个人主页"/>
        </template>
    </navbar>
</template>

<script>
import Navbar from 'common-cpn/navbar/Navbar'
import MenuItem from 'content-cpn/menu/MenuItem'

export default {
    name:'MenuList',
    components:{
        Navbar,
        MenuItem
    }
}
</script>

<style lang="less">
    .navbar{
        background-color: transparent;
        .active>.nav-link{
            color:@cp-color!important;
        }
        .btn{
            color:@cp-color;
            border: @cp-color 1px solid;
            &:hover{
                color:#fff;
                border-color:#fff;
            }
        }
    }
</style>