import React, { useContext } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const ctxCart = useContext(CartContext);
  const numberOfItems = ctxCart.items.reduce((cur, item) => {
    return cur + item.amount;
  }, 0);

  // console.log(ctxCart);
  return (
    <button className={classes.button} onClick={props.openCartHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
