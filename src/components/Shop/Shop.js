import React, { useEffect, useState } from 'react';
import './Shop.css';
import productData from '../../fakeData/products.json'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const products = productData.slice(0, 15);
    const [cart, setCart] = useState([]);
    const handleAddProduct = (product) => {
        const sameProduct = cart.find(i => i.id === product.id)
        let newCart;
        let count = 1;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(i => i.id !== product.id)
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        // console.log(cart)
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className="product-container">

                {products.map(i => {

                    return <Product
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={i}
                        key={i.id}
                    ></Product>
                }
                )}

            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>

            </div>

        </div >
    );
};

export default Shop;
