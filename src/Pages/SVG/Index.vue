<template>
  <div style="height: 100%;">
    <h2>SVG矢量图</h2>
    <router-link to="/svg/subway2">svg地铁图</router-link>
    <router-link to="/svg/topotu">svg 拓扑图</router-link>
    <router-link to="/svg/subway">svg标签绘制地铁图</router-link>
    <router-view></router-view>
  </div>
</template>
<style scoped>
    div a {
      display: inline-block;
      padding: 2px 10px;
      text-decoration: underline;
    }
</style>