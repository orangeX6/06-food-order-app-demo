import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import classes from './MealsAvailable.module.css';

const MealsAvailable = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const loadMeals = [];

      const response = await fetch(
        'https://react-http-67642-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
      );

      // console.log(response);
      if (!response.ok) throw new Error('Something went wrong!');

      const data = await response.json();
      // console.log(Object.keys(data));

      for (const [key, { description, name, price }] of Object.entries(data)) {
        loadMeals.push({ id: key, description, price, name });
      }
      setMeals(loadMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((err) => {
      console.error(err);
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading ...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => <MealItem meal={meal} key={meal.id} />);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default MealsAvailable;
