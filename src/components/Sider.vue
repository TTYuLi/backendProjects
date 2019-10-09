<template>
  <div class="sider">
    <div class="logo" >LOGO</div>
    <div class="menu">
      <div class="menu-item" v-for="item in Navs" >
        <router-link :to="item.router">
          <Icon :type="item.icon" size="18" style="margin-right: 10px;"/>
          {{item.title}}
          <Icon class="arrow-right" type="ios-arrow-forward" style="float: right; margin-right: 15px;margin-top: 13px;"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Navs: [
        {title: '证件照', router: '/photo',  icon: 'ios-images-outline'},
        {title: '日历', router: '/calcendar',  icon: 'ios-calendar-outline'},
        {title: '图表', router: '/echarts',  icon: 'ios-stats-outline'},
        {title: '实时地铁图', router: '/subway', icon: 'ios-train'},
        {title: '文件读取', router: '/file', icon: 'ios-paper-outline'},
        {title: '测试',router: '/test', icon: 'ios-bug-outline'},
        {title: 'canvas地铁', router: '/map', icon: 'md-train'},
        {title: '百度地图', router: '/baidumap', icon: 'md-train'},
        {title: 'SVG矢量', router: '/svg', icon: 'md-train'},
      ]
    }
  }
}
</script>

<style>
.sider{
  position: fixed;
  z-index: 99;
  top: 0px;
  width: 145px;
  height: 100%;
  background-color: rgb(40, 43, 47);
}
.sider .logo {
  width: 145px;
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  font-weight: 400;
  /* padding-left: 20px; */
  color: #fff;
  background-color: rgb(29,29,38);
}
.sider .menu {
  color: aliceblue;
}
.menu-item {
  height: 38px;
  line-height: 38px;
  font-size: 12px;
  border-bottom: 1px solid rgb(75, 75, 75);
}
.menu-item>a {
  padding-left: 16px;
  display: block;
  color: #fff;
  font-size: 12px;
  text-decoration: none;
}

.menu-item>a.router-link-exact-active {
  background-color: #ed4014;
  border-left: 4px solid #e99079cc;
}
.menu-item>a .arrow-right {
  color: transparent;
}
.menu-item>a.router-link-exact-active .arrow-right {
  color: #fff;
}
</style>
