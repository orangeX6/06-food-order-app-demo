import React, { useContext } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const openCartHandler = () => {
    props.openCartHandler();
  };

  const ctxCart = useContext(CartContext);
  console.log(ctxCart);
  return (
    <button className={classes.button} onClick={openCartHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{ctxCart.items.length}</span>
    </button>
  );
};

export default HeaderCartButton;
