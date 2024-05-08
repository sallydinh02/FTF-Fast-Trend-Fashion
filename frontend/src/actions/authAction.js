export const setCustomerLogin = (isLoggedIn, customerId) => {
    return {
      type: 'SET_CUSTOMER_LOGIN',
      payload: { isLoggedIn, customerId }
    };
  };