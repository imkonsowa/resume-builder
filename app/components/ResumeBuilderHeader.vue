<template>
    <div class="flex justify-between items-center mb-8">
        <div class="flex items-center space-x-3">
            <h1 class="text-2xl font-bold text-gray-900">
                {{ resumeStore.activeResume?.name || 'Resume Builder' }}
            </h1>
        </div>

        <div class="flex items-center space-x-2">
            <Button
                variant="outline"
                size="sm"
                class="flex items-center gap-2"
                @click="showStepper = true"
            >
                <ListIcon class="h-4 w-4"/>
                Sections
            </Button>
        </div>
    </div>

    <ResumeStepper v-model:show-stepper="showStepper"/>
</template>

<script setup lang="ts">
    import {Button} from './ui/button';
    import {ListIcon} from 'lucide-vue-next';
    import ResumeStepper from './ResumeStepper.vue';

    const resumeStore = useResumeStore();

    const showStepper = ref<boolean>(false);
</script>
