import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import mkcert from 'vite-plugin-mkcert'
    
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  //base: "/Album-Fotos-FrontEnd/",  // para gh-pages
  build: {
    outDir: 'dist'
  }
  
  // build: {
  //   outDir: path.join( __dirname,'../backend/public')
  // }

})

