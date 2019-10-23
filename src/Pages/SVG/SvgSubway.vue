<template>
  <div style="height: 100%;">
    <h2>svg地铁图</h2>
    <div style="margin: 10px 0 30px;"><Icon type="ios-information-circle" />使用数组 v-for 渲染地铁图</div>
    <!-- <Button @click="">点击框选车站</Button> -->
    <!-- <Button @click="drag">点击拖拽</Button> -->
    <div class="subway_wrap" >
      <svg class="sub" >
        <g>
          <!-- 地铁线 -->
          <g
            >
            <path 
              v-for="(path, key) in linePath"
              :key="key"
              :stroke="path.color"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
              fill="none"
              :d="path.path"
              ></path>
          </g>
          <!-- 地铁站点 -->
          <g
            v-for="(ele, key) in lineData"
            >
            <text :x="ele.l_xmlattr.lbx" :y="ele.l_xmlattr.lby" :fill="ele.l_xmlattr.lc">{{ele.l_xmlattr.lb}}</text>
            <g
              v-for="(point, index) in ele.p" 
              >
              <!-- 地铁点 -->
              <circle
                v-show="!point.p_xmlattr.ex && point.p_xmlattr.lb"
                fill="#fff"
                r="4"
                stroke="red"
                :cx="point.p_xmlattr.x"
                :cy="point.p_xmlattr.y"
              ></circle>
              <!-- 地铁换乘点 -->
              <image 
                v-if="point.p_xmlattr.ex"
                class="nodeImage" 
                :xlink:href="img" 
                width="16"
                height="16"
                :x="point.p_xmlattr.x -8" 
                :y="point.p_xmlattr.y -8" 
                :href="img"
                ></image>
              <!-- 地铁名 -->
              <text 
                :x="point.p_xmlattr.x + point.p_xmlattr.rx + 2"
                :y="point.p_xmlattr.y + point.p_xmlattr.ry + 8"
                font-size="12"
                >{{point.p_xmlattr | nameFilter(repeatStr)}}</text>
            </g>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
const imgSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACldJREFUeNq8mmtMVdkVx7eIKOIDn4gvUFuQghjFR6dlfOA79ZFaR/2iNWZMJu2HdtKZpk07TZ0mpp1p06RN+8U2WtExgpgZUzS1GmtQ6wsRH/gCBRF8IiqoKApdvz1n32zO3HPOBbErWV65nLP3/q+19n+ttTddHj16pGpqatQbki6i3ZzPFtHmzhy8paVFjRo1SvXs2VNFA2LXrl2dtegU0TTRyaKpogmi0c7vW0UbRatES0WLRa+I1nV0whcvXqi1a9eqpKSk0CSvI2+JviM6TXSsaFw73q0UPSe6W7RQ9FZHFxEI5OXLl9qFSFRUlIqO1q8QLt8T/aHotx1vfEVaW1vbuqzLVx5LdnSRKPGdL/oX0XLebW5uVt26dQv3XvuAAGLBggUqISFBD9jU1KQKCwvfrq+v39C1a9dsP9BITEyMBm+Ehb169SoESsawfz9M9Meia+S5P2dnZ/8hPT390d69e9WNGzf0/B0GwqKGDRumVUgh7tixYx/V1dW9L4PG2M8AgAUNHDhQDRkyRD8/YMAA1atXrzZAiOmHDx+q27dva4K5c+eOevLkiQbkeBqJl58/KikpWSKx/wP5/5FOCS0sUVlZOWbr1q25Yqm3sLIJGxYWFxenxo0bpzIyMtTw4cNVjx49fMcbMWKEfh65f/++unLlijp//ryqra3VXgIQ4J8/f54pc/5b5v+V6O9fCwggzp07l1FcXFwglk8xIAgRJpw6dapWPNER4T108uTJ6uLFi+rIkSPq1q1bOiQBJZ+x8tineEn0lx0GIoNlFBUV/VPcm4T7EbGUtvzcuXNVcnJyp+QDDJaZmalSUlLU0aNHtRKuVrj9gi0n+tOOABkjWiCTJJlQwhNZWVlq3rx5gSHUEWHMnJwcbSghFfalvck/dPLQx+0Bwiq3OwlOg8BC06dP1xO9acEzffv2VTt37lT37t2zwawXrRDd5n4nymOs9U52Du2JadOm/V9AGIHyV6xYofr166eNaAkb/+uRAPmW6AfmB/YE4RQEwp38OkMggmXLlumQs/LTENHfudfuBoIP/2i+xxPEK3siqObZsWOH2rdvX+DihAH1Zo4UODkJYiGRWu98V3Sp3x7hgSnGwrDG/PnzVffu3X09wcYUmlaG2fCexThtpLq6Wh0/flxVVVWpOXPmRETdEyZM0PmmrKxMmRQg8jPRL0xFbXuEVfzItvLEiRPVyJEjfScBwJkzZ3QpzSSHDh1SJ0+e9Hy+oaFBP3fp0iW1adMmdeLEiTZljZdgHOawns0SnRcutNgb3zRlBxmbZOcn7J/Dhw+HyhA2JYxDlg8nhColCc8D5tmzZ9qb27dvV3fv3vWda9CgQXpcxrDkPVOw2kDeMT+zoLFjx+p6yU8oLaibCCMDfuHChap3795hnwfE06dPQ8AJRQARNps3b1ZSy/l6Z9KkSSo2NtbeK2/LGMk2EHqI2SE3yURk2qCC8uzZs6FFYSne8QMPENRdlgOGyppKd9u2bbqY9KJkQt3ySp/S0tIcG8goJ5Nrb+DGoUOH+gKRUl4nK6yKhViMV0gZefz4sR4/XH9hvHP16lW1ceNGvdfYp25JTU1VtsGFPHIIcQMkzalltKUTExN9mcodJlAj4LGYnzx48MD391gaMLQCFju1EdIBazOsKu3AN8SDIY7Msh8O8obxnIlVwAPEi3IjAYIxCE0qYRbr1RXGx8drpQVwGrMkmXe48UiqO6MGid0wITRRQUIRaC/cdIvmZ6pp+hW/1pYsD6lYpNBPDJQY5dDXQJPcKNDg6yDBvbjfeIUwCwqbxsbGEG1jLLxoFsTiSXiRZHyMZj8nGz4hymGsHgYIiwvqjzXNiVUAzDu4mNaVBXrVYICAIHhn5syZas2aNTrJmYKQMWArCCGSct9FFPFRTkYPPqYIYxXyBSHBImCw8vLyNvRs6irjhfT0dLVu3ToNBECEEhvb9PxkfWK/vWGtv5J/mti7xr0sIJKSgcFgKWNxPskrfFZUVKgtW7aogoKCEOcPHjxYLV68WPXv379NeALO7BXe9coh7jB1EUUTNEM8NBggWC5ciIRtIceMUadOnQq1qzdv3lS5ubn6+Ma0qgDwsKKW0aNHtwllTlmCBOq3RYxzz4xebYeEzS5BQLAwFjVGuHbtWggYSqcXRBo8ZzzrXmS4isJVHTSPHz/+jgFSaj8ciXuJ5wsXLoRAGI+ak0EmZB8EMSCFIxncjOHqBsPOCyGYlkHmqZF3qk0GO2Mfa8JAWCgcnxM+hNP169d1GLDwcGFjgMBufsJ5liEMU3f5CWQAGMKWNcr414TF6s0KoJv7hgapaL1ilY0GUAZkMK/kxSQwW9DCIAYzBu8EVdzUYoYcWIt0kMfZhwZIregpsynhfF4IJ9xHQKGzZ8/Wz7oZxAYStD/oQegYTWmDEbki8Ot/AG68h+Nlf/zLrn5bnbYxNKBkS894xcrkgtWrV+uSggnCUTYnIH5Cd0hFgEcc6+rxvOTy5cs6X1k1XbmQTbG7sfrChJdTVep2NOgcFzCzZs3S77jLbq8wwVu0x6h9ljxlyhTPwpNwArhL8uX7RjcQLlk+szc9bWxQTmGzc3AHIDI1zzMpC/IKLej9wIED2guEJwYgn/j1M4CGaKycQ474u9dx0J+cY0m9EBjFlBiRHNusWrVKH93wLupFvZThS5cu1WRAaPHJPYxX0oR4aLRcv+e08boXkAoHTGgv4BW7hvI9EZfFZ2dna+9gXb/zYUhj+fLluvdZtGhRqAIIR+O0wHjR2uREzydBJ42/FS2za6/du3cHnnK4uzgWF3TQDUPBgBx0eMn+/fv1XnXR+K/Vl5eqvkCou95lfxkrk0nz8/NVXV37LmAjufvzaxkIJ+5MXM/sFP1bpIfY/xX9uT0ZtMcJBxvuTQtkwfHrwYMH3ZehZc49Y0ukQJRzU7TBZFEGpDECTElJyRsDwV7Iy8vTnnBVDmxsbpJr2n1jxU2RJLUYCakPAMLA0Ct7hsw/Y8YMz03aXiH5QrFFRUWapVx7woC41KGrNwaXZujD06dPN0i3t55TPsMcVL4Ujlxscu0QdBTkV/1y0sh5MWFrjlMNYxFO8p0viEAgDMTClyxZ8rF4oko6wE8kNwx2Lip1IuOYk3KGLM+5L5/kCUB7xT/kQdGJV6mdIBHTAtiH6FLZ5sl370v/URtEHNGRMA9WWrly5T8yMzOPFhYWbmhqalrGdyiNEYsj17AwAAKE8r1Pnz6hOMcoJD8KUoBQipuDCzdzSca/LcXgb6Qw/Ss5BO8HHRgGXk8zEPnAsdhVmZjD7hWiPzHXc7Y1WRwWhuXCHe0YA3jQbr1orszxqQC9uWfPHh1uQa1AIBDTZNmVrdNI7ZD/8idF3xH9vugM9eVdeOhPM6wsHIlcFM0DBNUFQCsrK/W8Ef8tCg+HOyyO4ASD/3zu6NdEJ3If4xy/ciju1SExGcnosuh/RPkTDfj8aSQnJu4rP+P1aOI4LS3tddmz3NE852fuLKCxRNFY5+yMFT1w6qQaJ4xem7JNYfo/AQYAqpk3qBLp2UoAAAAASUVORK5CYII="
 
  var that
  export default {
    data(){
      return {
        lineData: null,
        linePath: null,
        img: imgSrc,
        repeatStr: {},
        svgAttr:{
          width: 800,
          height: 600,
          viewX: 0,
          viewY: 0,
          minW:800,
          minH: 600,
        },
        path: null,
        panZoomTiger2: null,
      }
    },
    filters:{
      nameFilter:(value,repeatStr)=>{
        if(that.repeatStr[value.uid]){
          return ''
          }else {
            that.repeatStr[value.uid] = 1
          return value.lb
        }
      }
    },
    beforeCreate: function () {
     that = this;
    },
    methods: {
      init(){
        var cityCode = 131;
          
         

        if(localStorage.getItem('subway')) {
          this.lineData = JSON.parse(localStorage.getItem('subway'))
          // this.drawLine(lineData)

        } else {
          var timeStamp = (Math.random() * 100000).toFixed(0);
          var checkUrl = "https://api.map.baidu.com/?qt=subways&c=" + cityCode + "&format=json&ak=yZSTYLk9UUvs0ZqXqBbtTp8ViKk5vxLM&v=3.0&from=jsapi&callback=BMapSub._rd._cbk" + timeStamp
          $.getScript(checkUrl);
          BMapSub._rd["_cbk" + timeStamp] = (json)=> {
            // console.log(json.subways.l)
            this.lineData = json.subways.l
            // this.drawLine(lineData)
            localStorage.setItem('subway', JSON.stringify(json.subways.l))
          }
        }
        


      },
      drag(){
         // 开启平移和缩放
        this.panZoomTiger2.enablePan()  
        this.panZoomTiger2.enableZoom()
      },
     },
    created () {
      this.init();
      // console.log(this.lineData)
      this.linePath = [];
      this.lineData.map(v => {
        let path = ''
        let isLb = false; //是否圆润拐点
        v.p.map((item,index) => {
          let x = item.p_xmlattr.x
          let y =  item.p_xmlattr.y
          
          if (isLb) {
              isLb = false
              path += x + " ," + y
          } else {
            // rc: 是否是首发站
             if(item.p_xmlattr.rc) { 
                isLb = true
               path += "Q" + x + " ," + y + ", "
             } else {
                 if(index == 0) { // 第一个车站
                   path += "M" + x + " ," + y 
                 } else {
                   path += "L" + x + " ," + y  
                 }
 
                 if(v.p.length -1 == index) {
                   if(v.l_xmlattr.loop) {
                     path += 'Z'
                   }
                 }
             }

          }

        })

        this.linePath.push({
          path: path, 
          color: '#' + v.l_xmlattr.lc.split("x")[1],
          lname: v.l_xmlattr.lb
          })
      })
      // console.log(this.linePath)
    },
    destroyed(){
      // 销毁 panZoomTiger 实例
      this.panZoomTiger2.destroy()
    },
    computed: {
      
    },
    updated(){
    },
    mounted () {
        // svgPanZoom('svg');
         this.panZoomTiger2 = svgPanZoom('.sub');
        this.panZoomTiger2.zoom(1.2)
        window.onresize = (()=> {
          this.panZoomTiger2.resize(); // update SVG cached size and controls positions
          this.panZoomTiger2.fit();
          this.panZoomTiger2.center();
        })
    },
  }
</script>

<style scoped>
  .subway_wrap{
    border: 2px solid #ccc;
    border-radius: 6px;
    user-select: none;
    width: 800px;
    width: 86%;
    margin-top: 10px;
    height: 80%
  }
  svg.sub {
   width: 100%;
   height: 100%;
  }
</style>