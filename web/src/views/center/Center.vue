<template>
  <div class="center">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/center' }"
        >個人中心</el-breadcrumb-item
      >
    </el-breadcrumb>
    <!-- 用戶訊息,圖片 -->
    <el-card class="box-card">
      <el-card class="box-card">
        <el-avatar :size="100" :src="avatarUrl"></el-avatar>
        <h3>{{ store.state.userInfo.username }}</h3>
        <h5>{{ store.state.userInfo.cellphone }}</h5>
      </el-card>
      <el-card class="box-card-info">
        <template #header>
          <div class="card-header">
            <span>公開檔案</span>
          </div>
        </template>
        <el-form
          ref="userFormRef"
          :model="userForm"
          :rules="userFormRules"
          label-width="80px"
          class="demo-ruleForm"
          status-icon
        >
          <!-- 用戶名 -->
          <el-form-item label="用戶名" prop="username">
            <el-input v-model="userForm.username" />
          </el-form-item>
          <!-- 手機 -->
          <el-form-item label="手機" prop="cellphone">
            <el-input v-model="userForm.cellphone" />
          </el-form-item>
          <!-- 個人簡介 -->
          <el-form-item label="個人簡介" prop="introduction">
            <el-input
              v-model="userForm.introduction"
              type="textarea"
              :rows="8"
            />
          </el-form-item>
          <!-- 頭像 -->
          <el-form-item label="頭像" prop="avatar">
            <el-upload
              class="avatar-uploader"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="handleChange"
            >
              <img v-if="userForm.avatar"
              :src="uploadAvatar" 
              class="avatar"
           />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <!-- 更新按鈕 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm()">更新</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>

<script setup>
import { ArrowRight } from "@element-plus/icons-vue";
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import axios from 'axios'
const store = useStore();
// 大頭貼的計算屬性
const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? 'http://localhost:3000'+store.state.userInfo.avatar
    : `https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`
);

// 更新圖片的計算屬性
const uploadAvatar = computed(()=>
  userForm.avatar.includes("blob")
  ? userForm.avatar
  :'http://localhost:3000'+userForm.avatar
)


const { username, cellphone, introduction, avatar } = store.state.userInfo;
const userFormRef = ref();
const userForm = reactive({
  username,
  cellphone,
  introduction,
  avatar,
  file:null
});
const userFormRules = reactive({
  username: [{ required: true, message: "請輸入姓名", trigger: "blur" }],
  cellphone: [{ required: true, message: "請輸入手機號", trigger: "blur" }],
  introduction: [{ required: true, message: "請輸入自我介紹", trigger: "blur" }],
  avatar: [{ required: true, message: "請輸入姓名", trigger: "blur" }],
});
// 圖片上傳操作
const handleChange = file =>{
    console.log(URL.createObjectURL(file.raw));
    userForm.avatar = URL.createObjectURL(file.raw);
    userForm.file = file.raw
// 統一更新 
}
const submitForm = ()=>{
    userFormRef.value.validate((valid)=>{
        if(valid){
            console.log("submit",userForm);
            const params = new FormData()
            for(let i in userForm){
                params.append(i,userForm[i])
            }
            axios.post("/webapi/user/upload",params,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            }).then(res=>{
                console.log(res.data);
                if(res.data.ActionType==="OK"){
                  store.commit("changeUserInfo",res.data.data)
                  ElMessage.success("更新成功")
                }
            })
        }
    })
}
</script>

<style lang="scss" scoped>
.box-card{
    margin-top:15px
}
.box-card-info{
    margin-top:15px
}
.el-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.center {
  width: 1295px;
  height: 100%;
  margin: 0 auto;
  padding-top: 5px;
}
.box-card {
  text-align: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style lang="scss" scoped>
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
@media screen and (max-width:768px){
  .center{
    width: 100%;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content:space-around;
  }
  .demo-ruleForm{
    
  }
}
</style>