<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <slot name="brand"></slot>
        <button class="navbar-toggler border-0 text-white" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-list-ul fa-lg"></i>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <slot name="link"></slot>
            </ul>
            <form class="form-inline my-2 my-lg-0 justify-content-end">
                <input class="form-control mr-sm-2" type="search" placeholder="搜索标题关键词"  v-model="seach" aria-label="Search">
                <button class="btn my-2 my-sm-0" type="submit" @click.prevent="toSearch">Search</button>
            </form>
        </div>
    </nav>
</template>

<script>
export default {
    name:'Navbar',
    data(){
        return {
            seach:''
        }
    },
    methods:{
        toSearch(){
            console.log(this.seach);
            this.$router.push('/search/' + this.seach)
            
        }
    }
}
</script>

<style lang="less">
</style>