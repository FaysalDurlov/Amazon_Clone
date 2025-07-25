import {renderOrderSummary} from "../../../scripts/checkout/orderSummary.js";
import {loadFromStorage} from "../../../data/cart.js";

describe("Test Suit: Order Summary",()=>{
    it("Displays The Cart",()=>{
        document.querySelector('.js_container').innerHTML = '<div class="js_order_summary"></div>';

        spyOn(localStorage,"getItem").and.callFake(()=>{
            return JSON.stringify([
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
              ]);
        });
        loadFromStorage();
        renderOrderSummary();
    })

})