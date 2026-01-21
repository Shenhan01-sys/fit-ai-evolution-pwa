import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'
import fs from 'fs'

// Custom plugin to serve ONNX Runtime WASM files properly
function onnxWasmPlugin(): Plugin {
    return {
        name: 'onnx-wasm-plugin',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                // Intercept requests for ONNX WASM files
                if (req.url?.startsWith('/onnx-wasm/')) {
                    const fileName = req.url.replace('/onnx-wasm/', '').split('?')[0]
                    const filePath = path.resolve(__dirname, 'node_modules/onnxruntime-web/dist', fileName)

                    if (fs.existsSync(filePath)) {
                        const ext = path.extname(fileName)
                        const contentType = ext === '.wasm' ? 'application/wasm' :
                            ext === '.mjs' ? 'application/javascript' :
                                'application/octet-stream'

                        res.setHeader('Content-Type', contentType)
                        res.setHeader('Access-Control-Allow-Origin', '*')
                        fs.createReadStream(filePath).pipe(res)
                        return
                    }
                }
                next()
            })
        }
    }
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        onnxWasmPlugin(),  // Custom plugin to serve ONNX WASM from node_modules
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
            manifest: {
                name: 'FitAI Evolution',
                short_name: 'FitAI',
                description: 'AI-Powered Fitness Tracking with Web3 Achievements',
                theme_color: '#0052FF',
                background_color: '#0F172A',
                display: 'standalone',
                icons: [
                    {
                        src: '/icon-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/icon-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: '/icon-512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            },
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/api\.*/i,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'api-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 // 24 hours
                            }
                        }
                    },
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'image-cache',
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                            }
                        }
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true
            }
        },
        // Allow serving ONNX Runtime WASM files
        fs: {
            allow: ['..']
        }
    },
    optimizeDeps: {
        exclude: ['onnxruntime-web']
    },
    assetsInclude: ['**/*.wasm', '**/*.mjs'],
    build: {
        target: 'esnext',
        minify: 'terser',
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'react-router-dom'],
                    'vendor-web3': ['viem', 'wagmi', '@coinbase/onchainkit'],
                    'vendor-ai': ['groq-sdk', '@teachablemachine/pose', '@tensorflow/tfjs']
                }
            }
        }
    }
})
