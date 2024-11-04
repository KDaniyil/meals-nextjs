import { Meal } from '@/app/components/meals/meals-grid';
import classes from './page.module.css';
import Image from 'next/image';
import { getMeal } from '@/lib/meals';
import { notFound } from 'next/navigation';
import { S3_PATH } from '@/utils/s3Path';

export default async function MealDetailsPage({ params }: { params: Promise<{ mealSlug: string }> }) {
  const { mealSlug } = await params;

  const meal: Meal = await getMeal(mealSlug);

  if(!meal){
    notFound();
  }
  meal.instructions = meal.instructions.replace(/\n/g, '<br />');
  return <>
    <header className={classes.header}>
      <div className={classes.image}>
        <Image src={`${S3_PATH}${meal?.image}`} alt={meal?.title} fill />
      </div>
      <div className={classes.headerText}>
        <h1>{meal?.title}</h1>
        <p className={classes.creator}>by <a href={`mailto:${meal?.creator_email}`}>{meal?.creator}</a></p>
      </div>
    </header>
    <main>
      <p className={classes.instructions} dangerouslySetInnerHTML={{ __html: meal?.instructions }} />
    </main>
  </>
}
