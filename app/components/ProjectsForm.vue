<template>
    <FormContainer
        :title="sectionHeaderTitle"
        :is-empty="resumeStore.resumeData.projects.length === 0"
        empty-message="Add your notable projects to showcase your work."
        add-button-label="Add Project"
        @add="resumeStore.addProject"
    >
        <template #header>
            <EditableHeader
                :value="resumeStore.resumeData.sectionHeaders.projects"
                @update="(value) => resumeStore.updateSectionHeader('projects', value)"
            />
        </template>

        <!-- Column Placement Control -->
        <template #header-actions>
            <div v-if="templateConfig.canMoveSection('projects')" class="flex items-center gap-2">
                <span class="text-sm text-gray-600">Column:</span>
                <select
                    :value="resumeStore.resumeData.sectionPlacement.projects"
                    class="px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    @change="(e) => resumeStore.updateSectionPlacement('projects', (e.target as HTMLSelectElement).value as 'left' | 'right')"
                >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>
            </div>
        </template>

        <FormCard
            v-for="(project, index) in resumeStore.resumeData.projects"
            :key="index"
            :title="`Project ${index + 1}`"
            :confirm-title="'Delete Project'"
            :confirm-message="`Are you sure you want to delete this project? This action cannot be undone.`"
            :can-move-up="index > 0"
            :can-move-down="index < resumeStore.resumeData.projects.length - 1"
            @remove="resumeStore.removeProject(index)"
            @move-up="resumeStore.moveProject(index, index - 1)"
            @move-down="resumeStore.moveProject(index, index + 1)"
        >
            <div class="space-y-4">
                <div class="space-y-2">
                    <Label :for="`project-title-${index}`">Project Title</Label>
                    <Input
                        :id="`project-title-${index}`"
                        :model-value="project.title"
                        placeholder="My Awesome Project"
                        @update:model-value="(value) => resumeStore.updateProject(index, 'title', value)"
                    />
                </div>

                <div class="space-y-2">
                    <Label :for="`project-url-${index}`">Project URL</Label>
                    <Input
                        :id="`project-url-${index}`"
                        type="url"
                        :model-value="project.url"
                        placeholder="https://github.com/username/project"
                        @update:model-value="(value) => resumeStore.updateProject(index, 'url', value)"
                    />
                </div>

                <div class="space-y-2">
                    <Label :for="`project-description-${index}`">Description</Label>
                    <Textarea
                        :id="`project-description-${index}`"
                        :model-value="project.description"
                        rows="3"
                        placeholder="Brief description of the project, technologies used, and key achievements..."
                        @update:model-value="(value) => resumeStore.updateProject(index, 'description', value)"
                    />
                </div>
            </div>
        </FormCard>
    </FormContainer>

    <!-- Confirmation Modal -->
    <ConfirmationModal
        :is-open="confirmation.isOpen.value"
        :title="confirmation.title.value"
        :message="confirmation.message.value"
        :confirm-text="confirmation.confirmText.value"
        :cancel-text="confirmation.cancelText.value"
        @confirm="confirmation.handleConfirm"
        @cancel="confirmation.handleCancel"
    />
</template>

<script setup lang="ts">
    import {computed} from 'vue';
    import {Input} from './ui/input';
    import {Label} from './ui/label';
    import {Textarea} from './ui/textarea';
    import FormContainer from './FormContainer.vue';
    import FormCard from './FormCard.vue';
    import ConfirmationModal from './ConfirmationModal.vue';
    import EditableHeader from './EditableHeader.vue';

    const resumeStore = useResumeStore();
    const confirmation = useConfirmation();
    const templateConfig = useTemplate();

    const sectionHeaderTitle = computed(() => {
        return resumeStore.resumeData.sectionHeaders?.projects || 'Projects';
    });

</script>
