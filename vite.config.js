import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true, // Automatically open the app in the browser on startup
  },
  base: '/<weather>/', // Replace <repo-name> with your GitHub repository name
});
