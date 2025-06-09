import {UpdateCartCheckout} from "../../data/cart.js";

export function renderCheckoutHeader(){
    document.querySelector('.checkout-header-middle-section').innerHTML=`Checkout (<a class="return-to-home-link js_checkout_item_quantity" href="amazon.html">${UpdateCartCheckout()} items</span></a>)`;
}