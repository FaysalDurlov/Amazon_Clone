import {renderOrderSummary} from "../../../scripts/checkout/orderSummary.js";
import {loadFromStorage, cart} from "../../../data/cart.js";

describe("Test Suit: Order Summary",()=>{

    const productId_1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    const productId_2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"

  beforeEach(()=>{
    spyOn(localStorage,'setItem')

    document.querySelector('.js_Order_cart_test_container').innerHTML = 
    `
    <div class = "js_order_summary"></div>
    <div class = "js_payment_summary"></div>
    `
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
  })
  afterEach(()=>{
    document.querySelector('.js_Order_cart_test_container').innerHTML = '';
  })

  it("Tests order summary Method",()=>{

    // document.querySelector('.js_Order_cart_test_container').innerHTML = `<div class = "js_order_summary"></div>`
    // const productId_1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    // const productId_2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"
    // spyOn(localStorage,'getItem').and.callFake(()=>{
    //   return JSON.stringify([
    //     {
    //       productId:  productId_1,
    //       Quantity: 2,
    //       deliveryOptionsId: '1'
    //     },
    //     {
    //       productId: productId_2,
    //       Quantity: 1,
    //       deliveryOptionsId: '2'
    //     }
    //   ])
    // });
    // loadFromStorage();
    // renderOrderSummary();
  

  expect(document.querySelectorAll('.js-each-cart-item-forTest').length).toEqual(2);
  expect(document.querySelector(`.js_product_quantityTest_${productId_1}`).innerText).toContain('Quantity: 2');
  expect(document.querySelector(`.js_product_quantityTest_${productId_2}`).innerText).toContain('Quantity: 1');

  //document.querySelector('.js_Order_cart_test_container').innerHTML = '';

  })
  it("Delete a Product",()=>{

    // spyOn(localStorage,'setItem')

    // document.querySelector('.js_Order_cart_test_container').innerHTML = 
    // `
    // <div class = "js_order_summary"></div>
    // <div class = "js_payment_summary"></div>
    // `

    // const productId_1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    // const productId_2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d"
    // spyOn(localStorage,'getItem').and.callFake(()=>{
    //   return JSON.stringify([
    //     {
    //       productId:  productId_1,
    //       Quantity: 2,
    //       deliveryOptionsId: '1'
    //     },
    //     {
    //       productId: productId_2,
    //       Quantity: 1,
    //       deliveryOptionsId: '2'
    //     }
    //   ])
    // });
    // loadFromStorage();
    // renderOrderSummary();

    

    document.querySelector(`.js_deleteTextJasmine_${productId_1}`).click(); // clicking this button using code.
    // here we just deleted one item from cart

    // now since one product have been remove out of 2 products. Now we check if its removed or not by comparing the rest
    expect(document.querySelectorAll('.js-each-cart-item-forTest').length).toEqual(1);

    expect(document.querySelector(`.js_cart_item_${productId_1}`)).toEqual(null);
    expect(document.querySelector(`.js_cart_item_${productId_2}`)).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId_2);
    // document.querySelector('.js_Order_cart_test_container').innerHTML = '';
  });
});