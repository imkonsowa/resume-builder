<script lang="ts" setup>
import { Button } from '~/components/ui/button';
import { Check, Download, FileText, Shield, Users, Zap } from 'lucide-vue-next';

useHead({
    title: 'Resume Builder - Build Your Resume for Free',
    meta: [
        {
            name: 'description',
            content: 'Build professional resumes for free. No servers, no registration, no payments. Unlimited downloads and resumes.',
        },
    ],
});
</script>

<template>
    <main class="flex flex-col items-center justify-center h-[calc(100vh-64px-88px)] px-4 sm:px-6 lg:px-8">
        <!-- Hero Section -->
        <div class="text-center">
            <h1 class="text-6xl font-bold text-black mb-16">
                Build Your Resume<br>
                <span class="text-gray-600">For Free</span>
            </h1>

            <NuxtLink to="/builder">
                <Button size="lg">
                    Build Now
                </Button>
            </NuxtLink>
        </div>

        <!-- Features Grid -->
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
