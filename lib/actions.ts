'use server';

import { Meal } from '@/app/components/meals/meals-grid';
import { saveMeal } from './meals';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function shareMeal(
    prevState: { message: string },
    formData: FormData
) {
    const meal: Omit<Meal, 'id' | 'slug' | 'image'> = {
        title: formData.get('title')?.toString() ?? '',
        summary: formData.get('summary')?.toString() ?? '',
        instructions: formData.get('instructions')?.toString() ?? '',
        creator: formData.get('name')?.toString() ?? '',
        creator_email: formData.get('email')?.toString() ?? '',
    };
    const image = formData.get('image') as File;

    if (
        !meal.title ||
        !meal.summary ||
        !meal.instructions ||
        !meal.creator ||
        !meal.creator_email ||
        image.size === 0 ||
        !meal.creator_email.includes('@')
    ) {
        return { message: 'Invalid form data' };
    }

    await saveMeal(meal, image);
    revalidatePath('/meals');
    redirect('/meals');
}
