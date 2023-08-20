const UserModel = require("../../models/UserModel")

const UserService = {
    login:async({username,password})=>{
        return UserModel.find({
            username,
            password
        })
    },
    register:async({username,cellphone,password,secpassword})=>
    {
      return UserModel.create({
        username,cellphone,password,secpassword
      })
    },
    upload:async({_id,username,introduction,cellphone,avatar})=>{
      if(avatar){
        return UserModel.updateOne({
          _id
      },{
          username,introduction,cellphone,avatar
      })
      }else{
        return UserModel.updateOne({
          _id
      },{
          username,introduction,cellphone
      })
      }
    }
    
}

module.exports = UserService