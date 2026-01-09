import type { AstroGlobal } from 'astro'
import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import config from '../config'

const categoryName = {
  posts: '雑記',
  releases: 'お知らせ'
}

export const GET = async (context: AstroGlobal) => {
  const postCollection = await getCollection('posts');
  const releaseCollection = await getCollection('releases');

  const posts = postCollection
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())

  const releases = releaseCollection
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  const items = [...posts, ...releases].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: config.siteName,
    description: config.description,
    site: context.site ?? '',
    items: items.map(i => ({
      title: i.data.title,
      pubDate: i.data.date,
      description: i.data.description,
      link: `/${i.collection}/${i.id}`,
      categories: [categoryName[i.collection]],
    })),
    customData: `<language>ja-JP</language>`
  })
}
