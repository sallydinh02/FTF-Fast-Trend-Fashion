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
    const [product, setProduct]=useState({});
    useEffect(() => {
    const fetchProduct=async(req, res)=>{
        const response = await axios.get(`http://localhost:4000/allproducts/${match.params.slug}`);
        setProduct(response.data);
    };
    fetchProduct(()=>{
        window.scrollTo(0,0);
    })
    }, [match.params.id])

    return (
        <Helmet>
            <Section>
                <SectionBody>
                    <ProductView product={product}/>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Product