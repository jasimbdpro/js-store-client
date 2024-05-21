import React from 'react';

const ReviewItem = (props) => {
    const removeProduct = props.removeProduct;
    const { img, name, seller, price, stock, quantity, id } = props.product;
    return (
        <div className='product'>
            <div>
                <img width="150" className='product-image' src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'>{name}</h4>
                <h4>Quantity: {quantity}</h4>
                <p><small>$ {price}</small></p>
                <button className='main-button' onClick={() => removeProduct(id)}>Remove Item</button>
            </div>

        </div>
    );
};

export default ReviewItem;