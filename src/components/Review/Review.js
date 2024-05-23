import React, { useEffect, useState } from 'react';
import { deleteShoppingCart, getShoppingCart, removeFromDb } from '../../utilities/fakedb';
import productData from '../../fakeData/products.json'
import Product from '../Product/Product';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import "./Review.css"
import happyImage from '../../images/giphy.gif'



const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)
    const handlePlaceOrder = () => {
        setCart([])
        setOrderPlaced(true)
        deleteShoppingCart()
    }

    const removeProduct = (id) => {
        const newCart = cart.filter(i => i.id !== id);
        setCart(newCart)
        removeFromDb(id)
    }
    useEffect(() => {
        //cart
        const savedCart = getShoppingCart()
        const productIds = Object.keys(savedCart);
        const cartProducts = productIds.map(id => {
            const product = productData.find(i => i.id === id)
            product.quantity = savedCart[id]
            return product;
        });
        setCart(cartProducts);

    }, [])
    let thankyou;
    if (orderPlaced) {
        thankyou = <img src={happyImage} />
    }
    else { }
    return (
        <div className='Review'>
            <div>
                {
                    cart.map(i => <ReviewItem removeProduct={removeProduct} key={i.id} product={i}></ReviewItem>)
                }
                {
                    thankyou
                }
            </div>
            <div>
                <Cart cart={cart}>
                    <button className='main-button' onClick={handlePlaceOrder}>Place Order</button>
                </Cart>
            </div>


        </div>
    );
};

export default Review;