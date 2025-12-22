export const orders = JSON.parse(localStorage.getItem("orders")) || [] ;

export function addOder(order){
     orders.unshift(order)
     SaveToLocalStorage()
}

function SaveToLocalStorage(){
    localStorage.setItem("orders", JSON.stringify(orders));
}