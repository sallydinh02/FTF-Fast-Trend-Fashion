import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Helmet from '../components/Helmet'
import { useDispatch, useSelector } from "react-redux";
import { setCustomerLogin } from '../actions/authAction';
//import 'bootstrap/dist/css/bootstrap.min.css'

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const history = useHistory()

    // handle user submit information to login
    const handleUserSubmit = async (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/login", 
        { email, password },{
          headers: {
            Accept: 'application/json',
        }
        })
        .then(result => 
          {
            console.log(result)
            if(result.data.success)
            {
              const customerId=result.data._id;
              localStorage.setItem('auth-token',result.data.token);
              dispatch(setCustomerLogin(true, customerId));
              history.push("/")
            }
            else
            {
                alert(result.data.error)
                //history.push("/signup")
            }
        })
        .catch(err => console.log(err))
    }
  return (
    <Helmet title="Login">
      <div className='login'>
            <div className="login__container">
                <h1>Login</h1>
                <form onSubmit={handleUserSubmit}>
                    <div className="login__fields">
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="login__button-container">
                        <button>Login</button>
                    </div>
                </form>
                <div className="login__clicksignup-container">
                    <p>Don't have an account? <Link to="/signup"><span>Sign up</span></Link></p>
                </div>
            </div>
        </div>
    </Helmet>
    
  )
}

export default Login