const { query } = require("express");
const ProductService = require("../../services/web/ProductService");
const JWT = require("../../util/JWT");

const ProductControllers = {
  add: async (req, res) => {
    console.log(req.file, req.body);
    const cover = req.file ? `/productuploads/${req.file.filename}` : " ";
    // const avatar = req.file?`/avataruploads/${req.file.filename}`:" "
    const { title, price, content, category, username, avatar, goodnum } =
      req.body;
    await ProductService.add({
      title,
      content,
      category: Number(category),
      price,
      cover,
      editTime: new Date(),
      createTime: new Date(),
      username,
      avatar,
      goodnum,
      ischeck:true
    });
    res.send({
      ActionType: "OK",
    });
  },
  getList: async (req, res) => {
    const result= await ProductService.getList()
    res.send({
        data:result,
    });
  },
  getdetail: async (req, res) => {
    const result = await ProductService.getdetail({ _id: req.params.id });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  getMyList: async (req,res) =>{
    const token = req.headers["authorization"].split(" ")[1];
    var payload = JWT.verify(token);
    console.log(payload.username);
    const result = await ProductService.getMyList({ username:payload.username });
    res.send({
      ActionType:"OK",
      data:result,
    });
  },
  putMyItem:async(req,res) =>{
    const cover = req.file ? `/productuploads/${req.file.filename}` : ""
    const {title,content,category,price,goodnum,_id} = req.body
    await ProductService.putMyItem({
      title,
      content,
      category,
      price,
      goodnum,
      _id,
      cover
    })
    res.send({
      ActionType:"OK",
    })
  },
  deleteItem:async(req,res) =>{
    await ProductService.deleteItem({ _id:req.params.id });
    res.send({
      ActionType: "OK",
    });
  },
  addcart: async (req, res) => {
    console.log(req.body);
    const {
      title,
      content,
      category,
      cover,
      price,
      createTime,
      username,
      avatar,
      goodnum,
    } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    var payload = JWT.verify(token);
    console.log(payload._id);

    await ProductService.addcart({
      personalid: payload._id,
      title,
      content,
      category: Number(category),
      cover,
      price,
      createTime,
      username,
      avatar,
      goodnum,
      ischeck:true
    });
    res.send({
      ActionType: "OK",
    });
  },
  getcart: async (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];
    var payload = JWT.verify(token);
    console.log(payload._id);
    const result = await ProductService.getcart({ personalid: payload._id });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
  // 更改購物車數量(未完成)
  changeNum: async (req, res) => {
    console.log(req.body);
    const { num, id } = req.body;
    const { cartList } = req.body.cartList;
    await ProductService.changeNum({ num, id, cartList });
    res.send({
      ActionType: "OK",
      data: num,
      id,
      cartList,
    });
  },
  // 刪除購物車其中一項數據
  deleteCart: async (req, res) => {
    await ProductService.deleteCart({ _id: req.params.id });
    res.send({
      ActionType: "OK",
    });
  },
  // 依商品類別分類
  getcategory: async (req, res) => {
    console.log(111111111);
    console.log(req.params.category);
    console.log(1111111111);
    const { category } = req.params;
    const result = await ProductService.getcategory({
      category: Number(category),
    });
    res.send({
      ActionType: "OK",
      data: result,
    });
  },
//   分頁器
//   getPagenation: async (req, res) => {
//     const total = await ProductService.getPagenation()
//     console.log(11111111111);
//     console.log(req.body);
//     console.log(11111111111);
//     res.send({  
//       total:total, 
//       ActionType: "OK",
//     });
//   },
};
module.exports = ProductControllers;
