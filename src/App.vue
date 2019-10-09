<template>
  <div id="app">
    <Header></Header>
    <Sider></Sider>
    <Main>
    </Main>
      <!-- <router-view/> -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Sider from '@/components/Sider'
import Main from '@/components/Main'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {Main, Sider, Header,Footer},
  data(){
    return {
      
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow: hidden;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
}
html, body {
 height: 100%; 
}
</style>
