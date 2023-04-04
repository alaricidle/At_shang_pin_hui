<template>
  <div id="app">
      <Header></Header>
      
      <router-view></router-view>
      <Footer v-show='$route.meta.show'></Footer>
  </div>
</template>

<script>

import Footer from '@/components/footer/index.vue'
import Header from '@/components/header/index.vue'
export default {
  name: 'App',
  components: {
    Footer,
    Header
  },
  mounted() {
    this.$store.dispatch("home/categoryList")
    this.$store.dispatch("home/banner")
    this.$store.dispatch('home/reqFloor')


  },
}
</script>

<style>

</style>
