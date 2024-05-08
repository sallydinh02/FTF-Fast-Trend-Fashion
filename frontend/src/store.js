import { legacy_createStore as createStore } from 'redux';
import authReducer from '../src/reducers/authReducer';

// Create the Redux store
const store = createStore(authReducer);

export default store;