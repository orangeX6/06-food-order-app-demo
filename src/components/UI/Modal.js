import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Backdrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.openCartHandler}></div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById('overlays')
      )}
      {ReactDOM.createPortal(
        <Backdrop openCartHandler={props.openCartHandler} />,
        document.getElementById('overlays')
      )}
    </Fragment>
  );
};

export default Modal;
