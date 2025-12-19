import {renderOrderSummary} from './Checkout/orderSummary.js';
import { renderPaymentSummary } from './Checkout/paymentSummary.js';  

// import "../data/cart_oop.js"; this is for the code to load from cart_oop.js file but we need to load the CartClass.js file codes so we write
// import "../data/CartClass.js";
// import "../data/car.js";
// import "../data/backEndPractise.js";

import { LoadProducts } from '../data/products.js';
import {LoadCart} from "../data/cart.js";


Promise.all([
    new Promise((resolve)=>{
        LoadProducts(()=>{
            resolve('Value_1 passed')
        });
    }),
    new Promise((resolve)=>{
        LoadCart(()=>{
            resolve();
        })
    })
]).then((a)=>{
    console.log(a)
    renderOrderSummary();
    renderPaymentSummary();
})


let status = false
new Promise((resolve,reject)=>{
    if(status){
        resolve("status is True")
    }else{
        reject("status is false")
    }
}).then((value_from_Resolve)=>{
    console.log(value_from_Resolve)
}).catch((value_from_reject)=>{
    console.log(value_from_reject)
})




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

