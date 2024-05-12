import React, { useRef, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import logo from '../assets/images/FTF-logo-crop.png'
import cartImg from '../assets/images/iconcart.png'
import userImg from '../assets/images/iconuser.png'
import SearchBar from './SearchBar'
import { ShopContext } from '../Context/ShopContext'

const mainNavLeft = [
    {
        display: "Sell On FTF",
        path: "/ftf-seller"
    },
    {
        display: "Orders",
        path: "/orders"
    },
]

const Header = () => {
    const {products}=useContext(ShopContext)

    const { pathname } = useLocation()
    const activeNavLeft = mainNavLeft.findIndex(e => e.path === pathname)
    
    const headerRef = useRef(null)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('shrink')
            } else {
                headerRef.current.classList.remove('shrink')
            }
        })
        return () => {
            window.removeEventListener("scroll", null)
        };
    }, []);

    const menuLeft = useRef(null)

    const menuToggle = () => menuLeft.current.classList.toggle('active')

    return (
        <div className="header" ref={headerRef}>
            <div className="container">
                
                <div className="header__menu">
                <Link to="/">
                    <div className="header__logo">
                            <img src={logo} alt="" />
                    </div>
                </Link>
                    <div className="header__menu__mobile-toggle" onClick={menuToggle}>
                        <i className='bx bx-menu'></i>
                    </div>
                    <div className="header__menu__left" ref={menuLeft}>
                        <div className="header__menu__left__close" onClick={menuToggle}>
                            <i className='bx bx-chevron-left'></i>
                        </div>
                        {
                            mainNavLeft.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNavLeft ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                    <SearchBar placeholder="Search for products" data={products}></SearchBar>
                    <div className="header__menu__right">
                        
                        <div className="header__menu__right__item">
                            {
                            localStorage.getItem('auth-token')
                            ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
                            :<Link to="/login"><button>Login</button></Link>}
                            <Link to="/myaccount"><p>My account</p></Link>
                            <Link to="/viewcart">
                                <img src={cartImg} alt="" width="45" height="45"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
