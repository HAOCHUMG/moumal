<template>
  <div>
      <TopHeader/>
      <router-view></router-view>
      <Buttom/>
  </div>
</template>

<script setup>
  import {useStore} from 'vuex'
  import Buttom from '../components/MainBox/Buttom.vue'
  import TopHeader from '../components/MainBox/TopHeader.vue'
  const store =  useStore()
  console.log(store.state);
</script>

<style lang="scss" scoped>
.el-main{
  height:100vh
}
</style>
