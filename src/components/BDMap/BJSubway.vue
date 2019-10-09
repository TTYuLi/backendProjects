<template>
  <div id="bj_subway">
    jjajj
  </div>
</template>

<script>
  export default {
    data() {
      return {
        start: '',
        end: '',
      }
    },
    methods: {
      mouse(map) {
        var styleOptions = {
            strokeColor:"red",    //边线颜色。
            fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,    //边线透明度，取值范围0 - 1。
            fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        }
            //实例化鼠标绘制工具
        var drawingManager = new BMapLib.DrawingManager(map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: true, //是否显示工具栏
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                offset: new BMap.Size(5, 5), //偏离值
            },
            circleOptions: styleOptions, //圆的样式
            polylineOptions: styleOptions, //线的样式
            polygonOptions: styleOptions, //多边形的样式
            rectangleOptions: styleOptions //矩形的样式
        }); 
      }
    },
    mounted () {
      var subwayCityName = '北京';
      var list = BMapSub.SubwayCitiesList;
      var subwaycity = null;
      for (var i = 0; i < list.length; i++) {
          if (list[i].name === subwayCityName) {
              subwaycity = list[i];
              break;
          }
      }
      console.log(subwaycity)
      // 获取北京地铁数据-初始化地铁图
      var subway = new BMapSub.Subway('bj_subway', subwaycity.citycode);
      console.log(subway)
      var zoomControl  = new BMapSub.ZoomControl({
          anchor: BMAPSUB_ANCHOR_BOTTOM_RIGHT,
          offset: new BMapSub.Size(10,100)
      });
      subway.addControl(zoomControl); // 缩放控件

      // 站点标注
      var startIcon = new BMapSub.Icon(
        'https://api.map.baidu.com/images/subway/start-bak.png',
        new BMapSub.Size(50, 80)
      );
      var marker = new BMapSub.Marker('西直门', {icon: startIcon});
      subway.addMarker(marker);
      subway.setCenter('西直门');
      subway.setZoom(0.6);

      // // 站点点击事件
      // subway.addEventListener('tap', function(e) {
      //   alert('您点击了"' + e.station.name + '"站');
      // });
      // 地图加载事件
      subway.addEventListener('subwayloaded', function() {
          // alert('地铁图加载完成');
          // 站点详情检索
          // var detail = new BMapSub.DetailInfo(subway);
          // detail.search('西直门');
          // 地铁详情规划
          // var drct = new BMapSub.Direction(subway);
          // drct.search('西直门', '西红门');
      });

       subway.addEventListener('hover', function(e) {
        alert('您点击了"' + e.station.name + '"站');
      });
  

  },
  }
</script>

<style >
  #bj_subway{
    width: 100%;
    height: 100%;
  } 
</style>