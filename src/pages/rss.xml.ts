import type { AstroGlobal } from 'astro'
import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import config from '../config'

export const GET = async (context: AstroGlobal) => {
  const postCollection = await getCollection('posts');
  const posts = postCollection
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  console.log(context.site)

  return rss({
    title: config.siteName,
    description: config.description,
    site: context.site ?? '',
    items: posts.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/posts/${p.slug}`
    })),
    customData: `<language>ja-JP</language>`
  })
}