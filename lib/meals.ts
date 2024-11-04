import { S3 } from '@aws-sdk/client-s3';
import { Meal } from '@/app/components/meals/meals-grid';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { S3_BUCKET } from '@/utils/s3Path';

const s3 = new S3({
    region: 'eu-north-1',
});
const db = sql('meals.db');

export async function getMeals(): Promise<Meal[]> {
    return (await db.prepare('SELECT * FROM meals').all()) as Meal[];
}

export async function getMeal(mealSlug: string): Promise<Meal> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return (await db
        .prepare('SELECT * FROM meals WHERE slug = ?')
        .get(mealSlug)) as Meal;
}

export async function saveMeal(
    meal: Omit<Meal, 'id' | 'slug' | 'image'>,
    image: File
) {
    const slug = slugify(meal.title, { lower: true });
    const sanitizedInstructions = xss(meal.instructions);

    const extension = image.name.split('.').pop();
    // Generate image name
    const imageName = `${slug}.${extension}`;

    // Create the image file

    const bufferedImage = await image.arrayBuffer();
    s3.putObject({
        Bucket: S3_BUCKET,
        Key: imageName,
        Body: Buffer.from(bufferedImage),
        ContentType: image.type,
    });
    // Insert the meal into the database
    const stmt = db.prepare(
        'INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    stmt.run(
        meal.title,
        meal.summary,
        sanitizedInstructions,
        imageName,
        meal.creator,
        meal.creator_email,
        slug
    );
}
