import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';

export default defineConfig({
  vite: () => ({
    plugins: [react()],
  }),
  manifest:{
    permissions:['bookmarks', "topSites", "storage"]
  }
});
