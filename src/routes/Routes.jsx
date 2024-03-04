import React from 'react'
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'

import Shop from '../pages/Shop'
import ViewCart from '../pages/ViewCart'
import Product from '../pages/Product'
import SellerCentral from './pages/SellOnFTF'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Shop}/>
            <Route path='/:slug' component={Product}/>
            <Route path='/viewcart' component={ViewCart}/>
            <Route path='/orders' component={Orders}/>
            <Route path='/sellercentral' component={SellerCentral}/>
        </Switch>
    )
}

export default Routes

// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
