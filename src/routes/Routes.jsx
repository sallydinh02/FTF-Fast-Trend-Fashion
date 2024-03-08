import React from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'

import Home from '../pages/Home'
import SearchBook from '../pages/SearchBook'
import SellFTF from '../pages/SellFTF'
import ViewCart from '../pages/ViewCart'
import Orders from '../pages/Orders'
import QandA from '../pages/QandA'
import Login from '../pages/Login'
import Product from '../pages/Product'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/searchbook/:slug' component={Product}/>
            <Route path='/ftf-seller' component={SellFTF}/>
            <Route path='/searchbook' component={SearchBook}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/q&a' component={QandA}/>
            <Route path='/viewcart' component={ViewCart}/>
            <Route path='/login' component={Login}/>
        </Switch>
    )
}

export default Routes
