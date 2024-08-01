import React, { useEffect, useState } from 'react';
import './Shop.css';
import productData from '../../fakeData/products.json'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

const Shop = () => {
    const products = productData.slice(0, 15);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = getShoppingCart()
        const productKeysId = Object.keys(savedCart)
        const previousCart = productKeysId.map(existingKey => {
            const product = productData.find(pd => pd.id === existingKey)
            product.quantity = savedCart[existingKey]
            return product;
        })
        setCart(previousCart)
    }, [])

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
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className='main-button'>Review Order</button>
                    </Link>
                </Cart>

            </div>

        </div >
    );
};

export default Shop;
