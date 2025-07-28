<template>
    <FormContainer
        :is-empty="resumeStore.resumeData.projects.length === 0"
        :title="sectionHeaderTitle"
        add-button-label="Add Project"
        empty-message="Add your notable projects to showcase your work."
        section-key="projects"
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
            <div
                v-if="templateConfig.canMoveSection('projects')"
                class="flex items-center gap-2"
            >
                <span class="text-sm text-gray-600">Column:</span>
                <select
                    :value="resumeStore.resumeData.sectionPlacement.projects"
                    class="px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    @change="(e) => resumeStore.updateSectionPlacement('projects', (e.target as HTMLSelectElement).value as 'left' | 'right')"
                >
                    <option value="left">
                        Left
                    </option>
                    <option value="right">
                        Right
                    </option>
                </select>
            </div>
        </template>

        <FormCard
            v-for="(project, index) in resumeStore.resumeData.projects"
            :key="index"
            :can-move-down="index < resumeStore.resumeData.projects.length - 1"
            :can-move-up="index > 0"
            :confirm-message="`Are you sure you want to delete this project? This action cannot be undone.`"
            :confirm-title="'Delete Project'"
            :title="`Project ${index + 1}`"
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
                        :model-value="project.url"
                        placeholder="https://github.com/username/project"
                        type="url"
                        @update:model-value="(value) => resumeStore.updateProject(index, 'url', value)"
                    />
                </div>

                <div class="space-y-2">
                    <Label :for="`project-description-${index}`">Description</Label>
                    <Textarea
                        :id="`project-description-${index}`"
                        :model-value="project.description"
                        placeholder="Brief description of the project, technologies used, and key achievements..."
                        rows="3"
                        @update:model-value="(value) => resumeStore.updateProject(index, 'description', value)"
                    />
                </div>
            </div>
        </FormCard>
    </FormContainer>

    <!-- Confirmation Modal -->
    <ConfirmationModal
        :cancel-text="confirmation.cancelText.value"
        :confirm-text="confirmation.confirmText.value"
        :is-open="confirmation.isOpen.value"
        :message="confirmation.message.value"
        :title="confirmation.title.value"
        @cancel="confirmation.handleCancel"
        @confirm="confirmation.handleConfirm"
    />
</template>

<script lang="ts" setup>
    import {computed} from 'vue';
    import {Input} from '~/components/ui/input';
    import {Label} from '~/components/ui/label';
    import {Textarea} from '~/components/ui/textarea';
    import FormContainer from '~/components/elements/FormContainer.vue';
    import FormCard from '~/components/elements/FormCard.vue';
    import ConfirmationModal from '~/components/elements/ConfirmationModal.vue';
    import EditableHeader from '~/components/elements/EditableHeader.vue';

    const resumeStore = useResumeStore();
    const confirmation = useConfirmation();
    const templateConfig = useTemplate();

    const sectionHeaderTitle = computed(() => {
        return resumeStore.resumeData.sectionHeaders?.projects || 'Projects';
    });
</script>
