// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      bodyAttrs: {
        dir: 'rtl'
      },
      link: [
        { rel: 'icon', href: '/logo.png' }
      ]
    },
  },

  modules: ['nuxt-tiptap-editor'],
  tiptap: {
    prefix: 'Tiptap',
  },
  devServer: {
    port: 4000
  },
  runtimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL || 'https://api.digijadoo.ir',
    public: {
      API_BASE_URL: process.env.API_BASE_URL
    },
  },
  build: {
    transpile: ["vue-toastification"]
  }
})