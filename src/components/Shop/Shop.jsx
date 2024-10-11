import { useEffect, useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [productData, setProductData] = useState([]);
    const [cart, setCart] = useState([]);

    // Fetch product data once on component mount
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/jasimbdpro/github-as-a-cdn/main/uploads/products9wciuqw34987qwhserqwierywef.json')
            .then(res => res.json())
            .then(data => {
                setProductData(data);
                // console.log("fetched data: ", data);

                // Once productData is fetched, update the cart
                const savedCart = getShoppingCart();
                const productKeysId = Object.keys(savedCart);
                const previousCart = productKeysId.map(existingKey => {
                    const product = data.find(pd => pd.id === existingKey); // Use fetched data instead of empty productData
                    if (product) {
                        product.quantity = savedCart[existingKey];
                        return product;
                    }
                    return null; // Avoid undefined products
                }).filter(product => product !== null); // Filter out nulls

                setCart(previousCart);
            })
            .catch(err => console.error(err));
    }, []);

    // console.log("State Updated Data", productData);

    const products = productData.slice(0, 15);

    const handleAddProduct = (product) => {
        const sameProduct = cart.find(i => i.id === product.id);
        let newCart;
        let count = 1;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(i => i.id !== product.id);
            newCart = [...others, sameProduct];
        } else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDb(product.id); // Save to fakedb
    };

    return (
        <div className='shop-container'>
            <div className="product-container">
                {products.map(i => (
                    <Product
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={i}
                        key={i.id}
                    />
                ))}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className='main-button'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
