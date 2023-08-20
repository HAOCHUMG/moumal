<template>
<div class="img">
  <div class="formContainer">
    <h3>登入</h3>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      status-icon
      :rules="loginRules"
      label-width="80px"
      class="loginForm"
    >
      <!-- 帳號 -->
      <el-form-item label="帳號" prop="username" class="username">
        <el-input v-model="loginForm.username" autocomplete="off" />
      </el-form-item>
      <!-- 密碼 -->
      <el-form-item label="密碼" prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <!-- <el-form-item label="Age" prop="age">
      <el-input v-model.number="ruleForm.age" />
    </el-form-item> -->
      <!-- 按鈕 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登入</el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
    <div class="goRegister" @click="goRegister">沒有帳號去註冊~~~~</div>
  </div>
</div> 

</template>

<script setup>
import { reactive, ref } from "vue";
import {useRouter} from 'vue-router'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import axios from 'axios'
const store = useStore()

// 表單引用對象
const loginFormRef = ref();

const loginForm = reactive({
  username: "",
  password: "",
});

const loginRules = reactive({
  username: [
    {
      required: true,
      message: "請輸入帳號",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "請輸入密碼",
      trigger: "blur",
    },
  ],
});

const router = useRouter()
// 手動驗證表單
const submitForm = () => {
  loginFormRef.value.validate((valid)=>{
    console.log(valid);
    if(valid){
      axios.post('/webapi/user/login',loginForm).then(res=>{
        if(res.data.ActionType==="OK"){
            router.push('/index')
            console.log(res.data.data);
            store.commit("changeUserInfo",res.data.data)
        }else{
          ElMessage.error('帳號或密碼錯誤')
        }
      })
    }
  })
};
const resetForm = () => {
  loginForm.username=""
  loginForm.password=""
};

const goRegister = () => {
  router.push('/Register')
}
</script>

<style lang="scss" scoped>
.img{
  height: 100vh;
  background-image: url('@/assets/background.jpg');
  background-size: cover;
  margin:0px;
  padding: 0px;
}
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 25%;
  transform: translate(-50%);
  background-color: skyblue;
  background: rgba(0, 0, 0, 0.3);
  color: aliceblue;
  padding: 20px;

  h3{
    font-size: 30px;
    text-align: center;
    margin-top:40px
  }
  .loginForm{
    margin-bottom: 30px;
  }
}
.account {
  margin-top: 70px;
}
.el-form-item {
  margin-right: 50px;
}
::v-deep .el-form-item label {
  color: white;
}
.goRegister{
  text-align: center;
  cursor: pointer;
}
// 手機端
@media screen and (max-width:480px){
  .formContainer{
    width: 100%;
  }
}
</style>