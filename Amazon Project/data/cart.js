export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    Quantity: 1
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    Quantity: 3
  }
];
export function addToCart(productId){
    let matchedItem;
      cart.forEach((item)=>{
        if(item.productId === productId){
          matchedItem = item;
        }
      });
      if(matchedItem){
        matchedItem.Quantity+=1;
      }else{
        cart.push({
        productId,
        Quantity: 1
        });
      };
  };