<template>
   <div class="center">
        <div class="divline"></div>
        <div class="bottom">
         <div class="logo">
            <img src="@/assets/logobuttom.png" alt="">
            
         </div>
         <p>2023 大學商城</p>
         <div class="list">
            <a href="">幫助中心</a>
            <a href="">聯絡我們</a>
            <a href="">媒體</a>
            <a href="">永續發展</a>
            <a href="">成為公司廣告合作夥伴</a>
            <a href="">使用條款</a>
            <a href="">隱私政策</a>
         </div>
        </div>
   </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.center {
  width: 1295px;
  height: 100%;
  margin: 0 auto;
}
.divline{
   border-top: 0.1px solid black;
}
.logo img {
   width: 30px;
   height: 30px;
}
.bottom{
   display: flex;
   align-items: center;
   padding: 25px 0px
}
.list a{
   padding-left: 10px;
   text-decoration: none;
   font-size: 12px;
   color: black;
}
@media screen and (max-width:768px) { 
  .center{
   width: 100%;
   margin-top: 4rem;
  }
  .list{
   display: flex;
   flex-wrap: wrap;
   justify-content: flex-start;
  }
  .list a {
   align-self: center;
  }
}
</style>