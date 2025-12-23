import {renderOrderSummary} from './Checkout/orderSummary.js';
import { renderPaymentSummary } from './Checkout/paymentSummary.js';  

// import "../data/cart_oop.js"; this is for the code to load from cart_oop.js file but we need to load the CartClass.js file codes so we write
// import "../data/CartClass.js";
// import "../data/car.js";
// import "../data/backEndPractise.js";

import { LoadProducts, LoadProductsFetch } from '../data/products.js';
import {LoadCart, loadCartFetch} from "../data/cart.js";





async function loadPage() {
    try{
        await Promise.all([LoadProductsFetch(), loadCartFetch()])

        // await LoadProductsFetch();
        // await loadCartFetch();

    } catch(error){
        console.log("Urfortunately error occur")
    }
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage()




/*
Promise.all([

    // new Promise((resolve)=>{
    //     LoadProducts(()=>{
    //         resolve('Value_1 passed')
    //     });
    // }),

    LoadProductsFetch(),    // top part is just being applicated by this function using fetch(). adn its returing a promise so no issue
    new Promise((resolve)=>{
        LoadCart(()=>{
            resolve();
        })
    })
]).then((a)=>{
    renderOrderSummary();
    renderPaymentSummary();
})
*/



// new Promise((resolve)=>{
//     LoadProducts(()=>{
//         resolve('value1')
//     });

// }).then(()=>{
//     return new Promise((resolve)=>{
//         LoadCart(()=>{
//             resolve('value_2');
//         })
//     })
// }).then((a)=>{
//     console.log(a)
//     renderOrderSummary();
//     renderPaymentSummary();
// })



// LoadProducts(()=>{
//     LoadCart(()=>{
//         renderOrderSummary();
//         renderPaymentSummary();
//     })
// })

