const UserService = require("../../services/web/UserService")
const JWT = require("../../util/JWT")
const UserControllers = {
    login:async (req,res)=>{
       console.log(req.body) 
       var result =  await UserService.login(req.body)
       if(result.length === 0){
        res.send({
            code:"-1",
            error:"用戶名與密碼不匹配"
        })
       }else{
        // 生成token
        const token = JWT.generate({
            _id:result[0]._id,
            username:result[0].username
        },'1d')
        res.header("Authorization",token)
        res.send({
            ActionType:"OK",
            data:{
                // _id:result[0]._id,
                username:result[0].username,
                cellphone:result[0].cellphone,
                price:result[0].price,
                pname:result[0].pname,
                category:result[0].category,
                goodpic:result[0].goodpic,
                avatar:result[0].avatar,
                introduction:result[0].introduction
            }
        })
       }  
    },
    register:async(req,res)=>{
        console.log(req.body);
        const {username,cellphone,password,secpassword} = req.body
        await UserService.register({
            username,cellphone,password,secpassword
        })
        res.send({
            ActionType:"OK"
        })
    },
    upload:async(req,res)=>{
        // 用token把裡面存的id取出
        console.log(req.body,req.file);
        const {username,introduction,cellphone} = req.body
        const avatar = req.file?
        `/avataruploads/${req.file.filename}`:""    
        const token = req.headers["authorization"].split(" ")[1]
        var payload = JWT.verify(token)
        // console.log(payload._id)
        // 調用service
        await UserService.upload({_id:payload._id,username,introduction,cellphone,avatar})
        if(avatar){
            res.send({
                ActionType:"OK",
                data:{
                    username,introduction,avatar,cellphone
                }
            })
        }else{
            res.send({
                ActionType:"OK",
                data:{
                    username,introduction,cellphone
                }
            })
        }
        
    },   
}
module.exports = UserControllers 