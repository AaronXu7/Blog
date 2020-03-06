<template>
  <div id="app">
    <menu-list/>
    <router-view  v-if="isRouterAlive"/>
    <background/>
  </div>
</template>

<script>
import Background from 'content-cpn/bg/Background'
import MenuList from 'content-cpn/menu/MenuList'

export default {
  name:'App',
  components:{
    Background,
    MenuList
  },
  provide (){
     return {
       reload:this.reload
     }
  },
  data(){
    return {
       isRouterAlive:true
    }
  },
  methods:{
    reload (){
       this.isRouterAlive = false
       this.$nextTick(function(){
          this.isRouterAlive = true
       })
    }
  }
}
</script>>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // overflow: hidden;
  // height: 100vh;
}
</style>
