import React, { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom';
import PropTypes from 'prop-types'

import { withRouter } from 'react-router'
import { useDispatch, useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";

import Button from './Button'

import iconClose from '../assets/images/iconclose.png'
import axios from 'axios'

const ProductView = props => {

    
    const product = props.product

    const [products, setProducts] = useState(product)

    const [previewImg, setPreviewImg] = useState(product.img)

    const [descriptionExpand, setDescriptionExpand] = useState(false)

    const [quantity, setQuantity] = useState(1)

    const [modal, setModal]=useState(false)
    const [popupContent, setPopupContent]=useState({})

    const customerId = useSelector(state => state.auth.customerId);
    const [userPhoto, setUserPhoto] = useState('');
    const [tryonResult, setTryonResult] = useState('');

    const updateQuantity = (type) => {
        if (type === 'plus') {
            setQuantity(quantity + 1)
        } else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }

    const token=localStorage.getItem('auth-token');
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

    // const borrowBook = () => {
    //     let newItem = {
    //         slug: product.slug,
    //     }
    //     setProducts(product);
    //     props.history.push({
    //         state: product.slug,
    //         pathname:'/borrow', 
    //         state: {image: product.image, name: product.name, price: product.price}, 
    //     })
    // }

    async function convertImagesToBytes(imageUrls) {
        const bytesArray = [];
    
        for (const imageUrl of imageUrls) {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
    
            const arrayBuffer = await new Promise((resolve, reject) => {
                const reader = new FileReader();
    
                reader.onload = () => {
                    resolve(reader.result);
                };
    
                reader.onerror = error => {
                    reject(error);
                };
    
                reader.readAsArrayBuffer(blob);
            });
    
            bytesArray.push(new Uint8Array(arrayBuffer));
        }
    
        return bytesArray;
    }
    
    function sendImagesToFastAPI(bytesArray) {
        const formData = new FormData();
    
        for (let i = 0; i < bytesArray.length; i++) {
            formData.append(`image${i + 1}`, new Blob([bytesArray[i]]), `image${i + 1}.jpg`);
        }
    
        fetch('https://e91d-34-67-53-63.ngrok-free.app/try-on/image', {
            method: 'POST',
            body: formData
        })
        .then(result =>result.json())
        .then(data=>{
            if (data["message"]=="success"){
                setTryonResult(data["result"])
                console.log(data["result"])
            }
            else{
                console.log("Not receive data result")
            }
        })
        .catch(error => {
            console.error('Error getting try-on image result:', error);
            alert('Error try on. Try again.');
          });
    }
    

//     const postTryon = async()=>{
//         await fetch("https://172c-34-83-247-8.ngrok-free.app/try-on/image",{
//             method: 'POST',
//             credentials: 'include',
//             headers:{
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 userImg: userPhoto,
//                 clothImg: product.image02
//             })
//     })
//     .then(result=>result.json())
//     .then(data=>{
//         if (data.message=='success'){
//             setTryonResult(data.result)
//         }
//     })
//     .catch(error => {
//         console.error('Error getting try-on image result:', error);
//         alert('Error try on. Try again.');
//       });
// }
//, resultImage, title2

    const imageUrls=[userPhoto, product.image02]

    const handleClickTryon=(originalImage, title1)=>{
        //postTryon();
        convertImagesToBytes(imageUrls)
        .then(bytesArray => {
            sendImagesToFastAPI(bytesArray);
        })
        .catch(error => {
            console.error("Error:", error);
        });
        //const title2="Try-on result"
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
                                
                                    <p>Try-on result</p>
                                    <img src={tryonResult} alt=""/>
                                    
                                </div>
                                
                                <div className="close-btn" onClick={closePopup}><p>X</p></div>
                            </div>
                        </div>
                    )}
                    
                    
                </div>
                <div className="product__info__item">
                    <Button>Buy now</Button>
                    <Button>Add to cart</Button>
                </div>
            </div>
        </div>
    )
}

ProductView.propTypes = {
    product: PropTypes.object.isRequired
}

export default withRouter(ProductView)