<template>
  <!-- 麵包屑 -->
  <div class="center">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/sellproduct' }"
        >出售商品</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-form
      ref="productFormRef"
      :model="productForm"
      :rules="productFormRules"
      label-width="80px"
      class="demo-ruleForm"
      status-icon
    >
      <!-- 商品名 -->
      <el-form-item label="商品名稱" prop="title">
        <el-input v-model="productForm.title"/>
      </el-form-item>
      <!-- 商品分類 -->
      <el-form-item label="商品分類" prop="category">
        <el-select
          v-model="productForm.category"
          clearable
          placeholder="Select"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <!-- 商品價格 -->
      <el-form-item label="價格" prop="price" type="number" style="width:100%;">
        <el-input v-model="productForm.price" />
      </el-form-item>
      <!-- 商品數量 -->
      <el-form-item label="商品數量" prop="goodnum" type="number">
        <el-input v-model="productForm.goodnum" />
      </el-form-item>
      <!-- 商品簡介 -->
      <el-form-item label="商品簡介" prop="content">
        <el-input v-model="productForm.content" type="textarea" :rows="8" />
      </el-form-item>
      <!-- 商品頭像 -->
      <el-form-item label="商品圖片" prop="cover">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="handleSellChange"
        >
          <img
            v-if="productForm.cover"
            :src="productForm.cover"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <!-- 按鈕 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm()">立即出售</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { useStore } from "vuex";
import { useRouter }  from "vue-router"
import axios from "axios";
const store = useStore();
const router = useRouter()

const productFormRef = ref();
const productForm = reactive({
  title: "",
  price: "",
  content: "",
  category: 1,
  cover: "",
  file: null,
  username: store.state.userInfo.username,
  avatar: store.state.userInfo.avatar,
  goodnum:""
});
const productFormRules = reactive({
  title: [{ required: true, message: "請輸入商品名稱", trigger: "blur" }],
  content: [{ required: true, message: "請輸入內容", trigger: "blur" }],
  category: [{ required: true, message: "請選擇分類", trigger: "blur" }],
  cover: [{ required: true, message: "請上傳圖片", trigger: "blur" }],
  price: [{ required: true, message: "請輸入價錢", trigger: "blur" }],
  goodnum: [{ required: true, message: "請輸入數量", trigger: "blur" }],
});

const options = [
  {
    label: "電腦科技",
    value: 1,
  },
  {
    label: "手機及配備",
    value: 2,
  },
  {
    label: "她的時尚",
    value: 3,
  },
  {
    label: "他的時尚",
    value: 4,
  },
  {
    label: "美妝保養",
    value: 5,
  },
  {
    label: "電玩遊戲",
    value: 6,
  },
];

// 圖片上傳
const handleSellChange = (file) => {
  console.log(file);
  productForm.cover = URL.createObjectURL(file.raw);
  productForm.file = file.raw;
};
// 提交
const submitForm = () => {
  productFormRef.value.validate((valid) => {
    if (valid) {
      console.log(productForm);
      const params = new FormData();
      for (let i in productForm) {
        params.append(i, productForm[i]);
      }
      axios
        .post("/webapi/product/add", params, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          router.push('/index')
        });
        ElMessage({
        message: "添加商品成功",
        type: "success",
  });      
    }
  });
  
};
</script>

<style lang="scss" scoped>
.center {
  width: 1295px;
  height: 100%;
  margin: 0 auto;
  padding-top: 5px;
}
.el-form {
  margin-top: 50px;
}
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
@media screen and (max-width:768px){
  .demo-ruleForm{
    width: 100%;
    padding: 3rem;
  }
  .center{
    width:100%
  }

}
</style>