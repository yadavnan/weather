import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true,  // Open the app in the browser on startup
  },
  base: './',  // For deployment on GitHub Pages
});
