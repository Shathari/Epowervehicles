import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(dirname, './src') },
      // framer-motion marks react/react-dom as *optional* peer deps in its own package.json.
      // Rolldown's optional-peer-dep handling then externalizes framer-motion's internal
      // `import ... from 'react'` into an empty virtual stub instead of resolving the real,
      // installed React. Exact-match (regex) aliases bypass that heuristic without the
      // accidental prefix-matching that plain string keys trigger for subpaths like
      // "react/jsx-runtime".
      { find: /^react$/, replacement: require.resolve('react') },
      { find: /^react-dom$/, replacement: require.resolve('react-dom') },
      { find: /^react\/jsx-runtime$/, replacement: require.resolve('react/jsx-runtime') },
      { find: /^react\/jsx-dev-runtime$/, replacement: require.resolve('react/jsx-dev-runtime') },
      { find: /^react-dom\/client$/, replacement: require.resolve('react-dom/client') },
    ],
  },
  build: {
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['framer-motion'],
  },
})
