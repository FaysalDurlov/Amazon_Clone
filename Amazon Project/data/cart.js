export const cart = [];
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