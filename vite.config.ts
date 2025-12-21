import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // ここをスイッチすればOK
  //root: 'vitesample',
  //root: 'htmlutil',
  //root: 'health',
  //root: 'health-model',
  //root: 'async_await_promise',
  root: 'modal',
  base: '/',
  publicDir: 'public',
  build: {
    outDir: '../dist',
  },
  server: {
    cors: true,
    host: true, // true に設定すると、LAN やパブリックアドレスを含むすべてのアドレスをリッスン
    port: 5173, // 開発サーバーが使用するポート番号
  },
  plugins: [vue()],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  }
})