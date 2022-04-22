import React, { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
import mealsImage from '../../assets/meals-home-2.jpg';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Tomaato</h1>
        {/* <HeaderCartButton onClick={openCart}>Cart</HeaderCartButton> */}
        <HeaderCartButton openCartHandler={props.openCartHandler}>
          Cart
        </HeaderCartButton>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="Pizza and ingredients" />
      </div>
    </Fragment>
  );
};

export default Header;
