import React from 'react'
import styled from "styled-components";
const YourAppointment = () => {
    const product={
        title: "Sherlock Homes",
        author: 'Arthur Conan Doyle',
        image: require('../assets/images/booksImg/book1 new.jpg'),
        image02: require('../assets/images/booksImg/book1_2.jpg'),
        image03: require('../assets/images/booksImg/book1.jpg'),
        image04: require('../assets/images/booksImg/book1_2.jpg'),
        genreSlug: "Fiction",
        slug: "sherlock-homes",
        bookType: 'Ebook',
        description:'Sherlock Holmes is a fictional detective created by British author Arthur Conan Doyle. Referring to himself as a "consulting detective" in the stories, Holmes is known for his proficiency with observation, deduction, forensic science and logical reasoning that borders on the fantastic, which he employs when investigating cases for a wide variety of clients, including Scotland Yard.',
    };
    return (
    // <div className="your-appointment">
    //     <div className="container">
    //         <div className="your-appointment__text">
    //             <p>
    //                 Your appointment
    //             </p>
    //         </div>
    //         <div className="your-appointment__noappointment">
    //             <p>
    //                 You don't have any appointment yet.
    //                 Go to Search book to search for printed book and borrow
    //             </p>   
    //         </div>
    //     </div>
    // </div>
    
    <div className='yourappointment'>
      <h1 className='appointment-text'>Your appointment</h1>
      <div className='container'>
        <div className='appointment-calendar'>
          Calendar here
        </div>
        <div className='container-appointment'>
          <p className='datetime'>01/14/2023 - 2PM</p>
          <div className='appointment-box'>
            <p className='username'>Linda Brown (lindabrown)</p>
            <div className='columnbook'>
              <img src={product.image} alt=""/>
              <div className='rowbookinfo'>
                <p className='booktitle'>{product.title}</p>
                <p className='bookauthor'>{product.author}</p>
              </div>
            </div>
            <button className='clickdone'>Done</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourAppointment