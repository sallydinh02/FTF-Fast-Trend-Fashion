import React from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import MyAccount from '../pages/MyAccount'
import Login from '../pages/SellerLogin'
import Signup from '../pages/SellerSignup'
import AddProduct from '../pages/AddProduct'
import ViewProduct from '../pages/ViewProduct'

const Routes = () => {
    return (
        <Switch>
            <Route path='/seller-login' component={Login}/>
            <Route path='/seller-addproduct' component={AddProduct}/>
            <Route path='/seller-viewproduct' component={ViewProduct}/>
            <Route path='/seller-myaccount' component={MyAccount}/>
            <Route path='/seller-signup' component={Signup}/>
        </Switch>
    )
}

export default Routes