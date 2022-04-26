<template>
  <div id="app">
    <div class="nav">
      <Nav></Nav>
    </div>
    <router-view />
    <div>
      <Footer></Footer>
    </div>
  </div>
</template>
<style>
  #app {
    text-align: center;
  }

  .right {
    text-align: right;
  }

  .left {
    text-align: left;
  }
</style>
<script>
    import Nav from './components/NavBar'
    import Footer from './components/PageFooter'

    export default {
      name: 'App',
      components: {
        Nav,
        Footer
      }
    }
</script>
