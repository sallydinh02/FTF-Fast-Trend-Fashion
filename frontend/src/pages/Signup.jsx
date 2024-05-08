import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Helmet from '../components/Helmet'
import tryonPhotoEx from '../assets/images/example-photo.jpg'

const Signup = () => {
    const [tryonPhoto, setTryonPhoto]=useState(false);
    const [newUser, setNewUser]=useState(
        {
            name: "",
            email: "",
            password: "",
            address: "",
            phoneNumber: "",
            cardNumber: ""
        }
    );
    
    const imageHandler=(e)=>{
        const imageFile=e.target.files[0]
        setTryonPhoto(imageFile);
    }
    const changeHandler=(e)=>{
        setNewUser({...newUser, [e.target.name]:e.target.value})
    }

    const history = useHistory()

    const handleUserSubmit = async() => {
        let responseData;
        let userInfo=newUser;

        let formData=new FormData;
        formData.append('tryonPhoto', tryonPhoto);

        await fetch("http://localhost:4000/upload", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        })
        .then((resp)=>resp.json()).then((data)=>{responseData=data})

        if(responseData.success)
        {
            //localStorage.setItem('auth-token',responseData.token);
            newUser.tryonPhoto=responseData.image_url;
            console.log({'name': newUser.name, 'email': newUser.email, 'address': newUser.address, 'phoneNumber': newUser.phoneNumber, 'cardNumber': newUser.cardNumber, 'tryonPhoto': newUser.tryonPhoto})
            await fetch('http://localhost:4000/signup',{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            }).then((resp)=>resp.json()).then((data)=>{
                if (data.success){
                    localStorage.setItem('auth-token',data.token);
                    //resp.setHeader("auth-token", data.token);
                    history.push("/login")
                    //alert("New user created")
                }
                else {
                    alert(data.error)
                }
            })
        }
    }

    return (
    <Helmet title="Signup">
        <div className='signup'>
            <div className="signup__container">
                <h1>Sign Up</h1>
                <div className="signup__fields">
                    <div className="signup__fields__input">
                        <input value={newUser.name} onChange={changeHandler} type="text" name="name" placeholder="Full Name"/>
                        <input value={newUser.email} onChange={changeHandler}  type="email" name="email" placeholder="Email" />
                        <input value={newUser.password} onChange={changeHandler} type="password" name="password" placeholder="Password"/>
                        <input value={newUser.address} onChange={changeHandler} type="text" name="address" placeholder="Address"/>
                        <input value={newUser.phoneNumber} onChange={changeHandler} type="text" name="phoneNumber" placeholder="Phone Number"/>
                        <input value={newUser.cardNumber} onChange={changeHandler} type="text" name="cardNumber" placeholder="Card number"/>
                    </div>
                    <div className="signup__fields__img">
                        <p>Upload your full-body photo. Our AI feature will help you try on fashion items virtually</p>
                            
                        <label htmlFor="file-input">
                            <img src={tryonPhoto?URL.createObjectURL(tryonPhoto):tryonPhotoEx} alt="" width="95%" height="95%"></img>
                        </label>
                        <input onChange={imageHandler} type="file" name='tryonPhoto' id='file-input'></input>
                    </div>
                        
                    </div>
                    <div className="signup__button-container">
                        <button onClick={()=>{handleUserSubmit()}}>Sign up</button>
                    </div>
                    <div className="signup__clicklogin-container">
                        <p>Already have an account? <Link to="/login"><span>Login</span></Link></p>
                    </div>
                
                </div>
        </div>
    </Helmet>
  )
}

export default Signup