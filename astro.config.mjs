import { defineConfig } from 'astro/config';
import config from './src/config';

// https://astro.build/config
export default defineConfig({
  site: config.url
});
