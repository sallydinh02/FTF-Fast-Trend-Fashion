import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Helmet from '../components/Helmet'

const Signup = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const history = useHistory()

    const handleUserSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3000/signup", { name, email, password })
        .then(result => {console.log(result)
        history.push("/login")
        })
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
                    </div>
                    <div className="signup__button-container">
                        <button>Continue</button>
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