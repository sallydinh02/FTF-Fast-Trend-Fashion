import React, {useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import FeaturesCard from '../components/FeaturesCard'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
//import productData from '../assets/data-loaded/products'
import SimpleImageSliderHome from '../components/SimpleImageSliderHome'
import { ShopContext } from '../Context/ShopContext'

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
    const {products}=useContext(ShopContext)
    // useEffect(()=>{
    //     fetch("http://localhost:4000/allproducts")
    //     .then(res=>res.json())
    //     .then(data=>setProducts(data))
    //     .catch(err => console.error(err));
    // })
    return (
        
        <Helmet title="Home">
            {/* slide image */}
            <Section>
                <SectionBody>
                <SimpleImageSliderHome/>
                </SectionBody>
            </Section>
            {/* end slide image */}

            {/* new products section */}
            <Section>
                <SectionTitle>
                    New products
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={100}
                    >
                        {
                            products.map((product) => (
                                <ProductCard
                                    // key={index}
                                    id={product.id}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    slug={product.slug}
                                />
                            ))
                        }
                    </Grid>
                </SectionBody>
            </Section>
            {/* end new products section */}

        </Helmet>
    )
}

export default Home
