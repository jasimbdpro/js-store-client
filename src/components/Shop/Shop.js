import React, { useState } from 'react';
import './Shop.css';
import products from '../../fakeData/products.json'
import Product from '../Product/Product';

const Shop = () => {
    const [productn, setProductn] = useState(products.slice(0, 10));
    return (
        <div className='shop-container'>
            <div className="product-container">

                {productn.map(pd =>
                    <Product product={pd}></Product>
                )}

            </div>
            <div className="cart-container">
                <h3>This is cart</h3>
            </div>

        </div >
    );
};

export default Shop;
