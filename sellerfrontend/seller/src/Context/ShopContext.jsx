// import React, {createContext} from 'react'
// import productData from '../assets/data-loaded/products';
// import { useState, useEffect } from 'react';

// export const ShopContext = createContext(null);

// const ShopContextProvider=(props)=>{
//     const [products, setProducts]=useState([]);
    
//     useEffect(()=>{
//         fetch('http://localhost:4000/allproducts')
//         .then((response)=>response.json())
//         .then((data)=>setProducts(data))
//     },[])
//     const contextValue={products};

//     return(
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     )
// }

// export default ShopContextProvider;