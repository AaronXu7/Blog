<template>
  <div class="bg-sky" ref="sky">
        <canvas ref="canvas"></canvas>
        <div class="filter"></div>
  </div>
</template>

<script>
export default {
    name:'Background',
    mounted(){
        this.$refs.sky.width = window.innerWidth;
        this.$refs.sky.height = window.innerHeight;
        // 设置星星
        function Stars(id,x,y){
            this.id = id;
            this.x = x;
            this.y = y;
            this.r = Math.floor(Math.random() * 2) + 1;
            let alpha = (Math.floor(Math.random() * 2) + 1) / 10;
            this.color = `rgba(255,255,255,${alpha})`
        }
        Stars.prototype.draw = function(){this.color
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.r * 2;
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.r,0,2 * Math.PI)
            ctx.closePath();
            ctx.fill();
        }
        Stars.prototype.move = function(){
            this.y -= 1;
            if(this.y <= -10) this.y = _Height + 10;
            this.draw();
        }
        Stars.prototype.die = function(){
            stars[this.id] = null;
            delete stars[this.id];
        }
        let canvas = this.$refs.canvas,
            ctx = canvas.getContext("2d"),
            _Width = this.$refs.sky.width,
            _Height = this.$refs.sky.height,
            stars = [],
            initStarsAmount = 60;
        function setSize(){
            canvas.setAttribute('width',_Width);
            canvas.setAttribute('height',_Height);
        }
        setSize();
        initStars();
        
        // 生成星星动画
        function initStars(){
            ctx.strokeStyle = 'white';
            ctx.shadowColor = 'white';
            for(let i = 0;i < initStarsAmount;i++){
                stars[i] = new Stars(i,Math.floor(Math.random() * _Width),Math.floor(Math.random() * _Height))
            }
            ctx.shadowBlur = 0;
            animate();
        }
        function animate(){
            ctx.clearRect(0,0,_Width,_Height);
            for(let i in stars){
                stars[i].move();
            }
            requestAnimationFrame(animate)
        }
    }
}
</script>

<style lang="less">
    .bg-sky{
        position: fixed;
        top: 0;
        background-image: linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%);
        z-index: -1;
        .filter{
            position: fixed;
            height: 100%;
            width:100%;
            top: 0;
            background-color: #fff;
            mix-blend-mode: overlay;
            animation: colorChange 30s ease-in-out infinite;
            animation-fill-mode: both;
            z-index: -1;
        }
        @keyframes colorChange {
            0%,
            100%{
                opacity: 0;
            }
            50%{
                opacity: .9;
            }
        }
    }
</style>