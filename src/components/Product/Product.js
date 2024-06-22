import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import './Product.css';
import { Link, } from 'react-router-dom';

const Product = ({ product, handleAddProduct, showAddToCart }) => {
    const { img, name, seller, price, stock, id } = product;
    return (
        <div className='product'>
            <div style={{ marginRight: '10px' }}>
                <img width="300" className='product-image' src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'><Link to={"/product/" + id}>{name}</Link> </h4>
                <br />
                <p> <small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock- Order soon.</small></p>
                {showAddToCart && <button
                    className='main-button'
                    onClick={() => handleAddProduct(product)}
                >
                    <FontAwesomeIcon icon={faShoppingCart} /> add to cart
                </button>}
            </div>

        </div>
    );
};

export default Product;