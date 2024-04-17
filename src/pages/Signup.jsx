import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Helmet from '../components/Helmet'
//import 'bootstrap/dist/css/bootstrap.min.css'

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
    // <Helmet title="Signup">
        
    // </Helmet>
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
        <h2><center>Sign Up</center></h2>

            <form onSubmit={handleUserSubmit}>
                <div className="mb-3">
                    {/* <label htmlFor="email">
                        <strong>Name</strong>
                    </label> */}
                    <input type="text" 
                    placeholder='Name' 
                    autoComplete='off' 
                    name='email' 
                    className='form-control rounded-0'
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    {/* <label htmlFor="email">
                        <strong>Email</strong>
                    </label> */}
                    <input type="text" 
                    placeholder='Email' 
                    autoComplete='off' 
                    name='email' 
                    className='form-control rounded-0' 
                    onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                <div className="mb-3">
                    {/* <label htmlFor="email">
                        <strong>Password</strong>
                    </label> */}
                    <input type="password" 
                    placeholder='Password' 
                    name='password' 
                    className='form-control rounded-0' 
                    onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Sign Up
                </button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            
        </div>
    </div>
  )
}

export default Signup