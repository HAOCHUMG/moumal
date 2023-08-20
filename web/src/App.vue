<template>
  <router-view/>
</template>

<script setup>
</script>

<style  lang="scss">
*{
  padding: 0px;
  margin: 0px;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
} 

@media screen and (max-width:768px){
  body{
  // max-width: 980px;
  // min-width: 320px;
  // margin: auto;
  // overflow-x: hidden;
  width: 100%;
  // background:pink
  font-family: monospace;
  } 
  html{
  font-size: 62.5%;
  width:100vw
  }

}

</style>


