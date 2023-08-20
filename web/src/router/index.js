import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import MainBox from "../views/MainBox.vue";
import NotFound from "../views/notfound/NotFound.vue";
import Home from "../views/home/Home.vue";
import Product from "../views/product/Product.vue";
import Register from "../views/Register";
import Center from "../views/center/Center";
import SellProduct from "../views/sellproduct/SellProduct";
import ProductDetail from "../views/productdetail/ProductDetail";
import Cart from "../views/cart/Cart.vue";
import Category from "../views/category/Category";
import MyProduct from "../views/myproduct/MyProduct";
import store from "@/store";
import { ElMessage } from 'element-plus'

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: MainBox,
  },
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/:pathMath(.*)*",
    name: "Notfound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.addRoute("mainbox", {
  path: "/index",
  component: Home,
});
router.addRoute("mainbox", {
  path: "/product",
  component: Product,
});
router.addRoute("mainbox", {
  path: "/center",
  component: Center,
});
router.addRoute("mainbox", {
  path: "/sellproduct",
  component: SellProduct,
});
router.addRoute("mainbox", {
  path: "/index/:id",
  component: ProductDetail,
});
router.addRoute("mainbox", {
  path: "/cart",
  component: Cart,
});
router.addRoute("mainbox", {
  path: "/product/:category",
  component: Category,
});
router.addRoute("mainbox", {
  path: "/myproduct",
  component: MyProduct,
});
// 全局導航守衛
router.beforeEach((to, from, next) => {
  let token = store.state.userInfo.username;
  console.log(token);
  if(token){
    if(to.path==='/login'){
      next('/')
    }else{
      console.log('已登錄並去其他頁面');
    }
  }else{
    if(to.path === '/cart'){
      next('/')
      alert('請登入')
    }else if(to.path === '/myproduct'){
      next('/')
      alert('請登入')
    }else if(to.path === '/center'){
      next('/')
      alert('請登入')
    }else if(to.path === '/sellproduct'){
      next('/')
      alert('請登入')
    }
    console.log('未登錄');
  }
  next()
});
// 導航守衛

export default router;
