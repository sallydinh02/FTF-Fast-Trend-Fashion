import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

// import numberWithCommas from '../utils/numberWithCommas'

const ProductCard = props => {
    return (
        <div className="product-card">
            <Link to={`/searchbook/${props.slug}`}>
                <div className="product-card__image">
                    <img src={props.image} alt="" width="300" height="450" />
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__author">
                {props.author}
                </div>
            </Link>
        </div>
    )
}

ProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
}

export default ProductCard
