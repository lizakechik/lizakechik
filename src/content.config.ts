import { defineCollection, z } from 'astro:content';

const stories = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    role: z.string(),
    company: z.string().optional(),
    category: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = {
  stories,
};
