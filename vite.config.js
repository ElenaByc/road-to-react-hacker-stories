import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'


export default defineConfig({
  plugins: [react(), eslint(), svgr()],
});
