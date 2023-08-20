<template>
  <div class="center">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `index/${id}}` }"
        >商品詳情</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-card class="box-card">
      <div class="imgdiv">
        <img :src="'http://localhost:3000' + currentProduct.cover" alt="" />
      </div>
      <div class="goodstatus">
        <h1>{{ currentProduct.title }}</h1>
        <h1>NT${{ currentProduct.price }}</h1>
      </div>
      <div class="status">
        <h1>Context</h1>
        <div>{{ currentProduct.content }}</div>
        <p>刊登日期</p>
        <div>
          {{ moment(currentProduct.createTime).format("MMM Do YYYY  hh:mm a") }}
        </div>
      </div>
      <div class="btn">
        <el-button type="danger" @click="submitProduct">加入購物車</el-button>
        <el-button type="danger">立即購買</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import moment from "moment";
moment.locale("zh-cn");
const currentProduct = ref({});
const route = useRoute();
const router = useRouter();
const store = useStore();
const aaa = ref({});

onMounted(async () => {
  const res1 = await axios.get(`webapi/product/list/${route.params.id}`);
  currentProduct.value = res1.data.data[0];
});
// 添加購物車
const submitProduct = () => {
  if (store.state.userInfo.username) {
    axios.post("/webapi/product/shopcart", currentProduct.value).then((res, req) => {});
    ElMessage({
      message: "添加成功",
      type: "success",
    });
  }else{
    router.push('/login')
  }
    
};
</script>

<style scss="lang" scoped>
.center {
  width: 1295px;
  height: 100%;
  margin: 0 auto;
  padding-top: 20px;
}
.goodstatus {
  margin-top: 5px;
}
.box-card {
  margin-top: 10px;
}
.imgdiv {
  width: 30vw;
  height: 60vh;
  text-align: center;
  margin: 0 auto;
}
.imgdiv img {
  background-size: cover;
  width: 100%;
  height: 100%;
}
.status {
  margin-top: 20px;
  border-top: 1px solid darkcyan;
}

.status p {
  border-top: 1px black;
  margin-top: 1rem;
  font-family: monospace;
  font-size: 2em;
  font-weight: bold;
}
.btn button {
  margin-top: 15px;
}
@media screen and (max-width: 768px) {
  .center {
    width: 100%;
  }
  .imgdiv {
    background: #f9f8f8;
    width: 20rem;
    height: 20rem;
  }
  img {
    width: 100%;
    height: 100%;
    background: cover;
  }
}
</style>