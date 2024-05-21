import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    // console.log(cart);
    // const totalPrice = cart.reduce((total, prd) => total + prd.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;

    }
    let shipping = 12.99;
    if (total > 300) {
        shipping = 0;
    }
    else if (total > 200) {
        shipping = 4.99;
    }
    else if (total === 0) {
        shipping = 0;
    }
    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);


    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items ordered: {cart.length}</p>
            <p>Products prices: {total}</p>
            <p><small>shipping Cost: {shipping}</small></p>
            <p><small>Tax + Vat: {tax}</small></p>
            <p>Total Price: {grandTotal}</p>
            <br />
            <Link>
                <button className='main-button'>Review Order</button>

            </Link>

        </div>
    );
};

export default Cart;