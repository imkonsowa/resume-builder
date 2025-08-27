<script lang="ts" setup>
import { Edit, FileText, Github, HelpCircle, Mail, LogOut, User } from 'lucide-vue-next';
import LoginModal from '@/components/LoginModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';

const authStore = useAuthStore();

const showLoginModal = ref(false);
const showRegisterModal = ref(false);

const switchToRegister = () => {
    showLoginModal.value = false;
    showRegisterModal.value = true;
};

const switchToLogin = () => {
    showRegisterModal.value = false;
    showLoginModal.value = true;
};

const handleLogout = async () => {
    await authStore.logout();
};

// Initialize auth on mount
onMounted(async () => {
    await authStore.initializeAuth();
});
</script>

<template>
    <div class="min-h-screen bg-white flex flex-col">
        <!-- Navigation -->
        <nav class="border-b border-gray-200">
            <div class="px-4 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center space-x-6">
                        <NuxtLink to="/">
                            <div class="flex items-center">
                                <span
                                    class="ml-2 text-lg md:text-xl font-semibold text-black"
                                >Free Resume Builder</span>
                            </div>
                        </NuxtLink>

                        <div class="flex items-center space-x-4">
                            <NuxtLink
                                class="flex items-center space-x-1 md:space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                                to="/resumes"
                            >
                                <FileText class="w-4 h-4" />
                                <span class="hidden sm:inline text-sm font-medium">Your Resumes</span>
                            </NuxtLink>

                            <NuxtLink
                                class="flex items-center space-x-1 md:space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                                to="/builder"
                            >
                                <Edit class="w-4 h-4" />
                                <span class="hidden sm:inline text-sm font-medium">Builder</span>
                            </NuxtLink>
                        </div>
                    </div>

                    <div class="flex items-center space-x-2 md:space-x-6">
                        <!-- Auth Buttons - Show when not authenticated -->
                        <template v-if="!authStore.isLoggedIn">
                            <Button
                                variant="ghost"
                                size="sm"
                                class="text-gray-600 hover:text-gray-900"
                                @click="showLoginModal = true"
                            >
                                <User class="w-4 h-4 mr-1" />
                                <span class="hidden sm:inline">Sign In</span>
                            </Button>

                            <Button
                                size="sm"
                                @click="showRegisterModal = true"
                            >
                                <span class="text-sm">Sign Up</span>
                            </Button>
                        </template>

                        <!-- User Menu - Show when authenticated -->
                        <template v-else>
                            <div class="flex items-center space-x-2 text-sm text-gray-600">
                                <User class="w-4 h-4" />
                                <span class="hidden sm:inline">{{ authStore.currentUser?.name || authStore.currentUser?.email }}</span>
                            </div>

                            <Button
                                variant="ghost"
                                size="sm"
                                class="text-gray-600 hover:text-gray-900"
                                @click="handleLogout"
                            >
                                <LogOut class="w-4 h-4 mr-1" />
                                <span class="hidden sm:inline">Sign Out</span>
                            </Button>
                        </template>

                        <!-- Divider -->
                        <div class="h-4 w-px bg-gray-300 hidden md:block" />

                        <NuxtLink
                            class="flex items-center space-x-1 md:space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                            to="/contact"
                        >
                            <Mail class="w-4 h-4" />
                            <span class="hidden sm:inline text-sm font-medium">Contact</span>
                        </NuxtLink>

                        <NuxtLink
                            class="flex items-center space-x-1 md:space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                            target="_blank"
                            to="/qa"
                        >
                            <HelpCircle class="w-4 h-4" />
                            <span class="hidden sm:inline text-sm font-medium">Q&A</span>
                        </NuxtLink>

                        <a
                            class="flex items-center space-x-1 md:space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                            href="https://github.com/imkonsowa/resume-builder"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <Github class="w-4 h-4" />
                            <span class="hidden sm:inline text-sm font-medium">GitHub</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Page Content -->
        <main class="flex-1">
            <slot />
        </main>

        <!-- Footer -->
        <footer
            v-if="$route.path !== '/builder'"
            class="bg-gray-50 border-t border-gray-200 mt-auto"
        >
            <div class="px-4 lg:px-8 py-6">
                <div class="text-center space-y-3">
                    <p class="text-sm text-gray-600">
                        Built by <a
                            class="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                            href="https://konsowa.com"
                            rel="noopener noreferrer"
                            target="_blank"
                        >Ibrahim
                            Konsowa</a>
                    </p>
                    <div class="flex items-center justify-center space-x-2 text-xs text-gray-500">
                        <span>Powered by</span>
                        <a
                            class="text-gray-700 hover:text-blue-600 transition-colors"
                            href="https://github.com/Myriad-Dreamin/typst.ts"
                            rel="noopener noreferrer"
                            target="_blank"
                        >Typst.ts</a>
                        <span>&</span>
                        <a
                            class="text-gray-700 hover:text-blue-600 transition-colors"
                            href="https://nuxt.com"
                            rel="noopener noreferrer"
                            target="_blank"
                        >Nuxt</a>
                    </div>
                </div>
            </div>
        </footer>

        <!-- Auth Modals -->
        <LoginModal
            v-model:open="showLoginModal"
            @switch-to-register="switchToRegister"
        />

        <RegisterModal
            v-model:open="showRegisterModal"
            @switch-to-login="switchToLogin"
        />

        <!-- Toast Notifications -->
        <Toaster />
    </div>
</template>

<style scoped>
</style>
