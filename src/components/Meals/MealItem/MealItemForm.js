import { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumeric = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumeric < 1 ||
      enteredAmountNumeric > 6
    )
      return setAmountIsValid(false);

    props.onAddToCart(enteredAmountNumeric);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        className={classes.input}
        label="Amount"
        input={{
          id: `amount_${props.id}`,
          type: 'number',
          min: '1',
          max: '6',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter valid quantity (1-6)</p>}
    </form>
  );
};

export default MealItemForm;
