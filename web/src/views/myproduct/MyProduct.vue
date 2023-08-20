<template>
<div class='center'>
      <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
    <el-breadcrumb-item>我的販售商品</el-breadcrumb-item>
  </el-breadcrumb>
    <el-row class="row">
    <el-col
      v-for="(item, index) in myproductList"
      :key="index"
      :span="6"
      class="col"
    >
      <el-card class="card">
        <el-tag class="ml-2" type="success">販售中</el-tag>
        <img :src="'http://localhost:3000' + item.cover" alt="" class="image"/>
        <div>
          <div class="infogood">
            <span class="username">{{item.title}}</span>
            <span class="remain">剩餘數量:{{item.goodnum}}</span>
          </div>  
          <span class="selltime">販售日期</span>:{{ moment(item.createTime).format("MMM Do YYYY  hh:mm a") }}
          <div class="bottom"> 
          <el-button type="success"  class="button" @click="EditMyProduct(item)">修改商品</el-button>
          <el-popconfirm title="你確定要刪除嗎?"
            confirmButtonText="確定"
            cancelButtonText="取消"
            @confirm="deleteMyitem(item)"
            >
              <template #reference>
                <el-button type="danger" class="button" >刪除商品</el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <!-- 編輯商品 -->
<el-dialog
    v-model="dialogVisible"
    class="dialog"
    title="編輯商品"
    :before-close="handleClose"
  >
  <el-form
      ref="productFormRef"
      :model="productForm"
      :rules="productFormRules"
      label-width="60px"
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
      <el-form-item label="商品數量" prop="goodNum" type="number">
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
          :on-change="handleChange"
        >
          <img
            v-if="productForm.cover"
            :src="uploadAvatar"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEditConfirm()">
           確認 
        </el-button>
      </span>
    </template>
  </el-dialog>
</div>

</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import axios from "axios";
import { reactive, ref, onMounted, computed } from "vue";
import { ElButton, ElDialog } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { CircleCloseFilled } from '@element-plus/icons-vue'
import { useStore } from "vuex";
const store = useStore();
import moment from "moment";
moment.locale("zh-cn");
const myproductList = ref({})
// 控制編輯
const dialogVisible = ref(false)
// 編輯表單
const productFormRef = ref()
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



onMounted(() => {
    getMyProductList()
    console.log(myproductList.value);
});

// 獲取我的商品
const getMyProductList = async() => {
    const res = await axios.get('/webapi/product/myproduct').then(res=>{
        myproductList.value = res.data.data
    })
}
// 刪除我的商品
const deleteMyitem = async(item)=>{
    console.log(item._id)
    await axios.delete(`/webapi/product/deletemyitem/${item._id}`)
    .then((res)=>{
        console.log(res.data);
    })
    getMyProductList()
}
//編輯
const EditMyProduct = (item)=>{
    // console.log(item)
    Object.assign(productForm,item)
    dialogVisible.value = true
    console.log(productForm);
}
// 更新圖片計算屬性
const uploadAvatar = computed(()=>
  productForm.cover.includes("blob")
  ? productForm.cover
  :'http://localhost:3000'+productForm.cover
)
// 圖片上傳操作
const handleChange = file =>{
    console.log(URL.createObjectURL(file.raw));
    productForm.cover = URL.createObjectURL(file.raw);
    productForm.file = file.raw
}
//編輯確認
const handleEditConfirm = ()=>{
    productFormRef.value.validate(async valid=>{
        if(valid){
            const params = new FormData()
            for(let i in productForm){
                params.append(i,productForm[i])
            }
            await axios.post(`/webapi/product/myproduct/${productForm._id}`,params,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
             dialogVisible.value = false
             getMyProductList()
             ElMessage({
             message: "編輯成功",
             type: "success",
            });
        }
    })
}
</script>

<style lang="scss" scoped>
.center {
  width: 1295px;
  height: 100%;
  margin: 0 auto;
}

.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
.ml-2{
    margin-bottom:8px;
    float: right;
}
.card{
    margin-top: 2rem;
    margin-bottom: 1rem;
}
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 5rem;
  height: 5rem;
  display: block;
}
.selltime{
    font-family: monospace;
    color:black;
    font-size: 1em;
    font-weight:bold
}
.username{
    font-weight:bold;
    text-align: center;
    text-align: left;
}
.infogood{
    display: flex;
    flex-direction: column;
}
@media screen and (max-width:768px) { 
  .center{
    margin: 0;
    width: 100%;
    overflow: hidden;
  }
  .col{
    max-width: 60%;
    flex: 01 50%;
  }
  .row{
    justify-content: center;
  }
  .demo-ruleForm{
    width: 100%;
    box-sizing: border-box;
  }
  .avatar-uploader .avatar{
    width:100%
  }
}
</style>