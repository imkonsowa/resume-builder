<template>
    <main class="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto">
            <h1 class="text-4xl font-bold text-black mb-8">Contact Us</h1>
            
            <Card class="p-8">
                <CardContent class="pt-0">
                    <p class="text-lg text-gray-700 leading-relaxed">
                        If you encounter any issues or need assistance, please feel free to contact us at 
                        <a 
                            href="mailto:contact@resumeforfree.com" 
                            class="text-blue-600 hover:text-blue-800 font-medium underline"
                        >
                            contact@resumeforfree.com
                        </a> 
                        or open a GitHub issue on our repository.
                    </p>
                </CardContent>
            </Card>
        </div>
    </main>
</template>

<script setup lang="ts">
import { Card, CardContent } from '~/components/ui/card';

// Set page title
useHead({
    title: 'Contact Us - Resume Builder'
});
</script>