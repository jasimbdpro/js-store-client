import React from 'react';
import './Product.css'

const Product = (props) => {
    const { img, name, id, seller, price, stock, } = props.product;
    return (
        <div className='product'>
            <div>
                <img width="300" className='product-image' src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'>{name} </h4>
                <br />
                <p> <small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock- Order soon.</small></p>
                <button className='main-button'>add to cart</button>
            </div>

        </div>
    );
};

export default Product;