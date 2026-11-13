import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const status=z.enum(['draft','planned','sample','published']);
const date=z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const editorial={status,updatedAt:date,verifiedAt:date.optional(),tools:z.array(z.string()).default([])};
const articles=defineCollection({loader:glob({pattern:'**/*.md',base:'./src/content/articles'}),schema:z.object({...editorial,title:z.string(),summary:z.string(),category:z.string(),noteUrl:z.url().optional(),mediumUrl:z.url().optional()})});
export const collections={articles};
