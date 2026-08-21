import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const stories = defineCollection({
	loader: glob({
		pattern: "**/*.{md,mdx}",
		base: "./src/content/stories",
	}),
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