import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite' // 组件自动按需引入
import { VantResolver } from 'unplugin-vue-components/resolvers'
// 自动导入composition API
import autoImport from 'unplugin-auto-import/vite'
// gzip/br 压缩
import compression from 'vite-plugin-compression'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({ resolvers: [VantResolver()] }),
    autoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: path.resolve(__dirname, 'types/auto-import.d.ts'),
      eslintrc: {
        // 已存在文件设置默认 false，需要更新时再打开，防止每次更新都重新生成
        enabled: false,
        // 生成文件地址和名称
        filepath: path.resolve(__dirname, './src/.eslintrc-auto-import.json'),
        globalsPropValue: true
      }
    }),
    compression({
      threshold: 1024*500, // 体积大于 threshold 才会被压缩,单位 b
      ext:'.gz', // 压缩文件格式
      deleteOriginFile: false // 是否删除源文件
    }),
  ],
  envDir: path.resolve(__dirname),
  server: {
    host: '0.0.0.0',
    port: 8891,
    hmr: true, // 开启热更新
    open: true, // 服务启动时自动打开浏览器
    https: false // 是否开启https
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/style/variables.scss";' // 可以在vue文件中使用scss变量
      }
    }
  }
})
