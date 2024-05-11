// import { legacy_createStore as createStore } from 'redux';
// import authReducer from '../src/reducers/authReducer';

// // Create the Redux store
// const store = createStore(authReducer);

// export default store;

import { legacy_createStore as createStore, combineReducers} from 'redux';
import authReducer from '../src/reducers/authReducer';
// import productReducer from '../src/reducers/productReducer';

// Create combined reducers
const reducer=combineReducers({
    auth: authReducer,
    //product: productReducer,
})
// Create the Redux store
const store = createStore(reducer);

export default store;