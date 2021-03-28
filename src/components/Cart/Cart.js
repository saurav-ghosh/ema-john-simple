import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const carts = props.carts;
    
    const total = carts.reduce((total, prd) => total + prd.price * prd.quantity || 1, 0);
    // let total = 0;
    // for (let i = 0; i < carts.length; i++) {
    //     const cart = carts[i];
    //     total = total + cart.price;
    // }

    let shipping = 0;
    if(total > 100){
        shipping = 0;
    }
    else if(total > 50){
        shipping = 8.99;
    }
    else if(total > 0){
        shipping = 12.99;
    };

    const tax = total/10;
    const grandTotal = total + shipping + tax;

    const formatNumber = number => {
        const precision = number.toFixed(2);
        return precision;
    };

    return (
        <div>
            <div className="orderList">
                <h2>order summary</h2>
                <h4>Items Ordered: {carts.length}</h4>
            </div>
            <div className="price">
                <p><small>product Price: ${formatNumber(total)}</small></p>
                <p><small>shipping Cost: ${formatNumber(shipping)}</small></p>
                <p><small>tax & vat: ${formatNumber(tax)}</small></p>
            </div>
            <h4 className="orderTotal">Order Total = ${formatNumber(grandTotal)}</h4>
            {
                props.children
            }
        </div>
    );
};

export default Cart;