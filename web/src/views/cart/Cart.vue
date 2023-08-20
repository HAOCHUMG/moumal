<template>
  <div class="center">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item>購物車</el-breadcrumb-item>
    </el-breadcrumb>
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">價錢</div>
        <div class="cart-th4">數量</div>
        <div class="cart-th5">總價</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartList" :key="item._id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="item.ischeck"
              @click="handleCheck(item)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="'http://localhost:3000' + item.cover" />
            <div class="item-title">{{ item.title }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">NT${{ item.price }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="mins(item)">-</a>
            <input
              v-model="item.goodnum"
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              @change="handleNum($event.target.value * 1, item)"
            />
            <a href="javascript:void(0)" class="plus" @click="plus(item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">NT${{ item.price * item.goodnum }}</span>
          </li>
          <!--  -->
          <li class="cart-list-con7">
            <el-popconfirm
              title="你確定要刪除嗎?"
              confirmButtonText="確定"
              cancelButtonText="取消"
              @confirm="deleteCart(item)"
            >
              <template #reference>
                <el-button>刪除</el-button>
              </template>
            </el-popconfirm>
            <br />
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="choosegoods == totalgoods"
          @change="isAll($event)"
        />
        <span>全選</span>
      </div>
      <!-- <div class="option">
        <a href="#none">刪除選中的商品</a>
        <a href="#none">清除下列商品</a>
      </div> -->
      <div class="money-box">
        <div class="chosed">
          已選擇<span>{{ choosegoods }}</span
          >件商品 /總共<span>{{ totalgoods }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>總價(不含運費) ：</em>
          <i class="summoney">{{ countGoodnumTotal }}</i>
        </div>
        <div class="sumbtn">
          <a @click="choosegoods" class="sum-btn" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";
import axios from "axios";
import { cardProps } from "element-plus";
const cartList = ref({});
const route = useRoute();

onMounted(() => {
  getCardList();
  console.log(cartList.value);
});

const getCardList = async () => {
  const res = axios.get("/webapi/product/getshopcart").then((res) => {
    // console.log(res.data);
    cartList.value = res.data.data;
  });
};
// 商品總數
const totalgoods = computed(() => {
  return cartList.value.length;
});
// 選中商品
const choosegoods = computed(() => {
  let choseNum = 0;
  for (let i = 0; i < cartList.value.length; i++) {
    if (cartList.value[i].ischeck === true) {
      choseNum++;
    }
  }
  return choseNum;
});
// 全選或不選
const isAll = (event) => {
  cartList.value.forEach((item) => {
    item.ischeck = event.target.checked;
  });
};

const countGoodnumTotal = computed(() => {
  let sum = 0;
  for (let i = 0; i < cartList.value.length; i++) {
    if (cartList.value[i].ischeck === true) {
      sum += cartList.value[i].price * cartList.value[i].goodnum;
    }
  }
  return sum;
});

// const handleNum=(type,num,id,cartList)=>{

//    console.log(type,num,cartList);
//    axios.post("/webapi/product/changeNum",{num,id,cartList}).then(res=>{
//       console.log(res.data);
//    });
// }
// 數量
const mins = (item) => {
  if (item.goodnum <= 1) {
    item.goodnum === 1;
  } else {
    item.goodnum--;
  }
};
const plus = (item) => {
  item.goodnum++;
};
const handleNum = (num, item) => {
  if (isNaN(num) || num < 1) {
    item.goodnum = 0;
  } else {
    item.goodnum = parseInt(num);
  }
};
// 刪除
const deleteCart = (item) => {
  console.log(item);
  axios.delete(`/webapi/product/deleteCart/${item._id}`).then((res) => {
    console.log(res.data);
  });
  getCardList();
};

const handleCheck = (item) => {
  cartList.value.forEach((v) => {
    if (v._id === item._id) {
      v.ischeck = !v.ischeck;
    }
  });
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
li {
  list-style: none;
}
.center {
  width: 1295px;
  height: 100%;
  margin: 0 auto;
  padding-top: 20px;
  display: flex;
  flex-direction: column;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    display: flex;
    flex-direction: column;
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      display: flex;
      // overflow: hidden;

      & > div {
        // float: left;
      }

      .cart-th1 {
        width: 18%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 31%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        display: flex;
        align-items: center;

        & > li {
          // float: left;
        }

        .cart-list-con1 {
          width: 16%;
        }

        .cart-list-con2 {
          width: 32%;
          display: flex;
          align-items: center;

          img {
            width: 82px;
            height: 82px;
            margin-right: 2rem;
            float: left;
          }

          .item-msg {
            float: left;
            width: 100%;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 20.8333%;
        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          width: 12%;
        }

        .cart-list-con5 {
          width: 13%;
          display: flex;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            // float: left;
            color: #666;
            width: 20px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 36px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 20px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    // overflow: hidden;
    display: flex;
    align-items: center;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      // overflow: hidden;
      // float: left;

      span {
        // vertical-align: middle;
      }

      input {
        // vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      // float: left;

      a {
        // float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      // float: right;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        // float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>