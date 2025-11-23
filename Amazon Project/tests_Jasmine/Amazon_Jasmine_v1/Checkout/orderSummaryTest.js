import {renderOrderSummary} from "../../../scripts/checkout/orderSummary.js";
import {loadFromStorage} from "../../../data/cart.js";

describe("Test Suit: Order Summary",()=>{
  it("Tests order summary Method",()=>{
    document.querySelector('.js_Order_cart_test_container').innerHTML = `<div class = "js_order_summary"><div>`
    const productId_1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    const productId_2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([
        {
          productId:  productId_1,
          Quantity: 2,
          deliveryOptionsId: '1'
        },
        {
          productId: productId_2,
          Quantity: 1,
          deliveryOptionsId: '2'
        }
      ])
    });
    loadFromStorage();
    renderOrderSummary();
  
  expect(document.querySelectorAll('.js-cart-item-forTest').length).toEqual(2);
  expect(document.querySelector(`.js_product_quantityTest_${productId_1}`).innerText).toContain('Quantity: 2');
  expect(document.querySelector(`.js_product_quantityTest_${productId_2}`).innerText).toContain('Quantity: 1');
  })
})