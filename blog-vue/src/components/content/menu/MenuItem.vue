<template>
    <li class="nav-item" :class="{active:isActive}" @click="itemClick">
        <a class="nav-link" :class="{'text-white':!isActive}">{{itemName}}</a>
    </li>
</template>

<script>
export default {
    name:'MenuItem',
    props:{
        path:String,
        itemName:{
            type:String,
            default(){
                return ''
            }
        }
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path) !== -1
        }
    },
    methods:{
        itemClick(){
            if(this.path !== undefined && this.$route.path != this.path){
                this.$router.replace(this.path)
            }
        }
    }
}
</script>

<style>
    .nav-item{
        cursor: pointer;
    }
</style>