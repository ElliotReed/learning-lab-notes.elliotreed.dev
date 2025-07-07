import { z, defineCollection } from "astro:content";

const notesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
        categories: z.array(z.string()),
        tags: z.array(z.string()).optional(),
    }),
});

export const collections = {
    'notes': notesCollection,
};