import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
// eslint-disable-next-line no-undef
export default defineNuxtConfig({
    modules: [
        'shadcn-nuxt',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxt/eslint',
        '@vite-pwa/nuxt',
    ],

    imports: {
        dirs: ['stores'],
    },
    devtools: { enabled: false },

    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
                { rel: 'canonical', href: 'https://resumeforfree.com' },
            ],
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'format-detection', content: 'telephone=no' },
                { name: 'robots', content: 'index, follow' },
                { name: 'author', content: 'Resume Builder' },
                { name: 'theme-color', content: '#3b82f6' },
            ],
        },
    },

    css: ['~/assets/css/tailwind.css', '~/assets/css/app.css'],

    site: {
        url: 'https://resumeforfree.com',
        name: 'Resume Builder',
        description: 'Build professional resumes for free. No servers, no registration, no payments. Unlimited downloads and resumes with complete privacy.',
        defaultLocale: 'en',
    },
    future: {
        compatibilityVersion: 4,
    },
    compatibilityDate: '2025-07-15',
    nitro: {
        preset: 'cloudflare',
    },

    vite: {
        plugins: [
            tailwindcss(),
        ],
        optimizeDeps: {
            exclude: [
                '@myriaddreamin/typst-ts-web-compiler',
                '@myriaddreamin/typst-ts-renderer',
                '@myriaddreamin/typst.ts',
            ],
        },
        build: {
            target: 'esnext',
        },
    },

    eslint: {
        config: {
            stylistic: {
                indent: 4,
                semi: true,
                quotes: 'single',
            },
        },
    },

    piniaPluginPersistedstate: {
        storage: 'localStorage',
    },

    seo: {
        redirectToCanonicalSiteUrl: true,
    },

    shadcn: {
        prefix: '',
        componentDir: './app/components/ui',
    },
});
