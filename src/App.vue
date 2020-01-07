<template>
  <div id="app">
      <router-view/>
    <!-- <Header></Header>
    <Sider></Sider>
    <Main>
    </Main>
    <Footer></Footer> -->
  </div>
</template>

<script>
 
export default {
  name: 'App',
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
