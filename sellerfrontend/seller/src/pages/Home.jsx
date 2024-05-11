import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import Grid from '../components/Grid'
//import productData from '../assets/data-loaded/products'
//import SimpleImageSliderHome from '../components/SimpleImageSliderHome'
//import { ShopContext } from '../Context/ShopContext'

// useLayoutEffect(() => {
//     document.body.style.backgroundColor = "#DDFFF9"
// });
const Home = () => {
    // useEffect(() => {
    //     // change background color with a random color
    //     const bgcolor = "#FFFFFF"
    //     document.body.style.background = bgcolor;
    //   });
    // const [products, setProducts]=useState([]);
    //const {products}=useContext(ShopContext)
    // useEffect(()=>{
    //     fetch("http://localhost:4000/allproducts")
    //     .then(res=>res.json())
    //     .then(data=>setProducts(data))
    //     .catch(err => console.error(err));
    // })
    return (
        
        <Helmet title="Home">
            Home

        </Helmet>
    )
}

export default Home
