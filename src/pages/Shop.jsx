import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet.jsx'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'

// will add: a bar of categories
//import category from '../assets/data-loaded/category'
import productData from '../assets/data-loaded/product'

// useLayoutEffect(() => {
//     document.body.style.backgroundColor = "#DDFFF9"
// });
const Shop = () => {
    // useEffect(() => {
    //     // change background color with a random color
    //     const bgcolor = "#DDFFF9"
    //     document.body.style.background = bgcolor;
    //   });
    return (   
        <Helmet title="Shop">
            {/* new products section */}
            <Section>
                <SectionTitle>
                    New Products
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={100}
                    >
                        {
                            productData.getAllProducts().map((item, index) => (
                                <BookCard
                                    key={index}
                                    image={item.image}
                                    name={item.title}
                                    author={item.author}
                                    slug={item.slug}
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

export default Shop