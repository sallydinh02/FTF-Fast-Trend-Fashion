import React, { useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import logo from '../assets/images/FTF-logo-crop.png'
import cartImg from '../assets/images/iconcart.png'
import userImg from '../assets/images/iconuser.png'
import SearchBar from './SearchBar'

const mainNavLeft = [
    // {
    //     display: "Home",
    //     path: "/"
    // },
    {
        display: "Sell On FTF",
        path: "/ftf-seller"
    },
    {
        display: "Orders",
        path: "/orders"
    },
]

const mainNavRight=[
    
    {
        display: "Login",
        path: "/login"
    },
    {
        display: "My account",
        path: "/myaccount",
        // submenu: [
        // {
        //     display: 'Login',
        //     path: 'login',
        // },
        // {
        //     display: 'Profile',
        //     path: 'profile',
        // },
        // {
        //     display: 'Logout',
        //     path: 'logout',
        // },]
    },
    // {
    //     display: "View cart",
    //     path: "/viewcart"
    // },
]

const Header = () => {

    const { pathname } = useLocation()
    const activeNavLeft = mainNavLeft.findIndex(e => e.path === pathname)
    const activeNavRight = mainNavRight.findIndex(e => e.path === pathname)

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
            window.removeEventListener("scroll")
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
                    <SearchBar></SearchBar>
                    <div className="header__menu__right">
                        {
                            mainNavRight.map((item, index) => (
                                <div
                                    key={index}
                                    className={`header__menu__item header__menu__left__item ${index === activeNavRight ? 'active' : ''}`}
                                    onClick={menuToggle}
                                >
                                    <Link to={item.path}>
                                        <span>{item.display}</span>
                                    </Link>
                                </div>
                            ))
                        }
                        <div className="header__menu__item header__menu__right__item">
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
