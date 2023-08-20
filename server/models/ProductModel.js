const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductType = {
    title:String,
    content:String,
    category:Number,
    cover:String,
    price:String,
    editTime:Date,
    createTime:Date,
    username:String,
    avatar:String,
    goodnum:String,
    ischeck:Boolean,
}

const ProductModel = mongoose.model("Product",new Schema(ProductType))

module.exports = ProductModel