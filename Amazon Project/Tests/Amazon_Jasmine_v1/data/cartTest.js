import {addToCart, removeFromCart, cart, loadFromStorage, updateDeliveryOptionId} from "../../../data/cart.js";

describe("Adding Product TO Cart",()=>{
    beforeEach(()=>{
        spyOn(localStorage,"setItem");
    })
    it("Adding an Existing Product in the Cart",()=>{

        // a product that is already in the cart Increase the quantity by 1  
        spyOn(localStorage,"getItem").and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 1,
                    deliveryOptionId: '1'
                }]);
        });
        loadFromStorage();
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].deliveryOptionId).toEqual("1");
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(localStorage.setItem).toHaveBeenCalledWith(
            'cart',JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryOptionId: '1'
                }])
        )
    });
    it("Add a New Item in the Cart",()=>{
        spyOn(localStorage,"getItem").and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(localStorage.setItem).toHaveBeenCalledWith(
            'cart',JSON.stringify([
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '1'
            }])
        );
    });
});

describe("This the Test Suite For RemoveFromCart() Method",()=>{
    const productId_1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId_2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    const productId_3 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
    beforeEach(()=>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                {
                  productId:  productId_1,
                  quantity: 2,
                  deliveryOptionId: '1'
                },
                {
                  productId: productId_2,
                  quantity: 1,
                  deliveryOptionId: '2'
                }
              ])
        })
        spyOn(localStorage,'setItem')
    })
    it("Removes an item from the cart that exits on cart",()=>{
        loadFromStorage();
        removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId_2);
    });
    it("Removes an item from the cart that does not exits on cart",()=>{
        loadFromStorage();
        removeFromCart(productId_3)
        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual(productId_1);
        expect(cart[1].productId).toEqual(productId_2);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "cart",JSON.stringify([
            {
              productId:  productId_1,
              quantity: 2,
              deliveryOptionId: '1'
            },
            {
              productId: productId_2,
              quantity: 1,
              deliveryOptionId: '2'
            }
          ])
        )

    })

});

describe("Test suite For Update Delivery Option Funtion",()=>{
    const productId_1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId_2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    const productId_3 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
    beforeEach(()=>{
        spyOn(localStorage,"setItem");
        spyOn(localStorage,"getItem").and.callFake(()=>{
            return JSON.stringify([
                {
                productId:  productId_1,
                quantity: 2,
                deliveryOptionId: '1'
                },
                {
                productId: productId_2,
                quantity: 1,
                deliveryOptionId: '2'
                }
            ])
        });
    })
    it("Update Delivery Option Funtion Test",()=>{
        loadFromStorage();

        updateDeliveryOptionId(productId_1,"3");
        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual(productId_1);
        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].deliveryOptionId).toEqual("3");
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(localStorage.setItem).toHaveBeenCalledWith("cart",JSON.stringify([
            {
            productId:  productId_1,
            quantity: 2,
            deliveryOptionId: '3'
            },
            {
            productId: productId_2,
            quantity: 1,
            deliveryOptionId: '2'
            }
        ]))
    })
    it("edge Case for a Product that is not in the cart",()=>{
        loadFromStorage();

        updateDeliveryOptionId(productId_3, "3");
        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual(productId_1);
        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].deliveryOptionId).toEqual("1");
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
    it("edge case  for a not valid Delivery Option",()=>{
        loadFromStorage();

        updateDeliveryOptionId(productId_1,"4");
        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual(productId_1);
        expect(cart[0].quantity).toEqual(2);
        expect(cart[0].deliveryOptionId).toEqual("1");
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    })
});