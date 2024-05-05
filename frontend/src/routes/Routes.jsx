import React from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import SearchProduct from '../pages/SearchProduct'
import SellFTF from '../pages/SellFTF'
import ViewCart from '../pages/ViewCart'
import Orders from '../pages/Orders'
import MyAccount from '../pages/MyAccount'
import Login from '../pages/Login'
import Product from '../pages/Product'
import Signup from '../pages/Signup'
import CustomerInfo from '../pages/CustomerInfo'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/searchproduct/:slug' component={Product}/>
            <Route path='/ftf-seller' component={SellFTF}/>
            <Route path='/searchproduct' component={SearchProduct}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/myaccount' component={MyAccount}/>
            <Route path='/viewcart' component={ViewCart}/>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup}/>
            <Route path='/signup-info' component={CustomerInfo}/>
        </Switch>
    )
}

export default Routes