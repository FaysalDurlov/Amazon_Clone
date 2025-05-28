import {cart, addToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import {formatCurrency} from './utils/money.js';


let productsHTML = '';
let timeoutId;


products.forEach((product)=>{
    productsHTML+=`
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCent)}
          </div>

          <div class="product-quantity-container">
            <select class="js_quantity_selector_${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>
          
          <div class="added-to-cart js_added_massage_${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});
document.querySelector('.products-grid').innerHTML = productsHTML; // Here I just updated product html dymnamicly


function UpdateCartQuantity(){
  let cartQuantity = 0;
    cart.forEach((item)=>{
      cartQuantity+=item.Quantity;
    });
    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
    console.log(cart);

};

document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
  button.addEventListener('click',()=>{
    const productId = button.dataset.productId;
    addToCart(productId);
    UpdateCartQuantity();
    
    let value = Number(document.querySelector(`.js_quantity_selector_${productId}`).value);
    document.querySelector(`.js_quantity_selector_${productId}`).value = '1';
    console.log(value);
    document.querySelector(`.js_added_massage_${productId}`).classList.add('opacityClass');
    clearTimeout(timeoutId);
    timeoutId = setTimeout(()=>{
      document.querySelector(`.js_added_massage_${productId}`).classList.remove('opacityClass');
    },2000);
  });
});