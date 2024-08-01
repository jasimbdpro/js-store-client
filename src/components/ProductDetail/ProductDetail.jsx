import React from 'react';
import { useParams } from 'react-router-dom';
import productData from '../../fakeData/products.json'
import Product from '../Product/Product';


const ProductDetail = () => {
    const { productId } = useParams()
    const product = productData.find(i => i.id === productId);
    // console.log(product)
    return (
        <div>
            <h1>Your Product Detail</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;