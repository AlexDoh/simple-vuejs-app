<template>
  <div id="app">
    <Transactions/>
  </div>
</template>

<script>
import Transactions from './components/Transactions.vue'

export default {
  name: 'App',
  components: {
    Transactions
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
