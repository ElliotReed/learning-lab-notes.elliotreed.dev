import { z, defineCollection } from "astro:content";

const notesCollection = defineCollection({
    type: 'content',
    schema: z.object({
        // layout: z.string(),
        title: z.string(),
        date: z.date(),
        categories: z.array(z.string()),
    }),
});

export const collections = {
    'notes': notesCollection,
};