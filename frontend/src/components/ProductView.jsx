import React, { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom';
import PropTypes from 'prop-types'

import { withRouter } from 'react-router'
import { useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";

import Button from './Button'

import iconClose from '../assets/images/iconclose.png'
import axios from 'axios'
//const jwt=require('jsonwebtoken')

const ProductView = props => {
//     const navigate = useNavigate();

//   const navigateToBorrow = () => {
//     navigate('/borrow');
//   };
    
    const product = props.product
    // const slug=product.slug
    // const history = useHistory(); 
    // const routeChange = () =>{ 
    //     history.push(slug+'/borrow');
    // }

    const [products, setProducts] = useState(product)

    const [previewImg, setPreviewImg] = useState(product.img)

    const [descriptionExpand, setDescriptionExpand] = useState(false)

    const [quantity, setQuantity] = useState(1)

    const [modal, setModal]=useState(false)
    const [popupContent, setPopupContent]=useState({})

    const customerId = useSelector(state => state.customerId);
    const [userPhoto, setUserPhoto] = useState('');

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    const token=localStorage.getItem('auth-token');
    // const decodedToken = jwt.verify(token, 'secret_ecom');
    // // Extract the data from the decoded token
    // const customerID = decodedToken.customerID;
    if (token){
        axios.get("http://localhost:4000/getCustomerInfo/"+customerId,{
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => {
            setUserPhoto(response.data.tryonPhoto);
        })
        .catch(error => {
            console.error('Error fetching photo of user:', error);
        })
    }

    useEffect(() => {
        setPreviewImg(product.image);
        // const bgcolor = "#DDFFF9"
        // document.body.style.background = bgcolor;
    }, [product])

    const borrowBook = () => {
        let newItem = {
            slug: product.slug,
        }
        setProducts(product);
        props.history.push({
            state: product.slug,
            pathname:'/borrow', 
            state: {image: product.image, title: product.name, author: product.price}, 
        })
    }
//, resultImage, title2
    const handleClickTryon=(originalImage, title1)=>{
        setPopupContent({originalImage, title1})
        setModal(true)
    }

    const closePopup = () => {
        setModal(false);
    };

    // const goToBorrow = () => {
    //     props.history.push('/borrow')
    // }

    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__main">
                    <img src={previewImg} alt="" />
                </div>
                <div className="product__images__list">
                    <div className="product__images__list__item" onClick={() => setPreviewImg(product.image)}>
                        <img src={product.image} alt="" />
                    </div>
                    <div className="product__images__list__item" onClick={() => setPreviewImg(product.image02)}>
                        <img src={product.image02} alt="" />
                    </div>
                    <div className="product__images__list__item" onClick={() => setPreviewImg(product.image03)}>
                        <img src={product.image03} alt="" />
                    </div>
                    <div className="product__images__list__item" onClick={() => setPreviewImg(product.image04)}>
                        <img src={product.image04} alt="" />
                    </div>
                </div>
                
            </div>
            <div className="product__info">
                <h3 className="product__info__name">{product.name}</h3>
                <h3 className="product__info__price">
                    {product.price}
                </h3>
                {/* <div className="product__info__item">
                    <div className="product__info__item__content"> {product.description}</div>
                </div> */}
                <div className="product__info__item">
                    <Button onClick={() => handleClickTryon(userPhoto, "Original photo")}>AI Try on</Button>
                    {modal && (
                        <div className="popup">
                            
                            <div className="popup-content">
                                {/* <img className="close-btn" src={iconClose} alt="" width="10%" height="10%" onClick={closePopup}></img> */}
                                
                                <div className="popup-content__original">
                                    
                                    <p>{popupContent.title1}</p>
                                    <img src={popupContent.originalImage} alt=""/>
                                    
                                </div>
                                <div className="popup-content__result">
                                
                                    <p>{popupContent.title1}</p>
                                    <img src={popupContent.originalImage} alt=""/>
                                    
                                </div>
                                
                                <div className="close-btn" onClick={closePopup}><p>X</p></div>
                            </div>
                        </div>
                    )}
                    
                    
                </div>
                <div className="product__info__item">
                <Button onClick={() => borrowBook()}>Buy now</Button>
                    <Button onClick={() => borrowBook()}>Add to cart</Button>
                </div>
            </div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object.isRequired
}

export default withRouter(ProductView)