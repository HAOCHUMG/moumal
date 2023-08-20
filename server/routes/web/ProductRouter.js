var express = require('express');
const ProductControllers = require('../../controllers/web/ProductControllers');
var ProductRouter = express.Router();

const multer = require('multer');
const productupload = multer({ dest:'public/productuploads/' })

// 商品上傳
ProductRouter.post('/webapi/product/add',productupload.single('file')
,ProductControllers.add)
// 獲取商品列表
ProductRouter.get('/webapi/product/productList',ProductControllers.getList)
ProductRouter.get('/webapi/product/list/:id',ProductControllers.getdetail)
// 獲取我販售商品
ProductRouter.get('/webapi/product/myproduct',ProductControllers.getMyList)
// 刪除我販售商品
ProductRouter.delete('/webapi/product/deletemyitem/:id',ProductControllers.deleteItem)
// 更新我販售商品
ProductRouter.post('/webapi/product/myproduct/:id',productupload.single('file'),ProductControllers.putMyItem)
// 分頁器
// ProductRouter.get('/webapi/product/pagenation',ProductControllers.getPagenation)
//添加購物車
ProductRouter.post("/webapi/product/shopcart",ProductControllers.addcart)
// 獲取購物車列表
ProductRouter.get("/webapi/product/getshopcart",ProductControllers.getcart)
// 更改購物車數據
ProductRouter.post("/webapi/product/changeNum",ProductControllers.changeNum)
// 刪除購物車項目
ProductRouter.delete("/webapi/product/deleteCart/:id",ProductControllers.deleteCart)
//敲Enter進入商品列
ProductRouter.get('/webapi/product/getcategory/:category',ProductControllers.getcategory)



// 測試
// ProductRouter.route({
//     method:'GET',
//     url:'/webapi/product/productList',
//     async handler(req,res){
//         const product = await mongo.db.collection('products').find({})
//         .sort({_id:-1})
//         .limit(10)
//         .toArray()
//     }
// })
module.exports = ProductRouter