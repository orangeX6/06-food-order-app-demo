import { useReducer } from 'react';
import CartContext from './cart-context';

const cartReducer = (state, action) => {
  // console.log(action, state);
  switch (action.type) {
    case 'ADD':
      const updatedItems = [...state.items, action.payload];
      console.log();
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;
      // console.log(updatedItems, updatedTotalAmount);
      return { items: updatedItems, totalAmount: updatedTotalAmount };
    case 'REMOVE':
      return;
    default:
      return state;
  }
};

const initialState = {
  items: [],
  totalAmount: 0,
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, initialState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', payload: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', payload: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
