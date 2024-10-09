import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';


const ProductDetail = () => {
    const [productData, setProductData] = useState([])
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/jasimbdpro/github-as-a-cdn/main/uploads/products9wciuqw34987qwhserqwierywef.json')
            .then(res => res.json())
            .then(data => setProductData(data))
    })
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