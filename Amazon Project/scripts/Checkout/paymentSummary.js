import {cart, UpdateCartCheckout} from '../../data/cart.js';
import {getProductFromList, products} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';

export function renderPaymentSummary(){
    let ProductPriceCent = 0;
    let ShippingCostCent = 0;
    cart.forEach((cartItem)=>{
        const product = getProductFromList(cartItem.productId); 
        ProductPriceCent += product.priceCent * cartItem.Quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
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
            <div class="payment-summary-money">${formatCurrency(ShippingCostCent)}</div>
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
            <div class="payment-summary-money">${formatCurrency(TotalCentsAfterTax)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>`;
    document.querySelector('.js_payment_summary').innerHTML = paymentSummaryHTML;
}