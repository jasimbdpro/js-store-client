import React, { useEffect, useState } from 'react';
import { deleteShoppingCart, getShoppingCart, removeFromDb } from '../../utilities/fakedb';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import "./Review.css";
import happyImage from '../../images/giphy.gif';
import { useNavigate } from 'react-router-dom';

const Review = () => {
    const [productData, setProductData] = useState([]);
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const navigate = useNavigate();

    // Fetch product data only once when component mounts
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/jasimbdpro/github-as-a-cdn/main/uploads/products9wciuqw34987qwhserqwierywef.json')
            .then(res => res.json())
            .then(data => {
                setProductData(data);

                // After fetching productData, restore cart from local storage
                const savedCart = getShoppingCart();
                const productIds = Object.keys(savedCart);
                const cartProducts = productIds.map(id => {
                    const product = data.find(i => i.id === id); // Use fetched data (not empty productData)
                    if (product) {
                        product.quantity = savedCart[id];
                        return product;
                    }
                    return null; // Avoid returning undefined
                }).filter(product => product !== null); // Filter out nulls

                setCart(cartProducts);
            })
            .catch(err => console.error(err));
    }, []);  // Empty dependency array ensures the fetch runs once

    const handleProceedCheckout = () => {
        navigate('/shipment');
    };

    const removeProduct = (id) => {
        const newCart = cart.filter(i => i.id !== id);
        setCart(newCart);
        removeFromDb(id);
    };

    let thankyou;
    if (orderPlaced) {
        thankyou = <img style={{ width: '80%', margin: '10px', padding: '10px', borderRadius: '30px' }} src={happyImage} alt='happyimage' />;
    }

    return (
        <div className='Review'>
            <div>
                {
                    cart.map(i => <ReviewItem removeProduct={removeProduct} key={i.id} product={i} />)
                }
                {
                    thankyou
                }
            </div>
            <div>
                <Cart cart={cart}>
                    <button className='main-button' onClick={handleProceedCheckout}>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
