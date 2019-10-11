<template>
  <div>
    <div id="svg_dragbox" ></div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        
      }
    },
    methods: {
      dragBox(){
        var draw_box = this.$svg('svg_dragbox').size(800, 600).addClass('box')
          var rect1 = draw_box.rect(100, 100).fill('#fff').stroke({color: 'blue'}).move(10,10)
          var rect2 = draw_box.rect(100, 100).fill('#fff').stroke({color: 'blue'}).move(220,10)
          var rect3 = draw_box.rect(100, 100).fill('#fff').stroke({color: 'blue'}).move(440,10)

          // var path_str1 = 'M60 110 L60 200 z'
          // var path1 = draw_box.path(path_str1).fill('#fff').stroke({color: 'blue'})
          // var path_str2 = 'M270 110 L60 200 z'
          // var path2 = draw_box.path(path_str2).fill('#fff').stroke({color: 'blue'})


          var path_str3 = 'M270 110 L60 300 z'
          var path3 = draw_box.path(path_str3).fill('#fff').stroke({color: 'blue'})
          var path_str4 = 'M270 110 L270 300 z'
          var path4 = draw_box.path(path_str4).fill('#fff').stroke({color: 'blue'})
          var path_str5 = 'M270 110 L390 300 z'
          var path5 = draw_box.path(path_str5).fill('#fff').stroke({color: 'blue'})
          var path_str6 = 'M270 110 L510 300 z'
          var path6 = draw_box.path(path_str6).fill('#fff').stroke({color: 'blue'})






          // var rect4 = draw_box.rect(100, 100).fill('#fff').stroke({color: 'blue'}).move(10,200)
          // var rect5 = draw_box.rect(100, 100).fill('#fff').stroke({color: 'blue'}).move(220,200)

          var image1 = draw_box.image(require('../assets/imgs/svg/fuwuqi.png')).move(10,300).size(100, 100)
          var image2 = draw_box.image(require('../assets/imgs/svg/ip.png')).move(220,300).size(100, 100)
          var image3 = draw_box.image(require('../assets/imgs/svg/jiaohuanji.png')).move(340,300).size(100, 100)
          var image4 = draw_box.image(require('../assets/imgs/svg/yangshengqi.png')).move(460,300).size(100, 100)
            
          // var rect6 = draw_box.rect(100, 100).fill('#fff').stroke({color: 'blue'}).move(440,200)

          image1.draggable().on('dragmove', (e) => {
            path_str3 =  'M270 110 L' + (image1.attr('x') + 50 )+ ' ' + (image1.attr('y') - 0) + ' z'
            path3.attr({d: path_str3})
          })
           image2.draggable().on('dragmove', (e) => {
            path_str4 =  'M270 110 L' + (image2.attr('x') + 50 )+ ' ' + (image2.attr('y') - 0) + ' z'
            path4.attr({d: path_str4})
          })
           image3.draggable().on('dragmove', (e) => {
            path_str5 =  'M270 110 L' + (image3.attr('x') + 50 )+ ' ' + (image3.attr('y') - 0) + ' z'
            path5.attr({d: path_str5})
          })
           image4.draggable().on('dragmove', (e) => {
            path_str6 =  'M270 110 L' + (image4.attr('x') + 50 )+ ' ' + (image4.attr('y') - 0) + ' z'
            path6.attr({d: path_str6})
          })

          // beforedrag (cancelable)
          // dragstart
          // dragmove (cancelable)
          // dragend

          // rect4.draggable()   
          // rect5.draggable()
          // 用到 svg.draggable.js 拖拽事件 文档：https://github.com/svgdotjs/svg.draggable.js  npm i svg.draggable.js@2.2.2

          // react5绑定事件
          // rect5.on('dragstart.abs', function (event) {
          //   console.log(event)
          //   // event.detail.event hold the given data explained below
          //   // this == rect
          // })

          // unbind
          // rect.off('dragstart.abs')


          // rect4.draggable().on('dragmove', (e) => {
          //   path_str1 =  'M60 110 L' + (rect4.attr('x') + 50 )+ ' ' + (rect4.attr('y') - 0) + ' z'
          //   path_str2 =  'M270 110 L' + (rect4.attr('x') + 50 )+ ' ' + (rect4.attr('y') - 0) + ' z'
          //   // console.log(e, rect4.attr('x'), rect4.attr('y'), path_str1)

          //   path1.attr({d: path_str1})
          //   path2.attr({d: path_str2})
          //   // e.preventDefault() // 取消拖拽移动事件
          //   // e.detail.handler.move(100, 200)
          //   // events are still bound e.g. dragend will fire anyway
          // })
      },
      
     },
    created () {
    },
    destroyed(){
      // 销毁 panZoomTiger 实例
    },
    computed: {
      
    },
    mounted () {
      this.dragBox()
       
    },
  }
</script>

<style scoped>
  #svg_dragbox {
    border: 2px solid #ccc;
    border-radius: 6px;
    user-select: none;
    width: 800px;
    margin-top: 10px;
  }
</style>