import {isValidDeliveryOptionId} from "../data/deliveryOptions.js";
function Cart (localStorageKey){
  const cart = {
    cartItems: undefined,

    loadFromStorage(){                                    // Load cart from local storage
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        console.log("this the JSON parse")
        console.log(this.cartItems)
        if(!this.cartItems){
          this.cartItems = [
            {
              productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              Quantity: 2,
              deliveryOptionsId: '1'
            },
            {
              productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              Quantity: 1,
              deliveryOptionsId: '2'
            }
          ];
        };
    },

    addToCart(productId){
        let matchedItem;
          this.cartItems.forEach((item)=>{
            if(item.productId === productId){
              matchedItem = item;
            }
          });
          if(matchedItem){
            matchedItem.Quantity+=1;
          }else{
            this.cartItems.push({
            productId,
            Quantity: 1,
            deliveryOptionsId: '1'
            });
          };
        this.saveToStorage();
    },

    removeFromCart(productId){
        const tempCart = []
        this.cartItems.forEach((cartItem)=>{
          if(cartItem.productId !== productId){
            tempCart.push(cartItem)
          };
        });
        this.cartItems = tempCart;
        this.saveToStorage();
    },

    saveToStorage(){
        localStorage.setItem(localStorageKey,JSON.stringify(this.cartItems));
    },

    UpdateCartCheckout(){
        let cart_Quantity = 0;
          this.cartItems.forEach((item)=>{
            cart_Quantity+=item.Quantity;
          });
        return cart_Quantity;
    },

    updateDeliveryOptionId(productId,DeliveryOptionId){
        let macthingItem;
        this.cartItems.forEach((cartItem)=>{
          if(cartItem.productId === productId){
            macthingItem = cartItem;
          }
        });
        if (!macthingItem || !isValidDeliveryOptionId(DeliveryOptionId)){
          return;
        }
        macthingItem.deliveryOptionsId = DeliveryOptionId;
        this.saveToStorage();
    },
    UpdateCartQuantityFromCheckout(id,number){
        this.cartItems.forEach((item)=>{
          if(item.productId === id){
            item.Quantity = number;
          };
        });
        this.saveToStorage();
      }
  }
  return cart;
}

const cart = Cart('cart-OOP');      
// Here by callling 2 different keys I can get each Cart varity with its own Storage (its like I have 2 box with different 
// lock and I need to just give the keys)
const Business = Cart('Bussines');

cart.loadFromStorage();
Business.loadFromStorage();


console.log(cart);
console.log(Business);

// cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
// console.log(cart)