import React, { useState } from 'react';
import './Shop.css';
import products from '../../fakeData/products.json'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const [productn, setProductn] = useState(products.slice(0, 10));
    const [cart, setCart] = useState([]);
    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }
    return (
        <div className='shop-container'>
            <div className="product-container">

                {productn.map(pd =>
                    <Product
                        handleAddProduct={handleAddProduct}
                        product={pd}
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
