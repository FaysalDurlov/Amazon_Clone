import {addToCart, cart, loadFromStorage} from "../../../data/cart.js";

describe("Adding Product TO Cart",()=>{
    it("Adding an Existing Product in the Cart",()=>{
        spyOn(localStorage,"setItem");

        spyOn(localStorage,"getItem").and.callFake(()=>{
            return JSON.stringify([
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    Quantity: 1,
                    deliveryOptionsId: '1'
                }]);
        });
        loadFromStorage();
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
        expect(cart[0].Quantity).toEqual(2);
        expect(cart[0].deliveryOptionsId).toEqual("1");
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
    it("Add a New Item in the Cart",()=>{
        spyOn(localStorage,"setItem");
        spyOn(localStorage,"getItem").and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();
        addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6")
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    });
});