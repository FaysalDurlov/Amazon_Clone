import {isValidDeliveryOptionId} from "../data/deliveryOptions.js";
export let cart;
loadFromStorage();

export function loadFromStorage(){ // Load cart from local storage
  cart = JSON.parse(localStorage.getItem('cart'));
  if(!cart){
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }
    ];
  };
};

export function addToCart(productId){
    let matchedItem;
      cart.forEach((item)=>{
        if(item.productId === productId){
          matchedItem = item;
        }
      });
      if(matchedItem){
        matchedItem.quantity+=1;
      }else{
        cart.push({
        productId,
        quantity: 1,
        deliveryOptionId: '1'
        });
      };
    saveToStorage();
  };

export function removeFromCart(productId){
  const tempCart = []
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId){
      tempCart.push(cartItem)
    };
  });
  cart = tempCart;
  saveToStorage();
};

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
};

export function UpdateCartCheckout(){
  let cart_Quantity = 0;
    cart.forEach((item)=>{
      cart_Quantity+=item.quantity;
    });
  return cart_Quantity;
};

export function UpdateCartQuantityFromCheckout(id,number){
  cart.forEach((item)=>{
    if(item.productId === id){
      item.quantity = number;
    };
  });
  saveToStorage();
};

export function updateDeliveryOptionId(productId,DeliveryOptionId){
  let macthingItem;
  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      macthingItem = cartItem;
    }
  });
  if (!macthingItem || !isValidDeliveryOptionId(DeliveryOptionId)){
    return;
  }
  macthingItem.deliveryOptionId = DeliveryOptionId;
  saveToStorage();
};

export function LoadCart(fun){
  let xhr = new XMLHttpRequest()
  xhr.addEventListener("load",()=>{
    console.log(xhr.response);
  })
  xhr.open("GET","https://supersimplebackend.dev/cart");
  xhr.send()
  fun();
}