import React from 'react';
import { useParams } from 'react-router-dom';
import productData from '../../fakeData/products.json'


const ProductDetail = () => {
    const { productId } = useParams()
    const product = productData.find(i => i.productId)
    console.log(product)
    return (
        <div>
            <h1>{productId} Details coming sooooooooooooon</h1>
        </div>
    );
};

export default ProductDetail;