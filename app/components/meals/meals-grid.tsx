import MealItem from './meal-item';
import classes from './meals-grid.module.css';
export type Meal = { id: string, title: string, slug: string, image: string, summary: string, creator: string, creator_email: string, instructions: string };

export default function MealsGrid({ meals }: { meals: Meal[] }) {
  return <ul className={classes.meals}>
    {meals?.map((meal) => (
      <li key={meal.id}>
        <MealItem meal={meal} />
      </li>
    ))}
  </ul>
}
