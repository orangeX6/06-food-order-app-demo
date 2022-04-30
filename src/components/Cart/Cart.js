import React, { useContext, useState } from 'react';

import CartItem from './CartItem';
import Checkout from './Checkout';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorSubmitting, setErrorSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      await fetch(
        `https://react-http-67642-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: userData,
            orderList: cartCtx.items,
            total: cartCtx.totalAmount,
          }),
        }
      );

      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (err) {
      console.error(err, err.message);
      setErrorSubmitting(true);
    }
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderClickHandler = () => {
    setIsCheckout(true);
  };

  const modalActions = (
    <div className={classes.actions}>
      <button
        className={classes['button--alt']}
        onClick={props.openCartHandler}
      >
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderClickHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount:</span>
        <span>{totalAmount}</span>
      </div>
      <div>
        {isCheckout && (
          <Checkout
            onConfirm={submitOrderHandler}
            onCancel={props.openCartHandler}
          />
        )}
      </div>
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.openCartHandler}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal openCartHandler={props.openCartHandler}>
      {errorSubmitting ? <p>Something went wrong. Please try again</p> : ''}
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && !errorSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
