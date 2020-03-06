import { debounce } from 'common/js/utils.js'
import BackTop from 'content-cpn/backTop/BackTop'

export const itemImgListenerMixin = {
    mounted(){
    // 监听图片加载
        const refresh = debounce(this.$refs.scroll.refresh,50)
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on('imgLoad',this.itemImgListener)
    },
    deactivated(){
    //离开时关闭当前页面监听 
      this.$bus.$off('imgLoad',this.itemImgListener)
    }
}

export const backTop = {
    components:{
      BackTop
    },
    data(){
        return {
            showBackTop:false,
            topA:false
        }
    },
    methods:{
      backTop(){
        this.topA = true
        this.$refs.scroll.scrollTo(0,0,1000)
        setTimeout(()=>{
          this.topA = false
        },500)
      },
      showBack(pos){
        this.showBackTop = (-pos.y) > 500
      }
    }
}