<template>
  <div class="center">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>搜索商品</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="goodbox">
      <div
        v-for="item in productList"
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
          <div class="good-price">${{ item.price }}</div>
        </a>
      </div>
    </div>
    <el-pagination
      :current-page="currentPage4"
      :page-size="limit"
      :small="true"
      :page-sizes="[2, 4, 6, 8]"
      :disabled="disabled"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { reactive, ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import moment from "moment";
moment.locale("zh-cn");
const goodslist = ref([]);
const store = useStore();
const router = useRouter();
import axios from "axios";
// 分頁器
const page = ref(1);
const limit = ref(8);
const count = ref(3);

const productList = ref(store.state.productList);
onMounted(() => {});
// const getgoodslist = async ()=>{
//   const res = await axios.get(`/webapi/product/productList`)
//   goodslist.value = res.data.data
//   console.log(goodslist.value);
// }

const handleChangepage = (id) => {
  router.push(`/index/${id}`);
};

// 分頁器當前顯示頁數
const handleSizeChange = (val) => {
  limit.value = val;
};
// 分頁器當前第幾頁
const handleCurrentChange = (val) => {
  page.value = val;
};
// const pageGoodList = computed(()=>{
//   return productList.value.slice((page.value-1)*limit.value , page.value * limit.value)
// })
</script>
<style lang="scss" scoped>
.center {
  width: 1295px;
  height: 100%;
  margin: 0 auto;
}
.goodbox {
  margin-top: 15px;
}
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
  // background-color: skyblue;
  width: 311px;
  height: 400px;
  margin-left: 10px;
  margin-top: 10px;
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
.el-pagination {
  justify-content: center;
  margin-top: 3rem;
  width: 100%;
}
@media screen and (max-width: 768px) {
  .center {
    margin: 0;
    width: 100%;
    overflow: hidden;
    // background: pink;
  }
  .el-carousel {
    width: 100%;
  }

  .goodbox {
    // background: pink;
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
    width: 100%;
    height: 100%;
    text-align: center;
    justify-content: space-around;
  }
  .good-pic {
    width: 8rem;
    height: 8rem;
  }
  .good-pic img {
    width: 15rem;
    height: 15rem;
  }
  .goodinnerbox {
    background-color: #e8e8e8;
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
  .user-name p:nth-child(2) {
    display: none;
  }
  .good-name {
    margin-top: 7rem;
  }
  .good-price {
  }
  .el-pagination {
    justify-content: center;
    margin-top: 3rem;
    width: 100%;
  }
}
</style>
