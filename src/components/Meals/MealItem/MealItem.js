import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';

const MealItem = ({ meal }) => {
  return (
    <li className={classes.meal}>
      <div>
        <div>
          <h3>{meal.name}</h3>
        </div>
        <div className={classes.description}>{meal.description}</div>
        <div className={classes.price}>{`$${meal.price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealItemForm id={meal.id} />
      </div>
    </li>
  );
};

export default MealItem;
