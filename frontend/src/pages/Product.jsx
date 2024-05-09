import React from 'react'

import Helmet from '../components/Helmet'
import Section, {SectionBody, SectionTitle} from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'

import productData from '../assets/data-loaded/products'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Product = ({ match }) => {
    // const {slug}=useParams();
    // const {products}=useContext(ShopContext);
    // const [product, setProduct] = useState(null);
    //const product=productData.find((e)=>e.slug===slug)
    // const product = productData.getProductBySlug(props.match.params.slug);
    // console.log(product);
    // const {id}=useParams();
    // const {products}=useContext(ShopContext);
    // const product=products.find(p=>p.id===props.match.params.id);

    //const relatedProducts = productData.getAllProducts();
    const [product, setProduct]=useState({});
    //const {productID}=useParams();
    useEffect(() => {
    const fetchProduct=async(req, res)=>{
        const response = await axios.get(`http://localhost:4000/allproducts/${match.params.id}`);
        setProduct(response.data);
    };
    fetchProduct();
        //window.scrollTo(0,0)
        }, [match.params.id])

    return (
        <Helmet>
            <Section>
                <SectionBody>
                    <ProductView product={product}/>
                </SectionBody>
            </Section>
        </Helmet>
        // <div>
        //     <h1>Product Detail</h1>
        //     <div>
        //         <h2>{product.name}</h2>
        //         <p>Price: {product.price}</p>
        //     </div>
        // </div>
    )
}

export default Product