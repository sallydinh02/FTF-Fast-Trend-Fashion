const initialState = {
    isLoggedIn: false,
    customerId: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CUSTOMER_LOGIN':
        return {
          ...state,
          isLoggedIn: action.payload.isLoggedIn,
          customerId: action.payload.customerId
        };
      default:
        return state;
    }
  };
  
  export default authReducer;