<template>
  <div class="outer-box">
    <el-form
      class="box"
      ref="registerFormRef"
      status-icon
      :model="registerForm"
      :rules="registerRules"
    >
      <h2>register</h2>
      <el-form-item label="帳號" prop="username" class="input-box">
        <el-input v-model="registerForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手機" prop="cellphone" class="input-box">
        <el-input v-model="registerForm.cellphone" class="input" />
      </el-form-item>
      <el-form-item label="密碼" prop="password" class="input-box">
        <el-input v-model="registerForm.password" type="password" />
      </el-form-item>
      <el-form-item label="確認密碼" prop="secpassword" class="input-box">
        <el-input v-model="registerForm.secpassword" type="text" />
      </el-form-item>
      <el-form-item class="btn-box">
        <el-button type="primary" @click="submitRegister(registerRules)"
          >註冊</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div  @click="goLogin" class="haveaccount">已有帳號,去登入~~~~~</div>
  </div>
</template>

<script setup>
import axios from "axios";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const registerFormRef = ref();

const registerForm = reactive({
  username: "",
  cellphone: "",
  password: "",
  secpassword: "",
});

const validatePass = (rule, value, callback) => {
  if (value !== registerForm.password) {
    callback(new Error("密碼不一致"));
  } else {
    callback();
  }
};

const registerRules = reactive({
  username: [
    {required: true,message: "請輸入帳號",trigger: "blur"},
    {min:3,max:10,message:'長度只能介於3-10位',trigger:"blur"}
  ],
  cellphone: [
    {required: true,message: "請輸入手機",trigger: "blur"},
    {min:10,max:10,message:'手機碼格式錯誤',trigger:"blur"}
  ],
  password: 
  [
    { required: true, message: "請輸入密碼", trigger: "blur" },
    { min:6,max:12,message:'密碼需介於6-12位',trigger:"blur"}
  ],
  // 二次確認密碼
  secpassword: [
    { required: true, message: "請輸入重新輸入密碼", trigger: "blur" },
    { validator: validatePass, trigger: "blur" },
  ],
});

const router = useRouter();

const submitRegister = () => {
  registerFormRef.value.validate((valid) => {
    console.log(valid);
    if (valid) {
      axios.post("/webapi/user/register", registerForm).then(res => {
        if (res.data.ActionType === "OK") {
          router.push("/login");
        }
        ElMessage({
        message: "註`冊成功",
        type: "success",
    });
      });
    }else{
          ElMessage.error('註冊失敗')
    }
  });
};

const resetForm = () => {
  registerForm.username = "";
  registerForm.cellphone = "";
  registerForm.password = "";
  registerForm.secpassword = ""
};

const goLogin = () =>{
  router.push("/login")
}
</script>

<style lang="scss" scoped>
.outer-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("@/assets/back.png");
  background-size: cover;
}
.outer-box h2 {
  padding-top: 15px;
}
.box {
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 450px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  background: rgba(50, 50, 50, 0.3);
}

.box > h2 {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
}

.box .input-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-bottom: 10px;
}
.box .input-box > label {
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
}
// 毛框
::v-deep .box .input-box > ::d-veep .el-input {
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  height: 35px;
  width: 250px;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  transition: 0.2s;
  outline: none;
  padding: 0 10px;
  letter-spacing: 1px;
}

::v-deep.box .input-box > .input:focus {
  border: 1px solid rgba(255, 255, 255, 0.8);
}

.box .btn-box {
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.box .btn-box > div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
}

::v-deep .box .btn-box > div > .el-button {
  width: 120px;
  height: 35px;
  border: 1px solid rgba(197, 81, 58, 0.8);
  background: rgba(197, 81, 58, 0.5);
  border-radius: 5px;
  transition: 0.2s;
}

::v-deep .box .btn-box > div > .el-button:nth-of-type(2) {
  margin-left: 10px;
}

.box .btn-box > div > .el-button:hover {
  border: 1px solid rgba(197, 81, 58, 0.8);
  background: rgba(197, 81, 58, 0.5);
}

.el-button {
  margin-top: 12px;
  width: 120px;
  height: 35px;
  border: 1px solid rgba(197, 81, 58, 0.8);
  background: rgba(197, 81, 58, 0.5);
  border-radius: 5px;
  transition: 0.2s;
  color: rgba(255, 255, 255, 0.9);
}
.el-button:hover {
  border: 1px solid rgba(197, 81, 58, 0.8);
  background: rgba(197, 81, 58, 0.5);
}
.el-button:hover {
  border: 1px solid rgba(197, 81, 58, 0.8);
  background: rgba(197, 81, 58, 0.5);
}
.haveaccount{
  // width:150px
  color:white;
  cursor: pointer;
}

@media screen and (max-width:410px){
  .outer-box{
    width: 100%;
  }
  .el-form{
    width: 100%;
  }
}
</style>

<style>
.input-box .el-form-item__label {
  color: aliceblue;
}
</style>