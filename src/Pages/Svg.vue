<template>
  <div>
     <Select v-model="value" style="width:400px; margin-right: 20px;" label-in-value multiple @on-change="change">
        <Option 
          v-for="item in types" 
          :label="item.label"
          :value="item.value" 
          :key="item.value" 
         >
          <img style="height: 25px; margin-right: 10px;" :src="item.value"/>
          <span>{{ item.label }}</span>
        </Option>
    </Select>
    <Button type="primary" @click="add">添加</Button>
    <div id="svg_dragbox" ></div>
    
    <div id="menu">
        <p id="start" @click="start()">设为起点</p>
        <p id="end" @click="end()">设为终点</p>
        
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        value: [],
        types:[
          {label: 'IP', value: require('../assets/imgs/svg/ip.png')},
          {label: '服务器', value: require('../assets/imgs/svg/fuwuqi.png')},
          {label: '交换机', value: require('../assets/imgs/svg/jiaohuanji.png')},
          {label: '扬声器', value: require('../assets/imgs/svg/yangshengqi.png')},
        ],
        datas: [
          {
            source: { name: '服务器', image_url:require('../assets/imgs/svg/fuwuqi.png'), x: 300, y: 20},
            targets: [
              { name: '交换机', image_url:require('../assets/imgs/svg/jiaohuanji.png'), x: 50, y: 150},
              { name: 'IP', image_url:require('../assets/imgs/svg/ip.png'), x: 200, y: 150},
              { name: '扬声器', image_url:require('../assets/imgs/svg/yangshengqi.png'), x: 400, y: 150},
            ]
          },
           {
            source: { name: '交换机', image_url:require('../assets/imgs/svg/jiaohuanji.png'), x: 50, y: 150},
            targets: [
              // { name: '交换机', image_url:require('../assets/imgs/svg/jiaohuanji.png'), x: 50, y: 300},
              // { name: 'IP', image_url:require('../assets/imgs/svg/ip.png'), x: 200, y: 300},
              { name: '扬声器', image_url:require('../assets/imgs/svg/yangshengqi.png'), x: 400, y: 300},
            ]
          },
        ],
        links: null,
        draw: null,
        pathStr: null,
        currentId: '',
        currentPath: null,
        images: {}
      }
    },
    methods: {
      render(){},
      getNodes(datas){
        let links = datas;
        // links.forEach(function(link) {
        //   console.log(1,link)
        //   link.source =  {
        //       name: link.source,
        //       attr: link.attr,
        //       url:link.source_img,
        //       elementId: link.elementId
        //   };
        //   link.target = {
        //     name: link.target,
        //     attr: link.attr,
        //     url:link.target_img,
        //     elementId: link.elementId
        //   };
        //    console.log(2,link)
        // });
      },
      // 绘制树状图
      render(){
        // let group = this.draw.group();

        // 创建箭头
        var arrow = this.draw.marker( 12, 12, function(add) {
          add.path('M2,2 L2,11 L10,6 L2,2').stroke({color: '#66'})
        }).attr({orient: 'auto'})
       
       
        this.datas.map(v => {
          console.log(v)
        let group1 = this.draw.group();
          // 画图片
         let img = group1.image(v.source.image_url).size(60,60).move(v.source.x, v.source.y)
         let title = group1.text(v.source.name).font({ fill: '#333', family: '黑体', size: 18 }).move(v.source.x,v.source.y+ 65)
          group1.draggable()

        let pathStr = 'M' + (v.source.x + 30)+ ',' +  (v.source.y + 85)
         v.targets.map(target => {
          let group2 = this.draw.group().draggable();
          let img = group2.image(target.image_url).size(60,60).move(target.x, target.y)
          let title = group2.text(target.name).font({ fill: '#333', family: '黑体', size: 18 }).move(target.x,target.y+ 65)
          pathStr = pathStr + 'L' +(target.x +30) + ',' + target.y + 'Z'
         })
         this.draw.path(pathStr).stroke({color: '#666'}).marker('start', arrow)
        })
      },
      change(data){
        // data.map((v, i) => {
        //   let url = v.value
        //   this.drawImage(url, i)
        // })
        console.log(data)
      },
      add(){
        this.value.map((v, i) => {
          let url = v
          this.drawImage(url, i)
        })
      },
      drawImage(url, i){
        let img1 = this.draw.image(url).size(60, 60).move( (60 * i + 60 * i), 20).addClass('img1').attr({'s': '', 'e': ''})
        img1.draggable()
        .on('dragmove', function(e) {
          
          console.log(this)
        })
       
       
      },
      start(){
        
        $("#menu").hide();
          this.pathStr = 'M' + ( Number($('#' +this.currentId).attr('x')) + 30)+ ',' + (Number($('#' + this.currentId).attr('y')) + 60) + ''
          this.currentPath = this.draw.path( this.pathStr + 'Z').stroke({color: 'blue'}).fill('#fff')
          $('#' +this.currentId).attr({'connection': ''})

          let id = this.currentPath.attr('id')
          
          let connections = $('#' +this.currentId).attr('connection')
          console.log( $('#' +this.currentId)) 
          // if (connections){
          //   connections = connections + ',' + id
          // }
          // console.log(connections,  $('#' +this.currentId).attr())
          //  $('#' +this.currentId).attr({'connection': connections})
      },
      end(){
        $("#menu").hide();
        // console.log( this.pathStr)
          this.pathStr =  this.pathStr + ' L' +( 30 +  Number($('#' + this.currentId).attr('x')) ) + ',' +  Number($('#' + this.currentId).attr('y')) +' Z'
        // console.log( this.pathStr)
        this.currentPath.attr({d: this.pathStr}).marker('start',  20, 20, function(add) {
          add.path('M0,-5L10,0L0,5').stroke({color: '#66'}).center(12, 10)
        })
          // let path = this.draw.path(this.pathStr).stroke({color: 'blue'}).fill('#fff')

          let id = this.currentPath.attr('id')
          let connections = $('#' +this.currentId).attr('connection')
          if (connections){

            connections = connections + ',' + id
          }
           $('#' +this.currentId).attr({'connection': connections})
      },
      dragBox(){
        var draw_box = this.$svg('svg_dragbox').size(800, 600).addClass('box')
        var marker_arrow = draw_box.marker( 12, 12, function(add) {
          add.path('M2,2 L2,11 L10,6 L2,2').stroke({color: '#666'})
          
        })
        .attr({orient: 'auto'})
        draw_box.path('M0,0L100,100Z').stroke({color: '#666'}).fill('#fff').move(20,20) 
        // .marker('start', marker_arrow)
        .marker('end', marker_arrow)
         draw_box.path('M300,400L30,50Z').stroke({color: '#666'}).fill('#fff').move(30,20) 
        // .marker('start', marker_arrow)
        .marker('end', marker_arrow)

          var rect2 = draw_box.image(require('../assets/imgs/svg/ip.png')).move(220,10).size(100, 100)
         
         

          var path_str3 = 'M270 110 L60 300 z'
          var path3 = draw_box.path(path_str3).fill('#fff').stroke({color: 'blue'})
          path3
          .marker('start', marker_arrow)
        


          var path_str4 = 'M270 110 L270 300 z'
          var path4 = draw_box.path(path_str4).fill('#fff').stroke({color: 'blue'})
          var path_str5 = 'M270 110 L390 300 z'
          var path5 = draw_box.path(path_str5).fill('#fff').stroke({color: 'blue'})
          var path_str6 = 'M270 110 L510 300 z'
          var path6 = draw_box.path(path_str6).fill('#fff').stroke({color: 'blue'})







          var image1 = draw_box.image(require('../assets/imgs/svg/fuwuqi.png')).move(10,300).size(100, 100)
          var image2 = draw_box.image(require('../assets/imgs/svg/ip.png')).move(220,300).size(100, 100)
          var image3 = draw_box.image(require('../assets/imgs/svg/jiaohuanji.png')).move(340,300).size(100, 100)
          var image4 = draw_box.image(require('../assets/imgs/svg/yangshengqi.png')).move(460,300).size(100, 100)
            

          image1.draggable().on('dragmove', (e) => {
            path_str3 =  'M'+( rect2.attr('x') + 50 )+ ',' + (rect2.attr('y') + 100) + 'L'+ (image1.attr('x') + 50 )+ ' ' + (image1.attr('y') - 0) + ' z'
            path3.attr({d: path_str3})
          })
           image2.draggable().on('dragmove', (e) => {
            path_str4 = 'M'+( rect2.attr('x') + 50 )+ ',' + (rect2.attr('y') + 100)+ 'L' + (image2.attr('x') + 50 )+ ' ' + (image2.attr('y') - 0) + ' z'
            path4.attr({d: path_str4})
          })
           image3.draggable().on('dragmove', (e) => {
            path_str5 =  'M'+( rect2.attr('x') + 50 )+ ',' + (rect2.attr('y') + 100)+ 'L' + (image3.attr('x') + 50 )+ ' ' + (image3.attr('y') - 0) + ' z'
            path5.attr({d: path_str5})
          })
           image4.draggable().on('dragmove', (e) => {
            path_str6 =  'M'+( rect2.attr('x') + 50 )+ ',' + (rect2.attr('y') + 100) + 'L' + (image4.attr('x') + 50 )+ ' ' + (image4.attr('y') - 0) + ' z'
            path6.attr({d: path_str6})
          })


          rect2.draggable().on('dragmove', (e) => {
           let x = rect2.attr('x')
           let y = rect2.attr('y')

            path_str3 =  'M'+( rect2.attr('x') + 50 )+ ',' + (rect2.attr('y') + 100) + ' L' + (image1.attr('x') + 50 )+ ' ' + (image1.attr('y') - 0) + ' z'
            path3.attr({d: path_str3})

            path_str4 =  'M'+( x + 50 )+ ',' + (y + 100) + ' L'  + (image2.attr('x') + 50 )+ ' ' + (image2.attr('y') - 0) + ' z'
            path4.attr({d: path_str4})

            path_str5 =  'M'+( x + 50 )+ ',' + (y + 100) + ' L' + (image3.attr('x') + 50 )+ ' ' + (image3.attr('y') - 0) + ' z'
            path5.attr({d: path_str5})

            
            path_str6 =  'M'+( x + 50 )+ ',' + (y + 100) + ' L' + (image4.attr('x') + 50 )+ ' ' + (image4.attr('y') - 0) + ' z'
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
      
      this.draw =  this.$svg('svg_dragbox').size(800, 600).addClass('box')
      // document.oncontextmenu = function(e){
      //         return false;
      // }

      // $('.box').mousedown((e)=>{
      //   console.log(e.target, $(e.target).attr('id'))
      //   this.currentId = $(e.target).attr('id')
      //     if(e.which == 3){  // 1 = 鼠标左键; 2 = 鼠标中键; 3 = 鼠标右键
      //         var x = e.originalEvent.x || e.originalEvent.layerX || 0;
      //         var y = e.originalEvent.y || e.originalEvent.layerY || 0;
      //         $("#menu").css({
      //             left: x + "px",
      //             top: y + "px",
      //             display: 'block'
      //         });
      //         $("#menu").show();
      //     }
      //     if(e.which == 1){  //如果鼠标左键点下，则隐藏右键菜单
      //         $("#menu").hide();
      //     }
      // })

 
      // this.dragBox()
      // this.getNodes(this.datas)
      this.render();
       
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
  #menu {
    position: absolute;
    display: none;
    cursor: pointer;
    border: 1px solid #e3e3e3;
    /* padding: 5px 10px; */
    border-radius: 6px;
    background: #fff;
  }
  #menu p {
    padding: 4px 10px;
  }
  #menu p:hover {
    background: azure;
  }
</style>