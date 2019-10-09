<template>
  <div id="basic"></div>
</template>

<script>
  export default {
    mounted () {
      var map = new BMap.Map("basic");          // 创建地图实例  
      var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
      map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别  ;
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      map.addControl(new BMap.NavigationControl()); //将标准地图控件添加到地图中
      map.addControl(new BMap.ScaleControl());    // 添加一个平移缩放控件、一个比例尺控件和一个缩略图控件
      map.addControl(new BMap.OverviewMapControl());    
      map.addControl(new BMap.MapTypeControl());    
      map.setCurrentCity("北京"); // 仅当设置城市信息时，MapTypeControl的切换功能才能可用   

      var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL}    
      map.addControl(new BMap.NavigationControl(opts));

      // var geolocation = new BMap.Geolocation();
      // geolocation.getCurrentPosition(function(r){
      //   if(this.getStatus() == BMAP_STATUS_SUCCESS){
      //     var mk = new BMap.Marker(r.point);
      //     map.addOverlay(mk);
      //     map.panTo(r.point);
      //     alert('您的位置：'+r.point.lng+','+r.point.lat);
      //   }
      //   else {
      //     alert('failed'+this.getStatus());
      //   }        
      // });

       

      var searchInRect = new BMapLib.SearchInRectangle(map,"地铁站",{strokeWeight : 2,autoClose: false});
      searchInRect.open()
  },
  }
</script>

<style >
  #basic{
    width: 100%;
    height: 100%;
  } 
</style>