<template>
  <div id="app">
    <NavBar/>
    <CrewList/>

  </div>
</template>

<script>
import NavBar from "@/components/Nav-bar.vue";
import CrewList from "@/components/CrewList.vue";
export default {
  name: 'App',
  components: {
    NavBar,
    CrewList

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
