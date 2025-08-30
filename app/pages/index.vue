<script lang="ts" setup>
import { Button } from '~/components/ui/button';
import { Check, Download, FileText, Shield, Users, Zap } from 'lucide-vue-next';
import { createSoftwareApplicationStructuredData, createWebsiteStructuredData } from '~/composables/useSEO';

useHead({
    title: 'Free Resume Builder - No Registration Required | Privacy-First Resume Maker',
    meta: [
        {
            name: 'description',
            content: 'Build professional resumes for free with complete privacy. No servers, no registration, no payments. Unlimited downloads and resumes. Everything runs locally on your device.',
        },
        {
            name: 'keywords',
            content: 'free resume builder, privacy resume maker, no registration resume, unlimited downloads, local resume builder, professional resume, CV maker',
        },
        {
            name: 'author',
            content: 'Resume Builder',
        },
        {
            property: 'og:type',
            content: 'website',
        },
        {
            property: 'og:site_name',
            content: 'Free Resume Builder',
        },
        {
            property: 'og:title',
            content: 'Free Resume Builder - No Registration Required | Privacy-First Resume Maker',
        },
        {
            property: 'og:description',
            content: 'Build professional resumes for free with complete privacy. No servers, no registration, no payments. Unlimited downloads and resumes.',
        },
        {
            property: 'og:url',
            content: 'https://resumeforfree.com',
        },
        {
            property: 'og:image',
            content: 'https://resumeforfree.com/og-image.png',
        },
        {
            property: 'og:image:width',
            content: '1200',
        },
        {
            property: 'og:image:height',
            content: '630',
        },
        {
            property: 'og:locale',
            content: 'en_US',
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: 'Free Resume Builder - No Registration Required',
        },
        {
            name: 'twitter:description',
            content: 'Build professional resumes for free with complete privacy. No servers, no registration, no payments.',
        },
        {
            name: 'twitter:image',
            content: 'https://resumeforfree.com/og-image.png',
        },
        {
            name: 'application-name',
            content: 'Resume Builder',
        },
        {
            name: 'apple-mobile-web-app-title',
            content: 'Resume Builder',
        },
        {
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
        },
        {
            name: 'mobile-web-app-capable',
            content: 'yes',
        },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://resumeforfree.com',
        },
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify(createWebsiteStructuredData()),
        },
        {
            type: 'application/ld+json',
            children: JSON.stringify(createSoftwareApplicationStructuredData()),
        },
    ],
});
</script>

<template>
    <main class="min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
            <h1 class="text-6xl font-bold text-black mb-16">
                Build Your Resume<br>
                <span class="text-gray-600">For Free</span>
            </h1>
            <NuxtLink to="/resumes">
                <Button size="lg">
                    Create Your First Resume
                </Button>
            </NuxtLink>
            <p class="text-xs text-gray-500 mt-4">
                By using this website you agree to
                <NuxtLink to="/terms" class="text-blue-600 hover:text-blue-800 underline">
                    terms and conditions
                </NuxtLink>
            </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <div class="text-center">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Check class="w-6 h-6 text-green-600" />
                </div>
                <h3 class="text-lg font-semibold mb-1">
                    100% Free and Private
                </h3>
                <p class="text-sm text-gray-600">
                    No hidden costs, completely free to use
                </p>
            </div>
            <div class="text-center">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield class="w-6 h-6 text-blue-600" />
                </div>
                <h3 class="text-lg font-semibold mb-1">
                    No Servers Included
                </h3>
                <p class="text-sm text-gray-600">
                    Everything runs locally on your device
                </p>
            </div>
            <div class="text-center">
                <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users class="w-6 h-6 text-purple-600" />
                </div>
                <h3 class="text-lg font-semibold mb-1">
                    No Registration Required
                </h3>
                <p class="text-sm text-gray-600">
                    No signup, no payments, just start building
                </p>
            </div>
            <div class="text-center">
                <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Download class="w-6 h-6 text-orange-600" />
                </div>
                <h3 class="text-lg font-semibold mb-1">
                    Unlimited Downloads
                </h3>
                <p class="text-sm text-gray-600">
                    Download as many times as you want
                </p>
            </div>
            <div class="text-center">
                <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText class="w-6 h-6 text-red-600" />
                </div>
                <h3 class="text-lg font-semibold mb-1">
                    Unlimited Resumes
                </h3>
                <p class="text-sm text-gray-600">
                    Create as many resumes as you need
                </p>
            </div>
            <div class="text-center">
                <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap class="w-6 h-6 text-indigo-600" />
                </div>
                <h3 class="text-lg font-semibold mb-1">
                    Fast & Efficient
                </h3>
                <p class="text-sm text-gray-600">
                    Built with Typst for instant results
                </p>
            </div>
        </div>
    </main>
</template>

<style scoped>
</style>
