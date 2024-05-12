import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useHistory , useLocation} from "react-router-dom";
import Helmet from '../components/Helmet'

const CustomerInfo = () => {
    const [address, setAddress] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [cardNumber, setCardNumber] = useState();
    const history = useHistory()
    const location = useLocation()

    const handleUserSubmit = (e) => {
        e.preventDefault()
        axios.put("http://localhost:4000/customer-info/:id", { address, phoneNumber, cardNumber },{
            headers: {
              Authorization: localStorage.getItem('token') // Attach JWT token from localStorage
            }
          })
        .then(result => {
            console.log(result);
            if (result.data.success){
                history.push("/login")
            } 
            else{
                alert(result.data.error)
            }
        })
        .catch(err => console.log(err))
    }

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
                    <div className="signupinfo__clicknext-container">
                    <p><Link to="/login"><span>Next</span></Link></p>
                </div>
                </form>
                
            </div>
        </div>
    </Helmet>
  )
}

export default CustomerInfo