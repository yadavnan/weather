import { defineConfig } from 'vite';

export default defineConfig({
  base: '/weather/',  // Use your repository name here
  server: {
    open: true,  // Open the app in the browser on startup
  },
});
