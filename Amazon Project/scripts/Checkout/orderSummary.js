import {cart, removeFromCart, UpdateCartCheckout, UpdateCartQuantityFromCheckout, updateDeliveryOptionId} from '../../data/cart.js';
import {products, getProductFromList} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';



export function renderOrderSummary(){
  let cartSummaryHTML = '';
  cart.forEach((cartItem)=>{
      const product_id = cartItem.productId;

      let matchedProduct = getProductFromList(product_id);

      // Delivery Option "Delivery date"
      const deliveryOptionId = cartItem.deliveryOptionsId;
      let deliveryOption = getDeliveryOption(deliveryOptionId);
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
      const deliveryDateString = deliveryDate.format('dddd, MMMM D');

      // This part is for Delivery Date Choosen by user

      cartSummaryHTML+=
      `<div class="cart-item-container js_cart_item_${matchedProduct.id}">
              <div class="delivery-date">
                Delivery date: ${deliveryDateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchedProduct.image}">

                <div class="cart-item-details">

                  <div class="product-name">
                    ${matchedProduct.name}
                  </div>

                  <div class="product-price">
                    $${(formatCurrency(matchedProduct.priceCent)*cartItem.Quantity).toFixed(2)}
                  </div>

                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js_quantity_label_${matchedProduct.id}">${cartItem.Quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js_update_Link" data-cart-product-id="${matchedProduct.id}">
                      Update
                    </span>
                    <input class="quantity-input js_input_new_quantity_${matchedProduct.id}">
                    <span class="save-quantity-link link-primary js_save_link js_cart_quantity_save_${matchedProduct.id}" data-product-save-id="${matchedProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js_delete_link" data-product-id="${matchedProduct.id}">
                      Delete
                    </span>
                  </div>

                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionHTML(matchedProduct,cartItem)}
                </div>
              </div>
            </div>`;
  });

  function deliveryOptionHTML(matchingProduct,cartItem){
    let html = '';
    deliveryOptions.forEach((deliveryOption)=>{
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
      const deliveryDateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0? 'FREE': `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

      html+=`<div class="delivery-option js_delivery_option" data-product-id="${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>`;
    });
    return html;
  };



  document.querySelector('.js_order_summary').innerHTML = cartSummaryHTML;
  document.querySelectorAll('.js_delete_link').forEach((link)=>{
      link.addEventListener('click',()=>{
          const productID = link.dataset.productId;
          removeFromCart(productID);

        const container = document.querySelector(`.js_cart_item_${productID}`);
        container.remove();
        document.querySelector('.js_checkout_item_quantity').innerHTML=`${UpdateCartCheckout()} items`;
        renderPaymentSummary();
      });
  });
  document.querySelector('.js_checkout_item_quantity').innerHTML=`${UpdateCartCheckout()} items`;
  document.querySelectorAll('.js_update_Link').forEach((link)=>{
    link.addEventListener('click',()=>{
      const container = document.querySelector(`.js_cart_item_${link.dataset.cartProductId}`);
      container.classList.add('is-editing-quantity');
    });
  });
  document.querySelectorAll('.js_save_link').forEach((SaveLink)=>{
    const cartItemId = SaveLink.dataset.productSaveId;
    function saveOperation(){
      const saveContainer = document.querySelector(`.js_cart_item_${SaveLink.dataset.productSaveId}`);
      const newQuantity = Number(document.querySelector(`.js_input_new_quantity_${SaveLink.dataset.productSaveId}`).value);
      if(newQuantity>0){
        document.querySelector(`.js_quantity_label_${SaveLink.dataset.productSaveId}`).innerHTML = newQuantity;
        UpdateCartQuantityFromCheckout(SaveLink.dataset.productSaveId,newQuantity);
        const cartTotalQuantity = UpdateCartCheckout();
        document.querySelector('.js_checkout_item_quantity').innerHTML=`${cartTotalQuantity} items`;
        saveContainer.classList.remove('is-editing-quantity');
        renderPaymentSummary();
      }else{
        alert("Can't Update Quantity to 0 or Bellow. Try Deleting or Select a Valid Number !");
      }
      }
    SaveLink.addEventListener('click',saveOperation);
    const inputField = document.querySelector(`.js_input_new_quantity_${cartItemId}`);
    inputField.addEventListener('keydown',(event)=>{
      if(event.key === 'Enter'){
        saveOperation();
      }
    });
  });

  document.querySelectorAll('.js_delivery_option').forEach((eachDeliveryOption)=>{
    eachDeliveryOption.addEventListener('click',()=>{
      const {productId,deliveryOptionId} = eachDeliveryOption.dataset;
      updateDeliveryOptionId(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
};
