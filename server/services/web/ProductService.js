const CartModel = require("../../models/CartModel")
const ProductModel = require("../../models/ProductModel")

const ProductService = {
  // 添加商品
    add:async ({title,content,category,cover,price,editTime,createTime,username,avatar,goodnum,ischeck})=>
    {
      return ProductModel.create({
        title,content,category,cover,price,editTime,createTime,username,avatar,goodnum,ischeck
      })
    },
    // 全部商品列表
    getList:async ()=>{ 
      return ProductModel.find({}).sort({_id:-1})
    },
    // 商品詳情
    getdetail:async(_id)=>{
      return ProductModel.find({_id})
    },
    // 獲取我刊登的商品
    getMyList:async({username}) =>{
      return ProductModel.find({username})
    },
    // 更新產品
    putMyItem:async({title,content,category,price,goodnum,_id,cover}) =>{
      // return ProductModel.updateOne({_id:body._id},body)
      if(cover){
        return ProductModel.updateOne({_id},{
          title,content,category,price,goodnum,cover
        })
      }else{
        return ProductModel.updateOne({_id},{
          title,content,category,price,goodnum
        })
      }
    },
    // 刪除我刊登的商品
    deleteItem:async({_id})=>{
      return ProductModel.deleteOne({
        _id
      })
    },
    // 添加到購物車
    addcart: async ({personalid,title,content,category,cover,price,createTime,username,avatar,goodnum,ischeck})=>
      {
        return CartModel.create({
          personalid,title,content,category,cover,price,createTime,username,avatar,goodnum,ischeck
        })
      },
    // 獲取購物車數據
    getcart: async ({personalid})=>{
      return CartModel.find({personalid})
    },
    changeNum:async({num,cartList})=>{
      // return CartModel.updateOne({
        
      // },(
        
      // ))
    },
    deleteCart:async({_id})=>{
      return CartModel.deleteOne({
        _id
      })
    },
    getcategory:async({category})=>{
      return ProductModel.find({category})
    },
    // getPagenation:async(total,query)=>{
    //   return ProductModel.find({}).countDocuments()
    // }
  }
module.exports = ProductService