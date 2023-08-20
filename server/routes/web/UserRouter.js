var express = require('express');
const UserControllers = require('../../controllers/web/UserControllers');
var UserRouter = express.Router();
// 圖片上傳
const multer = require('multer')
// 用戶頭像部分
const upload = multer({ dest:'public/avataruploads/' })
// 商品部分

/* GET home page. */
// 登入
UserRouter.post("/webapi/user/login",UserControllers.login)
// 註冊
UserRouter.post("/webapi/user/register",UserControllers.register)
// 更新用戶頭像
UserRouter.post("/webapi/user/upload",upload.single('file'),UserControllers.upload)
// ===========================================
module.exports = UserRouter