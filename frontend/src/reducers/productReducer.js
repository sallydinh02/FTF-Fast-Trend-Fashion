const initialState = {
    selectedProduct: null,
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SELECT_PRODUCT':
        return { ...state, selectedProduct: action.payload };
      default:
        return state;
    }
  };
  
  export default productReducer;