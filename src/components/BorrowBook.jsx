import React, { useState, useEffect } from 'react'
import {useParams, useLocation} from 'react-router-dom';
// import PropTypes from 'prop-types'

import { withRouter } from 'react-router'

import Button from './Button'
import bookData from '../assets/data-loaded/books'

const BorrowBook = () => {
//     const navigate = useNavigate();

//   const navigateToBorrow = () => {
//     navigate('/borrow');
//   };

    //const product = bookData.getBookBySlug(props.match.params.slug)

    // const image = useLocation().state.image;
    // const title=useLocation().state.title;
    // const author=useLocation().state.author;
    // const description=useLocation().state.description;
    // console.log(image);
    // console.log(title);
    // console.log(author);
    // console.log(description);
    
    // const [previewImg, setPreviewImg] = useState(image)

    // const [descriptionExpand, setDescriptionExpand] = useState(false)

    // useEffect(() => {
    //     // setPreviewImg(image)
    //     const bgcolor = "#DDFFF9"
    //     document.body.style.background = bgcolor;
    // })
    const stateParamValue=useLocation().state;
    const product=bookData.getBookBySlug(stateParamValue);
    console.log(product);
    // const product={
    //     title: "Sherlock Homes",
    //     author: 'Arthur Conan Doyle',
    //     image: require('../assets/images/booksImg/book1.jpg'),
    //     image02: require('../assets/images/booksImg/book1_2.jpg'),
    //     image03: require('../assets/images/booksImg/book1.jpg'),
    //     image04: require('../assets/images/booksImg/book1_2.jpg'),
    //     genreSlug: "Fiction",
    //     slug: "sherlock-homes",
    //     bookType: 'Ebook',
    //     description:'Sherlock Holmes is a fictional detective created by British author Arthur Conan Doyle. Referring to himself as a "consulting detective" in the stories, Holmes is known for his proficiency with observation, deduction, forensic science and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.',
    // }

    return (
        <div className="product">
            <div className="product__images">
                <div className="product__images__main">
                    <img src={product.image} alt="" />
                </div>
                
            </div>
            <div className="product__info">
                <h3 className="product__info__title">{product.title}</h3>
                <h3 className="product__info__author">
                    {product.author}
                </h3>
                <div className="product__info__item">
                    <div className="product__info__item__content"> {product.description}</div>
                </div>
            </div>
        </div>
    )
}

// BorrowBook.propTypes = {
//     product: PropTypes.object.isRequired
// }

//export default withRouter(BorrowBook)

// const BorrowBook = () => {
//   return (
//     <div>BorrowBook</div>
//   )
// }

export default BorrowBook