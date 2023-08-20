<template>
  <!-- 導航欄 -->
  <div class="center">
    <nav class="menu-side" ref="slidemenu">
      <div class="menu-logo">
        <div class="img">
          <img :src="avatarUrl" alt="" />
          <span> 歡迎回來{{ store.state.userInfo.username }} </span>
        </div>
        <el-icon class="crossLogo" @click="slideMenu"><CloseBold /></el-icon>
      </div>
      <ul class="menu-item" id="#css">
        <li>
          <el-icon><HomeFilled /></el-icon>
          <a @click="goToHome">嘴哥商城</a>
        </li>
        <li>
          <el-icon><Goods /></el-icon>
          <a @click="goSell">出售商品</a>
        </li>
        <li>
          <el-icon><ShoppingCartFull /></el-icon>
          <a @click="goCart">購物商車</a>
        </li>
        <li>
          <el-icon><Sell /></el-icon>
          <a @click="goMyProduct">我的商品</a>
        </li>
        <li>
          <el-icon><Sunrise /></el-icon>
          <a @click="logout">登出離開</a>
        </li>
      </ul>
    </nav>
    <header class="menu-bar">
      <h1 class="logo" @click="goToHome">嘴哥<span>商城.</span></h1>
      <!-- 搜尋部分 -->
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
      <ul>
        <li><a href="">首頁</a></li>
        <li><a href="">合作邀約</a></li>
        <li><a href="">幫助中心</a></li>
        <li><a href="">產能合作</a></li>
      </ul>
      <!-- 登陸 -->
      <div v-if="!store.state.userInfo.username" class="gologin">
        <ul>
          <li @click="goLogin">登入</li>
          <li @click="goRegister">註冊</li>
        </ul>
      </div>
      <!-- 右上角人物顯示 -->
      <div v-else class="login-down">
        <div>
          歡迎回來<span> {{ store.state.userInfo.username }} </span>
        </div>
        <div class="img">
          <!-- 圖片默認,並做計算屬性 -->
          <img :src="avatarUrl" alt="" />
        </div>
        <!-- <el-icon class="icon-avatar"><UserFilled /></el-icon> -->
        <div class="drop-avatar">
          <div @click="goSell">出售商品</div>
          <div @click="goCenter">個人中心</div>
          <div @click="goMyProduct">我的商品</div>
          <div @click="goCart">購物車</div>
          <div @click="logout">登出</div>
        </div>
      </div>
      <!-- 人物樣式 -->
      <div class="sideMenu">
        <div
          class="sideLogin"
          @click="goLogin"
          v-if="!store.state.userInfo.username"
        >
          <span>登入</span>
        </div>
        <!-- @click="slideMenuOpen" -->
        <div v-else class="img">
          <!-- 圖片默認,並做計算屬性 -->
          <a @click="slideMenuOpen"><img :src="avatarUrl" alt="" /></a>
        </div>
      </div>
      <!-- 導航欄 end -->
    </header>
  </div>
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
const drawer = ref(false);
import axios from "axios";
const store = useStore();
const router = useRouter();
const searchText = ref("");
const visible = ref(false);
const searchList = ref([]);
const productList = ref([]);
const slidemenu = ref(null);
const menuitem = ref(null);
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

// 頭像
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? "http://localhost:3000" + store.state.userInfo.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);

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

const logout = () => {
  localStorage.removeItem("token");
  store.commit("clearUserInfo");
  slidemenu.value.style.display = "none";
  router.push("/index");
};
const goLogin = () => {
  router.push("/login");
};
const goRegister = () => {
  router.push("/register");
};
const goCenter = () => {
  router.push("/center");
};
const goSell = () => {
  router.push("/sellproduct");
  slidemenu.value.style.display = "none";
};
const goCart = () => {
  router.push("/cart");
  slidemenu.value.style.display = "none";
};
const goToHome = () => {
  router.push("/");
  slidemenu.value.style.display = "none";
};
const goMyProduct = () => {
  router.push("/myproduct");
  slidemenu.value.style.display = "none";
};

// 響應式拉伸菜單
const slideMenu = () => {
  slidemenu.value.style.display = "none";
};
const slideMenuOpen = () => {
  slidemenu.value.style.display = "block";
};
</script>

<style lang="scss" scoped>
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
.login-down:hover {
  background-color: #f0f1f1;
}
.login-down div {
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.icon-avatar {
  width: 50px;
  height: 50px;
  font-size: 30px;
  cursor: pointer;
}
.login-down:hover > .drop-avatar {
  display: block;
}
.drop-avatar {
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  position: absolute;
  bottom: -140px;
  right: -15px;
  margin: 10px;
  text-align: center;
  display: none;
  z-index: 9999;
}
.drop-avatar div {
  width: 100%;
  height: 100%;
  margin: 5px 0px;
}
.drop-avatar > div:hover {
  background-color: #f0f1f1;
  cursor: pointer;
}
.gologin {
  display: flex;
  justify-content: space-between;
}
.gologin > ul li {
  display: block;
  width: 104px;
  height: 100%;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}
.gologin > div:hover {
  background-color: #f0f1f1;
}
.center {
  width: 1295px;
  height: 100%;
  margin: 0 auto;
}
.logo {
  color: black;
  font-size: 30px;
  position: absolute;
  left: 0px;
  cursor: pointer;
}
.logo span {
  color: gray;
}
.menu-bar {
  // background-color: #fff;
  // background-color:#F2F3F5;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 0 5%;
  // 相對定位
  position: relative;
  // margin-right:50px ;
}
.menu-bar ul {
  list-style: none;
  display: flex;
}
.menu-bar ul li {
  padding: 20px;
  position: relative;
}
.menu-bar ul li a {
  font-size: 16px;
  color: black;
  text-decoration: none;
  transition: all 0.3s;
  font-weight: bold;
}
.menu-bar ul li a:hover {
  font-weight: bold;
}
.menu-bar .icon:hover {
  color: #0073ff;
}
.icon {
  color: #e9e9e9;
}
// 下拉隱藏
.dropdown-menu {
  display: none;
}
.dropdown-menu ul li {
  width: 100px;
  text-align: center;
}

.menu-bar ul li:hover .dropdown-menu {
  display: block;
  z-index: 999;
  position: absolute;
  left: 0;
  top: 100%;
  border: 0.5px solid black;
  background-color: white;
}
.menu-bar ul li:hover .dropdown-menu ul {
  display: block;
  margin: 5px;
}
.menu-bar ul li:hover {
  background-color: #f0f1f1;
}
.login {
  // margin-left:20px
}
.person-status {
  margin-top: 6px;
}
.goregister::before {
  content: "";
}
.goregister {
  margin-left: 10px;
}
// 搜索框
.search {
  display: flex;
  // justify-content: center;
  margin-top: 5px;
  width: 300px;
  height: 50px;
  margin-left: 200px;
}
.search input {
  position: relative;
  left: 150px;
  background-color: #fff;
  // border: 0;
  border-right: 1px solid black;
  font-size: 18px;
  height: 50px;
  width: 300px;
  padding-top: 7.5px;
  // outline: none;
}
.btn {
  position: relative;
  left: 150px;
  display: flex;
  background-color: #fff;
  // border: 0;
  cursor: pointer;
  height: 50px;
  width: 50px;
  transition: transform 0.3 ease;
  font-size: 24px;
}

.btn:hover {
  background-color: gray;
}
.btn .el-icon {
  margin-top: 6.5px;
  margin-left: 4px;
  font-size: 30px;
}
input::-webkit-input-placeholder {
  position: relative;
  bottom: 2.5px;
}
.search-item {
  height: 50px;
  line-height: 50px;
  &:hover {
    background-color: #f0f1f1;
    color: black;
    cursor: pointer;
  }
}
.el-button {
  margin-left: 300px;
}
.sideMenu {
  display: none;
}
.menu-side {
  display: none;
}
.goToHome {
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .center {
    margin: 0;
    width: 100%;
    // background: #0073ff;
    // background: #0073ff;
  }
  .el-input {
    width: 100%;
  }
  .search {
    width: 100%;
  }
  .menu-bar {
    width: 100%;
  }
  .logo {
    color: darkblue;
    font-size: 2rem;
  }
  .search {
    transform: translateX(-90px);
  }
  .menu-bar ul li {
    display: none;
  }
  .login-down {
    display: none;
  }
  .sideMenu {
    display: flex;
    // align-content: center;
    justify-content: flex-start;
    // display: block;
    transform: translateX(-2rem);
  }
  :target#css{
    display: block;
  }
  .sideMenu span {
    align-items: center;
    font-size: 2em;
    margin-top: 13px;
    margin-right: 10px;
  }
  .img img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 10px;
  }
  .menu-side {
    display: block; //稍後處理
    position: absolute;
    border-bottom: 1px solid black;
    width: 100vw;
    height: 80vh;
    background: #fff;
    z-index: 999;
    display: flex;
    flex-direction: column;
    display: none;
    // visibility: hidden;
    // opacity: 0;
    // transition: all 2s ease-in;
  }
  .menu-side .menu-logo {
    // width:98vw;
    font-size: 2.5em;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: space-between;
  }
  .menu-side .menu-item {
    height: 30vh;
    font-size: 3em;
    display: flex;
    // justify-content: space-around;
    flex-direction: column;
    align-items: center;
  }
  .menu-item li {
    margin-top: 5rem;
    width: 15rem;
    height: 15px;
    display: flex;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
  }
  .menu-item li:hover {
    background: #fff;
  }
  .menu-item li a {
    // display: block;
    // margin-top:5rem;
    font-weight: bold;
    text-decoration: none;
    color: black;
  }
  .crossLogo {
    font-size: 2em;
    font-family: monospace;
  }
  .img {
    display: flex;
    align-items: center;
  }
  .img img {
    display: flex;
    align-items: center;
    margin-top: 0px;
    font-size: 2em;
  }
  .sideLogin {
    width: 53px;
    font-family: monospace;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
