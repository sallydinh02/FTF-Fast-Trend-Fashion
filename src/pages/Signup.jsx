import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Helmet from '../components/Helmet'

const Signup = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [address, setAddress] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [cardNumber, setCardNumber] = useState()
    const history = useHistory()

    const handleUserSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/signup", { name, email, password, address, phoneNumber, cardNumber})
        .then(result => {
            console.log(result);
            if (result.data.success){
                localStorage.setItem('auth-token',result.data.token);
                history.push("/login")
                //history.push("/signup-info")
            } 
            else{
                alert(result.data.error)
            }
        })
        // .then(data=>{
        //     console.log(data.data)
        // })
        .catch(err => console.log(err))
    }

    return (
    <Helmet title="Signup">
        <div className='signup'>
            <div className="signup__container">
                <h1>Sign Up</h1>
                <form onSubmit={handleUserSubmit}>
                    <div className="signup__fields">
                        <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)}/>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
                        <input type="text" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}/>
                        <input type="text" placeholder="Card number" onChange={(e) => setCardNumber(e.target.value)}/>
                    </div>
                    <div className="signup__button-container">
                        <button>Sign up</button>
                    </div>
                </form>
                <div className="signup__clicklogin-container">
                    <p>Already have an account? <Link to="/login"><span>Login</span></Link></p>
                </div>
                
            </div>
        </div>
    </Helmet>
  )
}

export default Signup