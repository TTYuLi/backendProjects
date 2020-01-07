<template>
  <div class="sider">
    <div class="logo" >LOGO</div>
    <div class="menu">
      <div class="menu-item" v-for="item in Navs" v-if="item.path" >
        <router-link :to="item.path" >
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
      Navs: this.$store.state.route
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
  user-select: none;
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
  width: 145px;
  padding-left: 16px;
  display: block;
  color: #fff;
  font-size: 12px;
  text-decoration: none;
}

.menu-item>a.router-link-active {
  background-color: #ed4014;
  border-left: 4px solid #e99079cc;
}
.menu-item>a .arrow-right {
  color: transparent;
}
.menu-item>a.router-link-active .arrow-right {
  color: #fff;
}
</style>
