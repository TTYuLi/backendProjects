 <template>
     <div>总览页面
          <canvas id="canvas" width="600" height="400"></canvas>
     </div>
 </template>
 
 <script>
 export default {
    mounted(){
        var canvas = document.getElementById('canvas')
        var ctx = canvas.getContext('2d')
        let img = new Image()
        img.src = require('../assets/xz1.jpg')
        img.onload = () => {
            ctx.drawImage(img, 0,0)
        }
    }
 }
 </script>
 
 <style>
 
 </style>
 