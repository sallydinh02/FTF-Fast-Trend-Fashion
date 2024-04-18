import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Helmet from '../components/Helmet'
//import 'bootstrap/dist/css/bootstrap.min.css'

const Login = () => {
  const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const history = useHistory()

    // handle user submit information to login
    const handleUserSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3000/login", { email, password })
        .then(result => 
          {
            console.log(result)
            if(result.data === "Success")
            {
              history.push("/")
            }
            else
            {
                history.push("/signup")
                alert("You don't have an account yet")
            }
        })
        .catch(err => console.log(err))
    }
  return (
    // <Helmet title="Login">
      
    // </Helmet>
    <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2><center>Login</center></h2>
            <form onSubmit={handleUserSubmit}>
                
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
                    Login
                </button>
                </form>
                <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
    </div>
  )
}

export default Login