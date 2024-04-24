import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useHistory , useLocation} from "react-router-dom";
import Helmet from '../components/Helmet'

const CustomerInfo = () => {
    // const [name, setName] = useState()
    // const [email, setEmail] = useState()
    // const [password, setPassword] = useState()
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [cardNumber, setCardNumber] = useState();
    const history = useHistory()
    const location = useLocation()

    const handleUserSubmit = (e) => {
        e.preventDefault()
        axios.put("http://localhost:4000/signup-info", { address, phoneNumber, cardNumber },{
            headers: {
              Authorization: localStorage.getItem('token') // Attach JWT token from localStorage
            }
          })
        .then(result => {
            console.log(result);
            if (result.data.success){
                //localStorage.setItem('auth-token',result.data.token);
                history.push("/login")
            } 
            else{
                alert(result.data.error)
            }
        })
        .catch(err => console.log(err))
    }

    // useEffect(()=>{
    //     console.log(location);
    //     setAddress(location.state.address);
    //     setPhoneNumber(location.state.phoneNumber);
    //     setCardNumber(location.state.cardNumber);
    // },[])

    // const updateData=()=>{
    //     console.log(address, phoneNumber, cardNumber);
    //     fetch("http:localhost:4000/signup-info", {
    //         method: "PUT",
    //         crossDomain: true,
    //         headers:{
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         },
    //         body: JSON.stringify({
    //             token: localStorage.getItem("token")
    //         }),
    //     })
    //     .then((res)=>res.json())
    //     .then((data)=>{
    //         console.log(data);
    //         history.push("/")
    //     })
    // }

    return (
    <Helmet title="Customer information">
        <div className='signupinfo'>
            <div className="signupinfo__container">
                <h1>Customer information</h1>
                <form onSubmit={handleUserSubmit}>
                    <div className="signupinfo__fields">
                        <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
                        <input type="text" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}/>
                        <input type="text" placeholder="Card number" onChange={(e) => setCardNumber(e.target.value)}/>
                    </div>
                </form>
               
                {/* <div className="signupinfo__fields">
                    <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
                    <input type="text" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}/>
                    <input type="text" placeholder="Card number" onChange={(e) => setCardNumber(e.target.value)}/>
                </div> */}
                <div className="signupinfo__clicknext-container">
                    <p><Link to="/login"><span>Next</span></Link></p>
                </div>
                
            </div>
        </div>
    </Helmet>
  )
}

export default CustomerInfo