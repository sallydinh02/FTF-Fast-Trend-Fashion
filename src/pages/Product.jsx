import React from 'react'

import Helmet from '../components/Helmet'
import Section, {SectionBody, SectionTitle} from '../components/Section'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import ProductView from '../components/ProductView'

import productData from '../assets/data-loaded/products'

const Product = props => {

    const product = productData.getProductBySlug(props.match.params.slug);
    console.log(product);

    const relatedProducts = productData.getAllProducts();

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