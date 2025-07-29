<template>
    <div class="flex justify-between items-center mb-8">
        <div class="flex items-center space-x-3">
            <h1 class="text-2xl font-bold text-gray-900">
                {{ resumeStore.activeResume?.name || 'Resume Builder' }}
            </h1>
        </div>

        <div class="flex items-center space-x-2">
            <Button
                size="sm"
                variant="outline"
                @click="settingsStore.expandAllSections()"
            >
                <ChevronDown class="h-4 w-4" />
            </Button>
            <Button
                size="sm"
                variant="outline"
                @click="settingsStore.collapseAllSections()"
            >
                <ChevronUp class="h-4 w-4" />
            </Button>
            <Button
                class="flex items-center gap-2"
                size="sm"
                variant="outline"
                @click="showStepper = true"
            >
                <ListIcon class="h-4 w-4" />
                Sections
            </Button>
        </div>
    </div>

    <ResumeStepper v-model:show-stepper="showStepper" />
</template>

<script lang="ts" setup>
import { Button } from '~/components/ui/button';
import { ChevronDown, ChevronUp, ListIcon } from 'lucide-vue-next';
import ResumeStepper from '~/components/elements/ResumeStepper.vue';

const resumeStore = useResumeStore();
const settingsStore = useSettingsStore();

const showStepper = ref<boolean>(false);
</script>
