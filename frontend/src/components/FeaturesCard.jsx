import React from 'react'
import PropTypes from 'prop-types'

const FeaturesCard = props => {
    return (
        <div className="features-card">
            <div className="features-card__icon">
                <img src={props.icon} alt="" />
            </div>
            <div className="features-card__info__name">
                    {props.name}                
            </div>
            <div className="features-card__info__description">
                    {props.description}
            </div>
        </div>
    )
}

FeaturesCard.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

export default FeaturesCard
