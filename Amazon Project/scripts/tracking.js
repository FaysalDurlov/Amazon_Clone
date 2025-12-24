import {orders as OrderArray} from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {LoadProductsFetch, getProductFromList} from "../data/products.js";
import {UpdateCartCheckout} from "../data/cart.js";

await LoadProductsFetch();

const url = new URL(window.location.href);
const UrlOrderId = url.searchParams.get("orderId");
const UrlProductId = url.searchParams.get('productId');


// loading the orderURL 
let matchedOrder;
OrderArray.forEach((order)=>{
    if(order.id === UrlOrderId){
        matchedOrder = order
    }
});
console.log(matchedOrder);

// Loading the product that User Want to Track
let matchedProduct;
matchedOrder.products.forEach((product)=>{
    if(product.productId === UrlProductId){
        matchedProduct = product
    }
})
console.log(matchedProduct);

// Getting the full Information About the user product from Backend to load in HTML
let matchedProductInProductList = getProductFromList(matchedProduct.productId)
console.log(matchedProductInProductList)

// Genarate the Delevery Date string for the HTML
let orderTime = dayjs(matchedOrder.orderTime)
let DeliveryDate = dayjs(matchedProduct.estimatedDeliveryTime)
let todaydate = dayjs()
function getDeleveryDateString(){
    const isDelevered = todaydate.isSame(DeliveryDate.format('YYYY-MM-DD'), "day") || todaydate.isAfter(DeliveryDate.format('YYYY-MM-DD'),"day");
    if(isDelevered){
        return `Already Delivered on ${DeliveryDate.format('dddd, MMMM D')}`
    } 
    else{
        return `Arriving on ${DeliveryDate.format('dddd, MMMM D')}`
    }
}
console.log(orderTime)
let DeliveryBarPercentge = ((todaydate - orderTime)/(DeliveryDate-orderTime))*100;
console.log(DeliveryBarPercentge)

console.log(matchedProductInProductList)
function RenderTrackingPage(){
    let productTrackingHTML = 
        `<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
            ${getDeleveryDateString()}
        </div>

        <div class="product-info">
          ${matchedProductInProductList.name}
        </div>

        <div class="product-info">
          Quantity: ${matchedProduct.quantity}
        </div>

        <img class="product-image" src="${matchedProductInProductList.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${DeliveryBarPercentge<50? "current-status":""}">
            Preparing
          </div>
          <div class="progress-label ${DeliveryBarPercentge>=50 && DeliveryBarPercentge<100? "current-status":""}">
            Shipped
          </div>
          <div class="progress-label ${DeliveryBarPercentge>=100? "current-status":""}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style = "width: ${DeliveryBarPercentge}%;"></div>
        </div>`
    document.querySelector(".js_orderTrackingGrid").innerHTML = productTrackingHTML;
    document.querySelector(".jsTracking_cartQuantity").innerHTML = UpdateCartCheckout();
}

RenderTrackingPage();
