import React, { useState } from 'react';
import './Shop.css';
import productData from '../../fakeData/products.json'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const products = productData.slice(0, 15);
    const [cart, setCart] = useState([]);
    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">

                {products.map(i =>
                    <Product
                        handleAddProduct={handleAddProduct}
                        product={i}
                    ></Product>
                )}

            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>

            </div>

        </div >
    );
};

export default Shop;
