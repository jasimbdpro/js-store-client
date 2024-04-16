import React, { useState } from 'react';
import './Shop.css';
import products from '../../fakeData/products.json'

const Shop = () => {
    const [productn, setProductn] = useState(products.slice(0, 11));
    return (
        <div>
            <h1>This is Shop</h1>
            <h3>
                {productn.length}
            </h3>
            <ul>
                {productn.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Shop;
