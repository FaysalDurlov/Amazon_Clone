import {cart, UpdateCartCheckout, EmptyCart} from '../../data/cart.js';
import {getProductFromList, products} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import {addOder} from "../../data/orders.js";

export function renderPaymentSummary(){
    let ProductPriceCent = 0;
    let ShippingCostCent = 0;
    cart.forEach((cartItem)=>{
        const product = getProductFromList(cartItem.productId); 
        ProductPriceCent += product.priceCent * cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        ShippingCostCent+= deliveryOption.priceCents;
    })
    const TotalPriceBeforeTax = ProductPriceCent+ShippingCostCent;
    const TaxCents = TotalPriceBeforeTax*0.1;
    const TotalCentsAfterTax = TotalPriceBeforeTax+TaxCents;



    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${UpdateCartCheckout()}):</div>
            <div class="payment-summary-money">$${formatCurrency(ProductPriceCent)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js_shippingCostTestJasmine">$${formatCurrency(ShippingCostCent)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(TotalPriceBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(TaxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js_TotalCostCostTestJasmine">$${formatCurrency(TotalCentsAfterTax)}</div>
        </div>

        <button class="place-order-button button-primary js_placeOrderButton">
            Place your order
        </button>`;
        
    document.querySelector('.js_payment_summary').innerHTML = paymentSummaryHTML;

    document.querySelector('.js_placeOrderButton').addEventListener('click', async ()=>{
        try{
            const response = await fetch("https://supersimplebackend.dev/orders",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({cart: cart})
            });
    
            const order = await response.json()
            addOder(order)

        } catch(error){
            console.log("Unexpected Error. Try again Later !");
        }
        EmptyCart()
        window.location.href = "orders.html";
    })
}