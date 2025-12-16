import { glob } from 'astro/loaders';
import { z, defineCollection } from 'astro:content'

const baseProps = {
  draft: z.boolean().optional(),
  title: z.string(),
  description: z.string(),
  date: z.date(),
  showList: z.boolean().optional()
}

const posts = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/posts' }),
  schema: z.object(baseProps)
})

const releases = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/releases' }),
  schema: z.object(baseProps)
})

const pages = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/pages' }),
  schema: z.object(baseProps)
})

const works = defineCollection({
  loader: glob({ pattern: ['**/*.md', '**/*.mdx'], base: './src/content/works' }),
  schema: z.object(baseProps)
})

export const collections = {
  posts,
  releases,
  pages,
  works
};
