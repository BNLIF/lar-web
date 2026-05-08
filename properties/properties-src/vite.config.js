import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

function cleanAssets() {
  return {
    name: 'clean-assets',
    buildStart() {
      const dir = resolve(__dirname, '..', 'assets')
      if (fs.existsSync(dir))
        fs.rmSync(dir, { recursive: true, force: true })
    }
  }
}

// Serve ../img/ and ../data/ as /img/ and /data/ in dev mode
function serveParentAssets() {
  return {
    name: 'serve-parent-assets',
    configureServer(server) {
      for (const prefix of ['img', 'data']) {
        server.middlewares.use('/' + prefix, (req, res, next) => {
          const file = resolve(__dirname, '..', prefix, req.url.slice(1))
          if (fs.existsSync(file)) {
            const ext = file.split('.').pop()
            const mime = { png: 'image/png', gif: 'image/gif', jpg: 'image/jpeg',
                           json: 'application/json', py: 'text/plain' }
            res.setHeader('Content-Type', mime[ext] || 'application/octet-stream')
            fs.createReadStream(file).pipe(res)
          } else { next() }
        })
      }
    }
  }
}

export default defineConfig({
  plugins: [vue(), cleanAssets(), serveParentAssets()],
  base: './',
  resolve: {
    // Point bare 'highcharts' import at the ESM build so the exporting/offline
    // modules (which do `import from '../highcharts.js'`) share the exact same
    // Highcharts singleton. Use a RegExp to avoid mangling 'highcharts/esm/...' paths.
    alias: [
      { find: /^highcharts$/, replacement: resolve(__dirname, 'node_modules/highcharts/esm/highcharts.js') },
    ],
  },
  build: {
    outDir: resolve(__dirname, '..'),
    emptyOutDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        index:       resolve(__dirname, 'index.html'),
        basic:       resolve(__dirname, 'basic.html'),
        electronics: resolve(__dirname, 'electronics.html'),
        energy:      resolve(__dirname, 'energy.html'),
        pass:        resolve(__dirname, 'pass.html'),
        scint:       resolve(__dirname, 'scint.html'),
        spacecharge: resolve(__dirname, 'spacecharge.html'),
        trans:       resolve(__dirname, 'trans.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        }
      }
    }
  }
})
