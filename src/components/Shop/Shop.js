import React, { useState } from 'react';
import './Shop.css';
import productData from '../../fakeData/products.json'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb } from '../../utilities/fakedb';

const Shop = () => {
    const products = productData.slice(0, 15);
    const [cart, setCart] = useState([]);
    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
    }
    return (
        <div className='shop-container'>
            <div className="product-container">

                {products.map(i =>
                    <Product
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={i}
                        key={i.id}
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
