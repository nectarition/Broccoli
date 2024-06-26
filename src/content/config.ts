import { defineCollection, z } from 'astro:content';

const baseProps = {
  draft: z.boolean().optional(),
  title: z.string(),
  description: z.string(),
  date: z.date(),
  showList: z.boolean().optional()
}

const postCollection = defineCollection({
  type: 'content',
  schema: z.object(baseProps)
});

const pressReleaseCollection = defineCollection({
  type: 'content',
  schema: z.object(baseProps)
})

const pageCollection = defineCollection({
  type: 'content',
  schema: z.object(baseProps)
});

const workCollection = defineCollection({
  type: 'content',
  schema: z.object(baseProps)
})

export const collections = {
  'pages': pageCollection,
  'posts': postCollection,
  'works': workCollection,
  'releases': pressReleaseCollection
};
