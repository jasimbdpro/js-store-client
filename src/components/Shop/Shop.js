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
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id)
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
