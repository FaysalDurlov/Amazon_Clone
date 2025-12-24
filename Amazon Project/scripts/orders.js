import{orders} from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import{formatCurrency} from "./utils/money.js";
import{getProductFromList, LoadProductsFetch} from "../data/products.js";
import {UpdateCartCheckout} from "../data/cart.js";


document.querySelector(".js_order_cartQuantity").innerHTML = `${UpdateCartCheckout()}`
await LoadProductsFetch(); 
// this await only works because this js is a module. if it wasn't a module I would have to use it under an async function !

renderOrder();

function renderOrder(){
    let renderedPage = ""
    orders.forEach((eachOrder)=>{
        let orderTimeString = dayjs(eachOrder.orderTime).format("MMMM D")
        renderedPage += 
            `<div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${orderTimeString}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${formatCurrency(eachOrder.totalCostCents)}</div>
                        </div>
                    </div>
                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${eachOrder.id}</div>
                    </div>
                </div>
                <div class="order-details-grid">
                    ${LoadProductList(eachOrder)}
                </div>
            </div>`
    })
    document.querySelector('.js_order_grid').innerHTML = renderedPage

}

function LoadProductList(Order){
    let productsListHTML = ""
    Order.products.forEach((itemsInAOrder)=>{

        const product = getProductFromList(itemsInAOrder.productId);
        const deliveryDate = dayjs(itemsInAOrder.estimatedDeliveryTime).format("MMMM D")

        productsListHTML += 
        `<div class="product-image-container">
            <img src="${product.image}">
        </div>
        <div class="product-details">
            <div class="product-name">
                ${product.name}
            </div>
            <div class="product-delivery-date">
                Arriving on: ${deliveryDate}
            </div>
            <div class="product-quantity">
                Quantity: ${itemsInAOrder.quantity}
            </div>
            <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
            </button>
        </div>
        <div class="product-actions">
            <a href="tracking.html">
                <button class="track-package-button button-secondary">
                    Track package
                </button>
            </a>
        </div>`
    })
    return productsListHTML;
}