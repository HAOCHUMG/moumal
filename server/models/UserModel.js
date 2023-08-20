const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserType = {
    // _id:String,
    username:String,
    password:String,
    price:String,
    pname:String,
    category:String,
    avatar:String,
    goodpic:String,
    secpassword:String,
    cellphone:String,
    introduction:String,
}

const UserModel = mongoose.model("User",new Schema(UserType))

module.exports = UserModel