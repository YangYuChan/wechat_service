<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Wechat from './service/wechat.vue'
export default {
  name: 'app',
  components: {
      Wechat
    },
}
</script>

<style lang="scss">
$background:#ccc;
#app{
	height: 100%;
	background-color: $background;
}
</style>
