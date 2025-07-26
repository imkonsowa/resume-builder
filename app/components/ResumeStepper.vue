<template>
    <div>
        <!-- Stepper Modal -->
        <div
            v-if="showStepper"
            class="fixed inset-0 z-50 flex items-center justify-center"
            @click="showStepper = false"
        >
            <!-- Backdrop -->
            <div class="absolute inset-0 bg-black/50"/>

            <!-- Modal Content -->
            <div
                class="relative bg-background border rounded-lg shadow-xl p-6 w-80 max-h-[80vh] overflow-y-auto"
                @click.stop
            >
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-lg font-semibold">Resume Sections</h3>
                    <Button variant="ghost" size="icon" @click="showStepper = false">
                        <XIcon class="h-4 w-4"/>
                    </Button>
                </div>

                <div class="space-y-3">
                    <!-- Fixed sections -->
                    <button
                        v-for="(section, index) in fixedSections"
                        :key="section.id"
                        class="w-full flex items-center gap-3 p-3 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-left"
                        :class="[
                            isCurrentSection(section.id)
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground'
                        ]"
                        @click="scrollToSection(section.id)"
                    >
                        <div class="flex-shrink-0">
                            <div
                                class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium"
                                :class="[
                                    isCurrentSection(section.id)
                                        ? 'border-primary-foreground bg-primary-foreground text-primary'
                                        : 'border-muted-foreground'
                                ]">
                                {{ index + 1 }}
                            </div>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div class="text-sm font-medium truncate">{{ section.title }}</div>
                            <div class="text-xs opacity-75">{{ section.subtitle }}</div>
                        </div>
                    </button>

                    <div
                        v-for="(section, index) in orderableSections"
                        :key="section.id"
                        class="relative"
                    >
                        <!-- Drop zone indicator -->
                        <div
                            v-if="dropZoneIndex === index && draggedIndex !== null && draggedIndex !== index"
                            class="absolute top-0 left-0 right-0 h-px bg-gray-400 rounded-full z-10 transition-all duration-200"
                        ></div>
                        
                        <div
                            :draggable="section.orderable"
                            class="w-full flex items-center gap-3 p-3 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-left cursor-move"
                            :class="[
                                isCurrentSection(section.id)
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground',
                                draggedIndex === index ? 'opacity-50' : '',
                                dropZoneIndex === index && draggedIndex !== null && draggedIndex !== index ? 'transform translate-y-1' : ''
                            ]"
                            @dragstart="onDragStart($event, index)"
                            @dragover="onDragOver($event, index)"
                            @drop="onDrop($event, index)"
                            @dragend="onDragEnd"
                            @click="scrollToSection(section.id)"
                        >
                        <div class="flex-shrink-0">
                            <GripVertical class="w-4 h-4 text-gray-400"/>
                        </div>
                        <div class="flex-shrink-0">
                            <div
                                class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium"
                                :class="[
                                    isCurrentSection(section.id)
                                        ? 'border-primary-foreground bg-primary-foreground text-primary'
                                        : 'border-muted-foreground'
                                ]">
                                {{ fixedSections.length + index + 1 }}
                            </div>
                        </div>
                            <div class="flex-1 min-w-0">
                                <div class="text-sm font-medium truncate">{{ section.title }}</div>
                                <div class="text-xs opacity-75">{{ section.subtitle }}</div>
                            </div>
                        </div>
                        
                        <!-- Drop zone indicator at bottom -->
                        <div
                            v-if="dropZoneIndex === index + 1 && draggedIndex !== null"
                            class="absolute bottom-0 left-0 right-0 h-px bg-gray-400 rounded-full z-10 transition-all duration-200"
                        ></div>
                    </div>
                    
                    <!-- Drop zone for inserting at the end -->
                    <div
                        class="h-4 relative"
                        @dragover="onDragOver($event, orderableSections.length)"
                        @drop="onDrop($event, orderableSections.length - 1)"
                    >
                        <div
                            v-if="dropZoneIndex === orderableSections.length && draggedIndex !== null"
                            class="absolute top-2 left-0 right-0 h-px bg-gray-400 rounded-full z-10 transition-all duration-200"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useResumeStore } from '~/stores/resume';
import { Button } from '~/components/ui/button';
import { GripVertical, XIcon } from 'lucide-vue-next';

interface Section {
    id: string;
    title: string;
    subtitle: string;
    orderable?: boolean;
}


const resumeStore = useResumeStore();

// Fixed sections (non-orderable)
const fixedSections = computed<Section[]>(() => [
    {
        id: 'personal-info',
        title: 'Personal Info',
        subtitle: `${resumeStore.resumeData.firstName || 'Your'} details`,
        orderable: false
    }
]);

// Orderable sections with their current order
const orderableSections = computed<Section[]>(() => {
    const sectionOrder = resumeStore.resumeData.sectionOrder;
    const sectionsData = [
        {
            id: 'experience',
            title: 'Experience',
            subtitle: `${resumeStore.resumeData.experiences.length} ${resumeStore.resumeData.experiences.length === 1 ? 'job' : 'jobs'}`,
            orderable: true,
            order: sectionOrder.experience
        },
        {
            id: 'education',
            title: 'Education',
            subtitle: `${resumeStore.resumeData.education.length} ${resumeStore.resumeData.education.length === 1 ? 'degree' : 'degrees'}`,
            orderable: true,
            order: sectionOrder.education
        },
        {
            id: 'skills',
            title: 'Skills',
            subtitle: `${resumeStore.resumeData.skills.length} ${resumeStore.resumeData.skills.length === 1 ? 'skill' : 'skills'}`,
            orderable: true,
            order: sectionOrder.skills
        },
        {
            id: 'projects',
            title: 'Projects',
            subtitle: `${resumeStore.resumeData.projects.length} ${resumeStore.resumeData.projects.length === 1 ? 'project' : 'projects'}`,
            orderable: true,
            order: sectionOrder.projects ?? 6
        },
        {
            id: 'languages',
            title: 'Languages',
            subtitle: `${resumeStore.resumeData.languages.length} ${resumeStore.resumeData.languages.length === 1 ? 'language' : 'languages'}`,
            orderable: true,
            order: sectionOrder.languages ?? 7
        },
        {
            id: 'volunteering',
            title: 'Volunteering',
            subtitle: `${resumeStore.resumeData.volunteering.length} ${resumeStore.resumeData.volunteering.length === 1 ? 'role' : 'roles'}`,
            orderable: true,
            order: sectionOrder.volunteering
        }
    ];

    return sectionsData.sort((a, b) => a.order - b.order);
});

// Fixed sections in sidebar (non-orderable)
const sidebarSections = computed<Section[]>(() => []);

// Combined sections for display
const sections = computed<Section[]>(() => [
    ...fixedSections.value,
    ...orderableSections.value
]);

const currentSection = ref<string>('personal-info');

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
        currentSection.value = sectionId;
        showStepper.value = false;
    }
};

const isCurrentSection = (sectionId: string) => {
    return currentSection.value === sectionId;
};

// Drag and drop functionality
const draggedIndex = ref<number | null>(null);
const dropZoneIndex = ref<number | null>(null);

const onDragStart = (event: DragEvent, index: number) => {
    const section = orderableSections.value[index];
    if (!section.orderable) return;

    draggedIndex.value = index;
    event.dataTransfer!.effectAllowed = 'move';
    event.dataTransfer!.setData('text/html', event.target as Element);
};

const onDragOver = (event: DragEvent, index: number) => {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'move';
    dropZoneIndex.value = index;
};

const onDrop = (event: DragEvent, dropIndex: number) => {
    event.preventDefault();

    if (draggedIndex.value === null) return;

    const dragIndex = draggedIndex.value;
    if (dragIndex === dropIndex) return;

    // Get all sections in current order
    const sections = orderableSections.value;
    const draggedSection = sections[dragIndex];

    if (!draggedSection.orderable) return;

    // Create new order by shifting sections
    const newOrder = { ...resumeStore.resumeData.sectionOrder };
    
    // Create array of section IDs in current order
    const sectionIds = sections.map(s => s.id);
    
    // Remove dragged item and insert at new position
    sectionIds.splice(dragIndex, 1);
    sectionIds.splice(dropIndex, 0, draggedSection.id);
    
    // Reassign order values (starting from 1)
    sectionIds.forEach((sectionId, index) => {
        newOrder[sectionId as keyof typeof newOrder] = index + 1;
    });

    resumeStore.updateSectionOrder(newOrder);
    draggedIndex.value = null;
    dropZoneIndex.value = null;
};

const onDragEnd = () => {
    draggedIndex.value = null;
    dropZoneIndex.value = null;
};

const showStepper = defineModel<boolean>('showStepper', { default: false });

// Watch for scroll position to update current section
onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    currentSection.value = entry.target.id;
                }
            });
        },
        {
            threshold: [0.1, 0.5, 0.9],
            rootMargin: '-20% 0px -20% 0px'
        }
    );

    sections.value.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
            observer.observe(element);
        }
    });

    onUnmounted(() => {
        observer.disconnect();
    });
});
</script>
