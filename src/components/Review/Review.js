import React, { useEffect, useState } from 'react';
import { getShoppingCart, removeFromDb } from '../../utilities/fakedb';
import productData from '../../fakeData/products.json'
import Product from '../Product/Product';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import "./Review.css"



const Review = () => {
    const [cart, setCart] = useState([]);
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
    return (
        <div className='Review'>
            <div>
                {
                    cart.map(i => <ReviewItem removeProduct={removeProduct} key={i.id} product={i}></ReviewItem>)
                }
            </div>
            <div>
                <Cart cart={cart}></Cart>
            </div>


        </div>
    );
};

export default Review;