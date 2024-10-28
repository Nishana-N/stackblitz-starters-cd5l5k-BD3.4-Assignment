const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
]

//endpoint 1
function addtoCart(cart,productId,name,price,quantity){
  let newItem = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity
  }
  cart.push(newItem)
  return cart;
}
app.get("/cart/add",(req,res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addtoCart(cart,productId,name,price,quantity)
  res.json(result)
});


//endpoint 2
function UpdateCart(cart,productId,quantity){
  for(let i=0;i<cart.length;i++){
      if(cart[i].productId === productId){
        cart[i].quantity = quantity;
      }
  }
  return cart;
}
app.get("/cart/edit",(req,res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity) 
  let result = UpdateCart(cart,productId,quantity);
  res.json(result)
});


//endpoint 3
function  cartDelete(item, productId){
  return item.productId !== productId;
}
app.get("/cart/delete",(req,res) => {
  let productId = parseInt(req.query.productId);
  let result =cart.filter(item =>cartDelete(item,productId) ) 
  cart = result;
  res.json(result)
});


//endpoint 4
app.get("/cart",(req,res)=> {
  res.json({cartitems : cart})
});


//endpoint 5
function calculateTotalQuantity(cart){
  let totalQuantity = 0;
  for(let i=0;i<cart.length;i++){
    totalQuantity+= cart[i].quantity
  }
  return totalQuantity;
}
app.get("/cart/total-quantity",(req,res) => {
let result = calculateTotalQuantity(cart);
res.json({totalQuantity:result})
});


// //endpoint 6
function calculateTotalPrice(cart){
  let totalPrice = 0;
  for (let i=0;i<cart.length;i++){
    totalPrice+=cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}
app.get("/cart/total-price",(req,res) => {
  let result = calculateTotalPrice(cart);
  res.json({totalprice: result})
})







app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
