<template>
   <div class="main">
     <router-view/>
   </div>
</template>

<script>
// import Sider from './Sider'
// import Footer from './Footer's
export default {
  // components: {Sider, Footer},
  data() {
    return {}
  }
}
</script>

<style>
  .main {
    margin-left: 145px;
    margin-top: 45px;
    overflow: auto;
    padding: 20px;
    width: 100%;
    height: 100%;
  }
</style>
