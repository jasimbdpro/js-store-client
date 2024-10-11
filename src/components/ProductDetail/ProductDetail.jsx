import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/jasimbdpro/github-as-a-cdn/main/uploads/products9wciuqw34987qwhserqwierywef.json')
            .then(res => res.json())
            .then(data => setProductData(data))
            .catch(err => console.error(err));  // Always good to handle errors
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    const { productId } = useParams();
    const product = productData.find(i => i.id === productId); // Find the product based on productId

    return (
        <div>
            <h1>Your Product Detail</h1>
            {product ? (  // Check if product exists before rendering
                <Product showAddToCart={false} product={product} />
            ) : (
                <p>Loading...</p> // Show a loading message until product is available
            )}
        </div>
    );
};

export default ProductDetail;
