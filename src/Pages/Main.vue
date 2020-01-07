<template>
  <div class="container">
    <Header></Header>
    <Sider></Sider>
    <div class="main">
        <router-view/>
    </div>
    <Footer></Footer>

  </div>
</template>

<script>
import Header from '@/components/Header'
import Sider from '@/components/Sider'
import Footer from '@/components/Footer'
export default {
    components: { Sider, Header,Footer},
  data() {
    return {}
  }
}
</script>

<style>
.container {
    width: 100%;
    height: 100%;
}
  .main {
    margin-left: 145px;
    margin-top: 45px;
    overflow: auto;
    padding: 20px;
    width: 100%;
    height: 100%;
  }
</style>
