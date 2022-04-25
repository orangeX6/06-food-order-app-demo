import { useReducer } from 'react';
import CartContext from './cart-context';

const cartReducer = (state, action) => {
  // console.log(state);
  switch (action.type) {
    case 'ADD':
      // console.log(action);
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = [...state.items, action.payload];
      }

      // console.log(updatedItems, updatedTotalAmount);
      return { items: updatedItems, totalAmount: updatedTotalAmount };

    case 'REMOVE':
      const indexOfItemToRemove = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const itemToRemove = state.items[indexOfItemToRemove];
      const updatedTotal = state.totalAmount - itemToRemove.price;

      let updatedItemCart;
      if (itemToRemove.amount === 1) {
        updatedItemCart = state.items.filter(
          (item) => item.id !== action.payload
        );
      } else {
        const updatedItem = {
          ...itemToRemove,
          amount: itemToRemove.amount - 1,
        };
        updatedItemCart = [...state.items];
        updatedItemCart[indexOfItemToRemove] = updatedItem;
      }

      console.log(updatedItemCart, updatedTotal);
      return {
        items: updatedItemCart,
        totalAmount: updatedTotal,
      };
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
