import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import FeaturesCard from '../components/FeaturesCard'
import Grid from '../components/Grid'
import BookCard from '../components/BookCard'

import bookData from '../assets/data-loaded/books'

import SimpleImageSliderHome from '../components/SimpleImageSliderHome'

// useLayoutEffect(() => {
//     document.body.style.backgroundColor = "#DDFFF9"
// });
const Home = () => {
    // useEffect(() => {
    //     // change background color with a random color
    //     const bgcolor = "#FFFFFF"
    //     document.body.style.background = bgcolor;
    //   });
    return (
        
        <Helmet title="Home">
            {/* slide image */}
            <Section>
                <SectionBody>
                <SimpleImageSliderHome/>
                </SectionBody>
            </Section>
            {/* end slide image */}


            {/* new arrival section */}
            <Section>
                <SectionTitle>
                    New books
                </SectionTitle>
                <SectionBody>
                    <Grid
                        col={4}
                        mdCol={2}
                        smCol={1}
                        gap={100}
                    >
                        {
                            bookData.getAllBooks().map((item, index) => (
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
            {/* end new arrival section */}

        </Helmet>
    )
}

export default Home
