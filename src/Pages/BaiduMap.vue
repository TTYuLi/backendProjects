<template>
  <div class="map">
    <h1>百度地图展示</h1>
    <!-- <div id="container"></div> -->
    <router-link to="/baidumap/basic">基础地图展示</router-link>
    <router-link to="/baidumap/bjsubway">北京地铁线路展示</router-link>
    <div class="container">
      <input type="text"> <Input></Input>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {}
  },
  created () {
  },
}
</script>

<style>
  .map{
    height:100%;
    margin-bottom: 30px;
  } 
  .container {
    margin-top: 10px;
    width:80%; 
    height: 80%;
    border: 1px solid #ccc;
  }
  a {
    text-decoration: underline;
    display: inline-block;
    margin-right: 10px;
  }
</style>