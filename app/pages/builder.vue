<script lang="ts" setup>
    import {useResumeStore} from '~/stores/resume';
    import {EyeIcon} from 'lucide-vue-next';
    import {Button} from '~/components/ui/button';
    import ZoomControls from '~/components/elements/ZoomControls.vue';
    import ResumeBuilderHeader from '~/components/elements/ResumeBuilderHeader.vue';
    import PersonalInfoForm from '~/components/forms/PersonalInfoForm.vue';
    import ExperienceForm from '~/components/forms/ExperienceForm.vue';
    import EducationForm from '~/components/forms/EducationForm.vue';
    import SkillsForm from '~/components/forms/SkillsForm.vue';
    import ProjectsForm from '~/components/forms/ProjectsForm.vue';
    import LanguagesForm from '~/components/forms/LanguagesForm.vue';
    import VolunteeringForm from '~/components/forms/VolunteeringForm.vue';
    import ResumePreview from '~/components/elements/ResumePreview.vue';

    useHead({
        title: 'Resume Builder - Create Professional Resumes Online | Free, Unlimited and Private',
        meta: [
            {
                name: 'description',
                content: 'Build professional resumes online with our free resume builder. Real-time preview, instant PDF generation, unlimited downloads. No registration required, complete privacy.',
            },
            {
                name: 'keywords',
                content: 'resume builder, CV maker, professional resume, free resume template, PDF resume, online resume builder, privacy resume maker',
            },
            {
                name: 'robots',
                content: 'index, follow',
            },
            // Open Graph tags
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
                content: 'Resume Builder - Create Professional Resumes Online',
            },
            {
                property: 'og:description',
                content: 'Build professional resumes online with our free resume builder. Real-time preview, instant PDF generation, unlimited downloads.',
            },
            {
                property: 'og:url',
                content: 'https://resumeforfree.com/builder',
            },
            {
                property: 'og:image',
                content: 'https://resumeforfree.com/og-image.png',
            },
            // Twitter Card tags
            {
                name: 'twitter:card',
                content: 'summary_large_image',
            },
            {
                name: 'twitter:title',
                content: 'Resume Builder - Create Professional Resumes Online',
            },
            {
                name: 'twitter:description',
                content: 'Build professional resumes online with our free resume builder. Real-time preview, instant PDF generation.',
            },
            {
                name: 'twitter:image',
                content: 'https://resumeforfree.com/og-image.png',
            },
        ],
        link: [
            {
                rel: 'canonical',
                href: 'https://resumeforfree.com/builder',
            },
        ],
    });

    // Stores
    const resumeStore = useResumeStore();

    // Initialize Typst loader
    useTypstLoader();

    // Initialize store on mount
    onMounted(() => {
        resumeStore.initialize();

        // If no resumes exist and user accessed builder directly, create "Your Resume"
        if (resumeStore.resumeCount === 0) {
            const newResumeId = resumeStore.createResume('Your Resume');
            resumeStore.setActiveResume(newResumeId);
        }
    });

    // Mobile preview modal state
    const showMobilePreview = ref(false);

    // Zoom state for mobile preview
    const zoomLevel = ref(1);
    const minZoom = 0.5;
    const maxZoom = 2.5;
    const zoomStep = 0.25;

    // Zoom control functions
    const zoomIn = () => {
        if (zoomLevel.value < maxZoom) {
            zoomLevel.value = Math.min(zoomLevel.value + zoomStep, maxZoom);
        }
    };

    const zoomOut = () => {
        if (zoomLevel.value > minZoom) {
            zoomLevel.value = Math.max(zoomLevel.value - zoomStep, minZoom);
        }
    };

    const resetZoom = () => {
        zoomLevel.value = 1;
    };

    // Reset zoom when closing modal
    watch(showMobilePreview, (newValue) => {
        if (!newValue) {
            resetZoom();
        }
    });
</script>

<template>
    <ClientOnly>
        <div class="bg-gray-50 min-h-screen">
            <div class="flex flex-col lg:flex-row">
                <!-- Left Panel - Form -->
                <div class="w-full lg:w-1/2 min-h-screen">
                    <div class="p-4 lg:p-8 pb-32">
                        <!-- Header -->
                        <ResumeBuilderHeader/>

                        <!-- Form Content -->
                        <div class="space-y-6">
                            <!-- Personal Information -->
                            <div id="personal-info">
                                <PersonalInfoForm/>
                            </div>

                            <!-- Experience -->
                            <div id="experience">
                                <ExperienceForm/>
                            </div>

                            <!-- Education -->
                            <div id="education">
                                <EducationForm/>
                            </div>

                            <!-- Skills -->
                            <div id="skills">
                                <SkillsForm/>
                            </div>

                            <!-- Projects -->
                            <div id="projects">
                                <ProjectsForm/>
                            </div>

                            <!-- Languages -->
                            <div id="languages">
                                <LanguagesForm/>
                            </div>

                            <!-- Volunteering -->
                            <div id="volunteering">
                                <VolunteeringForm/>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Panel - Preview (Desktop) -->
                <div
                    class="hidden lg:block fixed top-16 right-0 w-1/2 h-[calc(100vh-64px)] border-l border-gray-200 bg-gray-50 overflow-y-auto z-10"
                >
                    <div class="p-4 lg:p-8 pt-[calc(2rem+4rem)]">
                        <ClientOnly>
                            <ResumePreview/>
                        </ClientOnly>
                    </div>
                </div>

                <!-- Mobile Preview Button -->
                <Button
                    v-if="!showMobilePreview"
                    class="lg:hidden fixed bottom-6 right-6 z-40 h-14 px-4 rounded-full shadow-lg flex items-center space-x-2"
                    size="default"
                    @click="showMobilePreview = true"
                >
                    <EyeIcon class="h-5 w-5"/>
                    <span class="text-sm font-medium">Preview</span>
                </Button>

                <!-- Mobile Preview Modal -->
                <div
                    v-if="showMobilePreview"
                    class="lg:hidden fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50"
                >
                    <div class="flex items-center justify-center min-h-screen p-4">
                        <div class="bg-white rounded-lg max-w-full w-full max-h-[90vh] flex flex-col">
                            <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                                <h3 class="text-lg font-medium">
                                    Resume Preview
                                </h3>

                                <!-- Zoom Controls -->
                                <div class="flex items-center gap-2">
                                    <ZoomControls
                                        :max-zoom="maxZoom"
                                        :min-zoom="minZoom"
                                        :zoom-level="zoomLevel"
                                        :zoom-step="zoomStep"
                                        @zoom-in="zoomIn"
                                        @zoom-out="zoomOut"
                                    />

                                    <button
                                        class="text-gray-400 hover:text-gray-600 p-2"
                                        @click="showMobilePreview = false"
                                    >
                                        <span class="sr-only">Close</span>
                                        <svg
                                            class="h-6 w-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M6 18L18 6M6 6l12 12"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <!-- Scrollable content container -->
                            <div class="overflow-auto flex-1 p-4">
                                <div class="mobile-preview-wrapper">
                                    <ResumePreview/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>

<style scoped>
    /* Mobile preview zoom styles */
    .mobile-preview-wrapper :deep(.resume-preview-wrapper svg) {
        transform: scale(v-bind(zoomLevel));
        transform-origin: top left;
        transition: transform 0.2s ease-in-out;
        margin: 0;
        display: block;
    }

    /* When zoomed in, adjust the wrapper to allow horizontal scrolling */
    .mobile-preview-wrapper :deep(.resume-preview-wrapper) {
        width: max-content;
        margin: 0;
    }

    /* Ensure preview container has proper dimensions */
    .mobile-preview-wrapper :deep(.preview-container) {
        display: flex;
        justify-content: flex-start;
        width: 100%;
    }
</style>
