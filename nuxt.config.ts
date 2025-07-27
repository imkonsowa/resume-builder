import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
    nitro: {
        preset: 'cloudflare'
    },
    compatibilityDate: '2025-07-15',
    future: {
        compatibilityVersion: 4
    },
    devtools: {enabled: false},
    modules: [
        'shadcn-nuxt',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxt/eslint',
        '@vite-pwa/nuxt'
    ],

    eslint: {
        config: {
            stylistic: {
                indent: 4,
                semi: true,
                quotes: 'single'
            }
        }
    },

    app: {
        head: {
            link: [
                {rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg'}
            ]
        }
    },

    imports: {
        dirs: ['stores']
    },

    css: ['~/assets/css/tailwind.css', '~/assets/css/app.css'],

    vite: {
        plugins: [
            tailwindcss()
        ],
        optimizeDeps: {
            exclude: [
                '@myriaddreamin/typst-ts-web-compiler',
                '@myriaddreamin/typst-ts-renderer',
                '@myriaddreamin/typst.ts'
            ]
        },
        build: {
            target: 'esnext'
        }
    },

    shadcn: {
        prefix: '',
        componentDir: './app/components/ui'
    },

    piniaPluginPersistedstate: {
        storage: 'localStorage'
    }
});
