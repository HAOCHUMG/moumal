<template>
  <header class="center">
    <div class="navbar">
      <div class="logo"><a @click="goToHome">MouMal</a></div>
      <ul class="links">
        <li><a @click="goSell">出售商品</a></li>
        <li><a @click="goCenter">個人中心</a></li>
        <li><a @click="goMyProduct">我的商品</a></li>
        <li><a @click="goCart">購物車</a></li>
        <li><a @click="logout">登出</a></li>
      </ul>
      <!-- 搜索 -->
      <div class="search">
        <el-popover
          placement="bottom"
          title="搜索結果"
          :width="300"
          :visible="visible"
        >
          <template #reference>
            <el-input
              v-model="searchText"
              class="inputSearch"
              placeholder="Type something"
              :prefix-icon="Search"
              type="Search"
              @input="visible = true"
              @blur="visible = false"
              @keydown.enter="enter(searchText)"
            />
          </template>

          <div v-if="searchListproduct.length">
            <div
              v-for="data in searchListproduct"
              :key="data._id"
              class="search-item"
              @click="goProduct(data.category)"
            >
              {{ data.title }}
            </div>
          </div>
          <div v-else>
            <el-empty description="無搜尋到內容" :image-size="50" />
          </div>
        </el-popover>
      </div>
      <!-- 右側登入與不登入頭像欄 -->
      <div v-if="!store.state.userInfo.username" class="action_btn_response">
        <a @click="goRegister" class="action_btn">Get Register</a>
        <a @click="goLogin" class="action_btn">Get Login</a>
      </div>
      <div v-else class="login-down">
        <div>
          歡迎回來<span> {{ store.state.userInfo.username }} </span>
        </div>
        <div class="img">
          <!-- 圖片默認,並做計算屬性 -->
          <img :src="avatarUrl" alt="" />
        </div>
      </div>
      <!-- 響應式顯示 -->
      <div class="toggle_btn" v-if="store.state.userInfo.username">
        <font-awesome-icon
          v-if="isOpen"
          @click="open"
          icon="fa-solid fa-bars"
        />
        <font-awesome-icon v-else @click="close" icon="fa-solid fa-xmark" />
      </div>
      <div v-else>
        <li><a @click="goLogin" class="login_btn">登入</a></li>
      </div>
    </div>
    <!-- 搜索結束 -->

    <!-- ...............下拉 .............................-->
    <div>
      <ul class="dropdown_menu" ref="slide">
        <li><a @click="goSell">出售商品</a></li>
        <li><a @click="goCenter">個人中心</a></li>
        <li><a @click="goCart">購物車</a></li>
        <li><a @click="goMyProduct">我的商品</a></li>
        <li><a @click="logout" class="action_btn">登出</a></li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import {
  ArrowDownBold,
  Search,
  Pointer,
  UserFilled,
  Expand,
  CloseBold,
  HomeFilled,
  Goods,
  ShoppingCartFull,
  Sunrise,
  Sell,
} from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { computed, ref, onMounted } from "vue";
import axios from "axios";
const store = useStore();
const router = useRouter();
const searchText = ref("");
const visible = ref(false);
const searchList = ref([]);
const productList = ref([]);
// 控制響應式菜單
const slide = ref(null);
const isOpen = ref(true);

const open = () => {
  slide.value.style.height = "240px";
  isOpen.value = false;
};
const close = () => {
  slide.value.style.height = "0px";
  isOpen.value = true;
};
// 響應式菜單結束*********************

// 獲取數據
onMounted(async () => {
  var res = await axios.get("/webapi/product/productList");
  // console.log(res.data);
  searchList.value = res.data.data;
});
// 搜尋
const searchListproduct = computed(() =>
  searchText.value
    ? searchList.value.filter((item) => item.title.includes(searchText.value))
    : []
);
// 點擊進入商品列
const goProduct = (category) => {
  router.push(`/product/${category}`);
  setTimeout(function () {
    window.location.reload();
  }, 50);
};

// 敲下enter 進入商品列
const enter = (searchText) => {
  store.commit("clearProductInfo");
  // 未完成模糊查詢接口(研究中)
  // axios.post(`webapi/product/enterinproduct`,searchList).then(res=>{
  //   console.log(res.data);
  // })
  // 模糊查詢
  const productList = [];
  console.log(searchText);
  console.log(searchList.value);
  searchList.value.forEach((item) => {
    if (item.title.indexOf(searchText) != -1) {
      productList.push(item);
      console.log(productList);
    }
    return productList;
  });
  store.commit("changeProductInfo", productList);
  router.push("/product");
  setTimeout(function () {
    window.location.reload();
  }, 100);
};
// 頭像
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);
// 路由跳轉
const logout = () => {
  localStorage.removeItem("token");
  store.commit("clearUserInfo");
  slide.value.style.height = "0px";
  isOpen.value = true;
  router.push("/index");
};
const goLogin = () => {
  router.push("/login");
  slide.value.style.height = "0px";
  isOpen.value = true;
};
const goRegister = () => {
  router.push("/register");
};
const goCenter = () => {
  slide.value.style.height = "0px";
  isOpen.value = true;
  router.push("/center");
};
const goSell = () => {
  slide.value.style.height = "0px";
  isOpen.value = true;
  router.push("/sellproduct");
};
const goCart = () => {
  slide.value.style.height = "0px";
  isOpen.value = true;
  router.push("/cart");
};
const goToHome = () => {
  slide.value.style.height = "0px";
  isOpen.value = true;
  router.push("/");
};
const goMyProduct = () => {
  slide.value.style.height = "0px";
  isOpen.value = true;
  router.push("/myproduct");
};
</script>


<style lang="scss" scoped>
.center {
  width: 100%;
  margin: 0 auto;
}
a {
  text-decoration: none;
  color: black;
  font-size: 1rem;
}
a:hover {
  color: orange;
}
// Header
header {
  position: relative;
  padding: 0 2rem;
}
.navbar {
  width: 100%;
  height: 4rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.navbar .logo a {
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
}
.navbar .links {
  display: flex;
  gap: 2rem;
}
.navbar .links a {
  cursor: pointer;
  font-weight:bold;
  font-family: monospace;
}

.navbar .toggle_btn {
  color: black;
  font-size: 1.5rem;
  cursor: pointer;
  display: none; //************** */
}
.action_btn_response {
  position: absolute;
  right: 10px;
}
.action_btn {
  background-color: orange;
  color: black;
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  border: none;
  outline: none;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
}
.action_btn:hover {
  scale: 1.05;
  color: #fff;
}
.action_btn:active {
  scale: 0.95;
}
.login_btn {
  display: none;
}
// 搜索
// 搜索結束
// 右上角頭像
.login-down span {
  margin-left: 10px;
  font-size: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.login-down {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 61px;
}
.login-down .img img {
  width: 30px;
  height: 30px;
  margin-top: 5px;
  margin-left: 8px;
  border-radius: 50%;
}
// .login-down:hover {
//   background-color: #f0f1f1;
// }
.login-down div {
  font-size: 16px;
  font-weight: bold;
  // cursor: pointer;
}
// 右上角頭像結束
// 下拉
.dropdown_menu {
  display: none; //******************* */
  position: absolute;
  right: 2rem;
  top: 60px;
  height: 0;
  width: 300px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  overflow: hidden;
  z-index: 999;
  transition: height 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.dropdown_menu.open {
  height: 240px;
}

.dropdown_menu li {
  padding: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dropdown_menu li a{
  cursor: pointer;
  align-items: center;
  font-weight: bold;
}

.dropdown_menu .action_btn {
  width: 100%;
  display: flex;
  justify-content: center;
}

@media (max-width: 992px) {
  .navbar .links,
  .navbar .action_btn {
    display: none; //************************ */
  }

  .navbar .toggle_btn {
    display: block;
  }

  .dropdown_menu {
    display: block;
  }
  // 未登入時出現
  .login_btn {
    background-color: rgb(241, 66, 2);
    color: black;
    padding: 0.5rem 1rem;
    border: none;
    outline: none;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    cursor: pointer;
    display: block;
  }
  .login_btn:hover {
    scale: 1.05;
    color: #fff;
  }
  .login_btn:active {
    scale: 0.95;
  }
  .login-down {
    display: none;
  }
}

@media (max-width: 576px) {
  .dropdown_menu {
    left: 2rem;
    width: unset;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .login-down {
    display: none;
  }
}
</style>