import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Helmet from '../components/Helmet'
import tryonPhotoEx from '../assets/images/example-photo.jpg'

const Signup = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [address, setAddress] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [cardNumber, setCardNumber] = useState()
    const [tryonPhoto, setTryonPhoto]=useState(false);
    // const [newUser, setNewUser]=useState(
    //     {
    //         name: '',
    //         email: '',
    //         password: '',
    //         address: '',
    //         phoneNumber: '',
    //         cardNumber: ''
    //     }
    // );
    
    const imageHandler=(e)=>{
        setTryonPhoto(e.target.files[0]);
    }
    // const changeHandler=(e)=>{
    //     setNewUser({...newUser, [e.target.name]:e.target.value})
    // }

    const history = useHistory()

    const handleUserSubmit = async(e) => {
        e.preventDefault()
        //let userInfo=newUser;
        // let formData=new FormData();
        // formData.append('name', newUser.name)
        // formData.append('email', newUser.email)
        // formData.append('password', newUser.password)
        // formData.append('address', newUser.address)
        // formData.append('phoneNumber', newUser.phoneNumber)
        // formData.append('cardNumber', newUser.cardNumber)
        // formData.append('tryonPhoto', tryonPhoto)
        
        axios.post("http://localhost:4000/signup", { name, email, password, address, phoneNumber, cardNumber, tryonPhoto})
        // await fetch("http://localhost:4000/signup", {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //     },
        //     body: formData,
        // })
        .then(result => {
            console.log(result);
            if (result.data.success){
                localStorage.setItem('auth-token',result.data.token);
                //newUser.tryonPhoto=result.data.image_url;
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
                        <div className="signup__fields__input">
                            <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)}/>
                            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                            <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)}/>
                            <input type="text" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}/>
                            <input type="text" placeholder="Card number" onChange={(e) => setCardNumber(e.target.value)}/>
                        </div>
                        <div className="signup__fields__img">
                            <p>Upload your full-body photo. Our AI feature will help you try on fashion items virtually</p>
                            {/* <img src={tryonPhotoEx} alt="" width="95%" height="95%"></img> */}
                            <label htmlFor="file-input">
                                <img src={tryonPhoto?URL.createObjectURL(tryonPhoto):tryonPhotoEx} alt="" width="95%" height="95%"></img>
                            </label>
                            <input onChange={imageHandler} type="file" name='image' id='file-input'></input>
                        </div>
                        {/* <img className="signup__fields__tryonimg" src={tryonPhotoEx} alt="" width="85%" height="85%"></img> */}
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