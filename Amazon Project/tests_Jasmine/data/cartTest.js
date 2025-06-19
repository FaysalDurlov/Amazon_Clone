import { cart, addToCart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart',()=>{
    it('add an exiting product to the cart',()=>{
        spyOn(localStorage,"getItem").and.callFake(()=>{
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                Quantity: 1,
                deliveryOptionsId: '1'
            }]); // faking/ Mocking value
        });
        loadFromStorage(); // Reloading this again cz we want to see the faked/mocked version
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].Quantity).toEqual(2);

    });
    it('add a New Product to the Cart',()=>{
        spyOn(localStorage,"setItem"); // initialing spying to see in future what this setItem method does.

        spyOn(localStorage,"getItem").and.callFake(()=>{
            return JSON.stringify([]); // faking/ Mocking value
        });
        loadFromStorage(); // Reloading this again cz we want to see the faked/mocked version
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        
        expect(localStorage.setItem).toHaveBeenCalledTimes(1); 
        // checking how many times setItem method has been called (remember we initialize spying on set item?)

        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].Quantity).toEqual(1);
    });
});