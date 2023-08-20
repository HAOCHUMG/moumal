const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CartType = {
    personalid:String,
    title:String,
    content:String,
    category:Number,
    cover:String,
    price:String,
    createTime:String,
    username:String,
    avatar:String,
    goodnum:String,
    ischeck:Boolean,
}

const CartModel = mongoose.model("Cart",new Schema(CartType))

module.exports = CartModel