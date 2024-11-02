export default async function MealDetailsPage({ params }: { params: { mealSlug: string } }) {
  const { mealSlug } = await params;
  return <div>Meal Details Page: { mealSlug }</div>;
}
