<template>
  <!-- 版心 -->
  <div class="center">
    <!-- 輪播圖 -->
    <el-carousel :interval="3000" arrow="always">
      <el-carousel-item v-for="item in swiper" :key="item">
        <img style="background-size:cover" :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 輪播圖 end-->
    <!-- 探索 -->
    <div class="discovery">
      <div><h3>探索大學商城</h3></div>
      <div class="discovery-img">
        <div>
          <img src="@/assets/1.png" alt="" />
          <h5>追蹤</h5>
        </div>
        <div>
          <img src="@/assets/2.png" alt="" />
          <h5>免費禮物</h5>
        </div>
        <div @click="categoryListProduct('1')">
          <img src="@/assets/3.png" alt="" />
          <h5>電腦科技</h5>
        </div>
        <div @click="categoryListProduct('2')">
          <img src="@/assets/4.png" alt="" />
          <h5>手機及配件</h5>
        </div>
        <div @click="categoryListProduct('3')">
          <img src="@/assets/5.png" alt="" />
          <h5>她的時尚</h5>
        </div>
        <div @click="categoryListProduct('4')">
          <img src="@/assets/6.png" alt="" />
          <h5>他的時尚</h5>
        </div>
        <div @click="categoryListProduct('5')">
          <img src="@/assets/7.png" alt="" />
          <h5>美妝保養</h5>
        </div>
        <div @click="categoryListProduct('6')">
          <img src="@/assets/8.png" alt="" />
          <h5>電玩遊戲</h5>
        </div>
      </div>
    </div>
    <!-- 探索end -->
    <!-- 推薦start -->
    <div class="suggtion-for"><h3>為你推薦</h3></div>
    <!-- 推薦end -->
    <!-- 商品 -->
    <div class="goodbox">
      <div
        v-for="item in pageGoodList"
        :key="item"
        class="goodinnerbox"
        @click="handleChangepage(item._id)"
      >
        <a class="user-box">
          <div class="user-pic">
            <img
              v-if="
                'http://localhost:3000' + item.avatar !==
                'http://localhost:3000undefined'
              "
              :src="'http://localhost:3000' + item.avatar"
              alt=""
            />
            <img
              v-else
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              alt=""
            />
          </div>
          <div class="user-name">
            <p>{{ item.username }}</p>
            <p>
              {{ moment(item.createTime).format("MMM Do YYYY  hh:mm a") }}發布
            </p>
          </div>
        </a>
        <a>
          <div class="good-pic">
            <img :src="'http://localhost:3000' + item.cover" alt="" />
          </div>
          <p class="good-name">{{ item.title }}</p>
          <div class="good-price">NT${{ item.price }}</div>
          <!-- {{pageGoodList}} -->
        </a>
      </div>
    </div>
    
    <el-pagination
      :default-page-size='10'
      :current-page="currentPage4"
      :page-size="limit"
      :small="true"
      :page-sizes="[2,4,6,8]"
      :disabled="disabled"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  <!-- 版心 -->
</template>

<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
moment.locale("zh-cn");
const goodslist = ref([]);
const store = useStore();
const router = useRouter();
const route = useRoute();
// 分頁器
const page = ref(1)
const limit = ref(8)
const count = ref()

import axios from "axios";

let swiper = reactive([
  require("@/assets/curseal1.jpg"),
  require("@/assets/curseal2.jpg"),
  require("@/assets/curseal3.jpg"),
  require("@/assets/curseal4.jpg"),
]);

onMounted(() => {
  getgoodslist();
  console.log(goodslist.value);
});

const getgoodslist = async () => {
  const res = await axios.get(`/webapi/product/productList`)
  goodslist.value = res.data.data;
  count.value = res.data.data.length
};
const pageGoodList = computed(()=>{
  return goodslist.value.slice((page.value-1)*limit.value , page.value * limit.value)
})

// 分頁器當前顯示頁數
const handleSizeChange = (val)=>{
  limit.value = val
}
// 分頁器當前第幾頁
const handleCurrentChange = (val)=>{
   page.value = val
}
// const pagenation = async ()=>{
//   const res = await axios.get('/webapi/product/pagenation',query)
//   total.value = res.data.total
// }

// 點選查看商品詳情
const handleChangepage = (id) => {
  router.push(`/index/${id}`);
};
// 依照商品數字分類
const categoryListProduct = (category) => {
  router.push(`/product/${category}`);
};
</script>

<style lang="scss" scoped>
.center {
  width: 1295px;
  height: 100%;
  margin: 0 auto;
}
// 分頁器
.el-pagination {
    justify-content: center;
    margin-top: 3rem;
    width: 100%;
}
// 輪播
.el-carousel {
  margin-top: 30px;
}
.el-carousel__item  {
  background-size: cover;
  height: 100%;
  text-align: center;
  color: #fff;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel img{
  background-size: cover;
  width:100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
// 輪播
// 探索
.discovery {
  margin-top: 30px;
}
.discovery-img {
  display: flex;
  justify-content: flex-start;
}
.discovery-img div {
  margin-top: 15px;
  margin-left: 55px;
}
.discovery-img img {
  width: 100px;
  height: 100px;
  cursor: pointer;
  transition: all 0.2s linear;
}
.discovery-img img:hover {
  background-color: #dae3ee;
  border-radius: 50px;
  position: relative;
  bottom: 10px;
  transition: 0.3 ease;
  opacity: 0.6;
}
.discovery-img h5 {
  text-align: center;
  font-size: 20px;
  font: 300;
  font-family: Arial, Helvetica, sans-serif;
}
// 推薦
.suggtion-for {
  margin-top: 10px;
}
// 推薦結束
// 商品
.goodbox {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  // background-color: skyblue;
}
.goodinnerbox {
  // border: 1px solid black;
  width: 311px;
  height: 400px;
  margin-left: 10px;
  margin-top: 20px;
  transition: all 0.2s linear;
  // background-color: #99a9bf;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.goodinnerbox:hover {
  transform: translateY(-2px);
  box-shadow: 15px 15px 30px rgba(0, 0, 0, 0.1);
}
.user-box {
  display: flex;
}
.user-pic img {
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background-size: cover;
}
.user-name {
  margin-left: 10px;
}
.good-pic {
  width: 100%;
  margin-right: 10px;
  background-size: cover;
}
.good-pic img {
  width: 305px;
  height: 320px;
  // margin-left: 45px;
}
.goodbox a {
  text-decoration: none;
  color: #2c2c2d;
  font-weight: 600;
}
// 手機端
@media screen and (max-width:768px) { 
  .center{
    margin: 0;
    width: 100%;
    overflow: hidden;
    // background: pink;
  }
  .el-carousel{
    width:100%
  }
  .discovery{
    width: 100%;
    overflow: hidden;
  }
  .discovery{
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
  }
   .discovery .discovery-img div{
    margin-top: 0;
    margin-left: 0.3px;
    flex:0 1 23%;
    box-sizing:border-box;
    
  }
  .discovery .discovery-img div h5{
    font-size:1em;
    font-weight: 200px;
  }
  .discovery-img{
    flex-wrap: wrap;
    text-align: center;
    justify-content: space-around;
  }
  .discovery-img div img{
    width: 4rem;
    height: 4rem;
  }
  .discovery-img div h5{
    font-size: .5em;
    height: 100%;
  }
  .goodbox{
    // background: pink;
    display: flex;
    flex-wrap: wrap;
    margin:10px 0;
    width: 100%;
    height: 100%;
    text-align: center;
    justify-content: space-around
  }
  .good-pic {
    width: 8rem;
    height: 8rem;
  }
  .good-pic img{
    width: 15rem;
    height: 15rem;
  }
  .goodinnerbox{
    font-family: monospace;
    background-color: #fbf6f6;
    // background: #475669;
    align-items: stretch;
    // justify-content: space-around;
    width: 17rem;
    padding: 8px;
    height: 21rem;
    margin-top: 3rem;
    margin-left: 0px;
  }
  .goodinnerbox a {
  }
  .user-name p:nth-child(2){
    display: none;
  }
  .good-name{
    margin-top: 7rem;
  }
  .good-price{

  }

  @media screen and (max-width:768px) { 
  .center{
    margin: 0;
    width: 100%;
    overflow: hidden;
    // background: pink;
  }
  .el-carousel{
    width:100%
  }

  .goodbox{
    // background: pink;
    display: flex;
    flex-wrap: wrap;
    margin:10px 0;
    width: 100%;
    height: 100%;
    text-align: center;
    justify-content: space-around
  }
  .good-pic {
    width: 8rem;
    height: 8rem;
  }
  .good-pic img{
    width: 15rem;
    height: 15rem;
  }
  .goodinnerbox{
    border:0.6px solid black;
    // background-color: #e8e8e8;
    // background: #475669;
    align-items: stretch;
    // justify-content: space-around;
    width: 17rem;
    padding: 8px;
    height: 21.5rem;
    margin-top: 3rem;
    margin-left: 0px;
  }
  .goodinnerbox a {
  }
  .user-name p:nth-child(2){
    display: none;
  }
  .good-name{
    margin-top: 7rem;
  }
  .good-price{

  }
}
}
</style>
