import React, { useState } from 'react';
import './Shop.css';
import products from '../../fakeData/products.json'

const Shop = () => {
    const [productn, setProductn] = useState(products.slice(0, 11));
    return (
        <div className='shop-container'>
            <div className="product-container">
                <ul>
                    {productn.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            </div>
            <div className="cart-container">
                <h3>This is cart</h3>
            </div>

        </div>
    );
};

export default Shop;
