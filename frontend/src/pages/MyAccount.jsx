import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Helmet from '../components/Helmet'

const MyAccount = () => {
    // const [name, setName] = useState()
    // const [email, setEmail] = useState()
    // const [password, setPassword] = useState()
    const [address, setAddress] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [cardNumber, setCardNumber] = useState()
    const history = useHistory()

    const handleUserSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/myaccount", { address, phoneNumber, cardNumber })
        .then(result => {
            console.log(result);
            if (result.data.success){
                localStorage.setItem('auth-token',result.data.token);
                history.push("/login")
            } 
            else{
                alert(result.data.error)
            }
        })
        .catch(err => console.log(err))
    }

    return (
    <Helmet title="My account">
        <div className='myaccount'>
            <div className="myaccount__container">
                <h1>Customer information</h1>
                <form onSubmit={handleUserSubmit}>
                    <div className="myaccount__fields">
                        {/* <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)}/>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/> */}
                        <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
                        <input type="text" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}/>
                        <input type="text" placeholder="Card number" onChange={(e) => setCardNumber(e.target.value)}/>
                    </div>
                    {/* <div className="signup__button-container">
                        <button>Sign up</button>
                    </div> */}
                </form>
                <div className="myaccount__clicknext-container">
                    <p><Link to="/login"><span>Next</span></Link></p>
                </div>
                
            </div>
        </div>
    </Helmet>
  )
}

export default MyAccount