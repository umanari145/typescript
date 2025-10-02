import { defineConfig } from 'vite'

export default defineConfig({
  root: 'vitesample',
  base: '/',
  publicDir: 'public',
  build: {
    outDir: '../dist',
  },
  server: {
    host: true, // true に設定すると、LAN やパブリックアドレスを含むすべてのアドレスをリッスン
    port: 5173, // 開発サーバーが使用するポート番号
  },
})