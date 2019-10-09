<template>
  <div>
    <h1>svg矢量图</h1>
    <Button @click="select_circle">点击框选车站</Button>
    <Button @click="drag">点击拖拽</Button>
    <div id="svg_subway" class="draw" ></div>
  </div>
</template>

<script>
const imgSrc = "data:image/png;base64,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"
 
  export default {
    data(){
      return {
        draw: null,
        group: null,
        path: null,
        s_cx: null,
        s_cy: null,
        e_cx: null,
        e_cy: null,
      }
    },
    methods: {
      drawLine(lines) {

        // 开始画线
        this.draw = this.$svg('svg_subway').size(800, 600)
        // var draw = SVG('svg_subway').size(800, 600)
        var group = this.draw.group();
        this.group = group;
        for(var i = 0; i < lines.length; i++) {
            // console.log( lines[i])

            var { l_xmlattr, p } = lines[i]   // p： 线内站点信息
            var { lb, loop, uid } = l_xmlattr  // 地铁线信息
            var dStr = ""; //地铁线路点 轨迹 点 字符串 path()
            var isLb = false; //是否圆润拐点
            for (var j = 0; j < p.length; j++) {
              // rc: 是否是首发站
               var { x, y, lb, st, ex, rc } = p[j].p_xmlattr  // 每个站点的详细信息

               if (isLb) {
                    isLb = false
                    dStr += x + " " + y + " "
                } else {
                    if (rc) {
                        isLb = true
                        dStr += "Q" + x + " " + y + " "
                    } else {
                        if (j == 0) {
                            dStr += "M" + x + " " + y + " "
                        } else {
                            dStr += "L" + x + " " + y + " "
                        }
                        if (j == p.length - 1) {
                            if (loop) {
                                dStr += "Z"
                            }
                        }
                    }
                }
 
            }
            var { lb, lc, lbx, lby } = l_xmlattr

            // 绘制地铁线路名称 和样式
            var lineColor = "#" + lc.split("x")[1];
            var line_text = group.text(lb)
            line_text.move(lbx - 10, lby + 15)
            .font({ fill: lineColor, family: 'Inconsolata' }).addClass('line_name')

            // 绘制地铁线 和样式 
            var path = group.path(dStr)
            this.path = path;
            path.fill('none')
            path.stroke({ color: lineColor, width: 4, linecap: 'round', linejoin: 'round' }).click(function() {
              this.stroke({ width: 8})
            })
        }

        
        //  根据uid 判断重复的车站重复点
        var repeatStr = "" //uid字符串判断重复点
        for(var i = 0; i < lines.length; i ++){
          var { l_xmlattr, p } = lines[i]

            if (!l_xmlattr.uid) { //暂未开通
                break;
            }
             for (var j = 0; j < p.length; j++) {
               // x, y ： 坐标位置 uid: 唯一标志id
               // ex: 是否是换乘点 st: 是否是车站 rc： lb: 车站名称
                var { x, y, rx, ry, lb, ex, rc, st, uid } = p[j].p_xmlattr

                  if (st) { 
                    if(ex) {
                      // 换乘站
                        if (!repeatStr.includes(uid)) {
                          var image = group.image(imgSrc)
                          image.size(16, 16).move(x - 8, y - 8)
                      }
                    } else {
                      // 非换成站 
                      var circle = group.circle(8).fill('#fff').stroke({color: "#" + l_xmlattr.lc.split("x")[1]}).move(x-4, y-4)
                    }

                    // 未重复的换成车站名
                    if (!repeatStr.includes(uid)) {
                      var station_text = group.text(lb)
                        station_text.move(x + rx + 2,y + ry + 8)
                        .font({
                          // family: 'Helvetica',
                          family: '黑体',
                          size:     12,
                          anchor:   'start',
                          // leading:  '3em',
                          // fill: '#000', 
                        }).addClass('station_name')
                       
                        repeatStr += uid
                    }
                  } 
             }

        }

        // this.select_circle();
          // 将这个组的svg 图缩小并放置在中间
          // group.scale(0.4, 0.4).translate(400, 300)
          // draw.viewbox(-400, -300, 1600, 1200)
          
          // 设置 鼠标滚轮实现放大和缩小 ， 需要引入svg.pan-zoom.js
          // group.panZoom()
          group.panZoom({zoom: [0.1, 3], zoomSpeed: 1});

          // 设置鼠标平移拖拽， 需要引入 svg.draggable.js
          path.draggable()
          // path.draggable({  minX: 10
          //                 , minY: 15
          //                 , maxX: 200
          //                 , maxY: 100})
  
 


        // this.select_circle(group)  
      },
      drag(){
        this.path.draggable();
      },
      select_circle(){
        // 让鼠标指针变成 十字架形态  matrix(0.4,0,0,0.4,402,314)
        this.path.draggable(false)

        $('#svg_subway').css({cursor: 'crosshair'})
          this.draw.mousedown((e)=> {
            console.log(e, this.group.attr())
            // let transformValueStr = this.group.attr('transform').substring(7,this.group.attr('transform').length -1)
            // let scale_x = transformValueStr.split(',')[0]
            // let scale_y = transformValueStr.split(',')[3]
            // let translate_x = transformValueStr.split(',')[4]
            // let translate_y = transformValueStr.split(',')[5]

            this.s_x = e.offsetX
            this.s_y = e.offsetY
            var circle = 
            this.draw.ellipse(60, 60).fill('transparent').stroke({ color: '#f06'}).addClass('select-circle')
              // .attr({'rx':  0, 'ry': 0, 'cx':this.s_x - translate_x, 'cy': this.s_y - translate_y,})
              .attr({'rx':  0, 'ry': 0, 'cx':this.s_x , 'cy': this.s_y ,})

            // circle.panZoom({zoom: [0.1, 3], zoomSpeed: 1})
            // this.group.add(circle)
            this.draw.mousemove((e) => {
              this.m_x = e.offsetX
              this.m_y = e.offsetY
              $('.select-circle')
              // .animate({ ease: '<', delay: '1.5s' })
              .attr({'rx': Math.abs(this.m_x-this.s_x) /2, 'ry': Math.abs(this.m_y-this.s_y) /2, 'cx':this.m_x -5 , 'cy': this.m_y-5})

              this.draw.mouseup((e)=>{
                this.e_x = e.offsetX
                this.e_y = e.offsetY  
                $('.select-circle').attr({'rx': Math.abs(this.e_x-this.s_x) / 2, 'ry': Math.abs(this.e_x-this.s_x) / 2, 'cx': this.e_x, 'cy': this.e_y})
                this.draw.off()
                 $('#svg_subway').css({cursor: 'default'})
              })
 
            })
          })
          
          
       
      },
      init(){
        var _this = this
        var cityCode = 131;
        var timeStamp = (Math.random() * 100000).toFixed(0);
        var checkUrl = "https://api.map.baidu.com/?qt=subways&c=" + cityCode + "&format=json&ak=yZSTYLk9UUvs0ZqXqBbtTp8ViKk5vxLM&v=3.0&from=jsapi&callback=BMapSub._rd._cbk" + timeStamp
        $.getScript(checkUrl);

        BMapSub._rd["_cbk" + timeStamp] = (json)=> {
          console.log(json.subways.l)
            this.drawLine(json.subways.l)
        }
      }
     },
    created () {
    },
    computed: {
      
    },
    mounted () {
      this.init();
       
    },
  }
</script>

<style scoped>
  .draw {
    border: 2px solid #ccc;
    border-radius: 6px;
    user-select: none;
    width: 800px;
  }
</style>