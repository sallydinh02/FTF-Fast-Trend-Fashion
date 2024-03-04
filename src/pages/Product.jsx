import React from 'react'

import Helmet from '../components/Helmet'
import Section, {SectionBody, SectionTitle} from '../components/Section'
import Grid from '../components/Grid'
import BookCard from '../components/BookCard'
import ProductView from '../components/ProductView'

import bookData from '../assets/data-loaded/books'

const Product = props => {

    const product = bookData.getBookBySlug(props.match.params.slug);
    console.log(product);

    const relatedProducts = bookData.getAllBooks();

    React.useEffect(() => {
        window.scrollTo(0,0)
    }, [product])

    return (
        <Helmet title={product.title}>
            <Section>
                <SectionBody>
                    <ProductView product={product}/>
                </SectionBody>
            </Section>
        </Helmet>
    )
}

export default Product