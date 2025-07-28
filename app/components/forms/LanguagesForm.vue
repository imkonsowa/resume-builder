<template>
    <FormContainer
        :is-empty="resumeStore.resumeData.languages.length === 0"
        :title="sectionHeaderTitle"
        add-button-label="Add Language"
        empty-message="Add languages you speak to showcase your communication skills."
        section-key="languages"
        @add="resumeStore.addLanguage"
        @edit-title="(value) => resumeStore.updateSectionHeader('languages', value)"
    >
        <!-- Column Placement Control -->
        <template #header-actions>
            <div
                v-if="templateConfig.canMoveSection('languages')"
                class="flex items-center gap-2"
            >
                <span class="text-sm text-gray-600">Column:</span>
                <select
                    :value="resumeStore.resumeData.sectionPlacement.languages"
                    class="px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    @change="(e) => resumeStore.updateSectionPlacement('languages', (e.target as HTMLSelectElement).value as 'left' | 'right')"
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
            v-for="(language, index) in resumeStore.resumeData.languages"
            :key="index"
            :can-move-down="index < resumeStore.resumeData.languages.length - 1"
            :can-move-up="index > 0"
            :confirm-message="`Are you sure you want to delete this language? This action cannot be undone.`"
            :confirm-title="'Delete Language'"
            :title="`Language ${index + 1}`"
            @remove="resumeStore.removeLanguage(index)"
            @move-up="resumeStore.moveLanguage(index, index - 1)"
            @move-down="resumeStore.moveLanguage(index, index + 1)"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                    <Label :for="`language-name-${index}`">Language</Label>
                    <Input
                        :id="`language-name-${index}`"
                        :model-value="language.name"
                        placeholder="English, Spanish, French..."
                        @update:model-value="(value) => resumeStore.updateLanguage(index, 'name', value)"
                    />
                </div>

                <div class="space-y-2">
                    <Label :for="`language-proficiency-${index}`">Proficiency</Label>
                    <select
                        :id="`language-proficiency-${index}`"
                        :value="language.proficiency"
                        class="w-full px-3 py-2 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        @change="(e) => resumeStore.updateLanguage(index, 'proficiency', (e.target as HTMLSelectElement).value)"
                    >
                        <option value="">
                            Select proficiency
                        </option>
                        <option value="Native">
                            Native
                        </option>
                        <option value="Fluent">
                            Fluent
                        </option>
                        <option value="Proficient">
                            Proficient
                        </option>
                        <option value="Conversational">
                            Conversational
                        </option>
                        <option value="Basic">
                            Basic
                        </option>
                        <option value="Beginner">
                            Beginner
                        </option>
                    </select>
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
    import FormContainer from '~/components/elements/FormContainer.vue';
    import FormCard from '~/components/elements/FormCard.vue';
    import ConfirmationModal from '~/components/elements/ConfirmationModal.vue';

    const resumeStore = useResumeStore();
    const confirmation = useConfirmation();
    const templateConfig = useTemplate();

    const sectionHeaderTitle = computed(() => {
        return resumeStore.resumeData.sectionHeaders?.languages || 'Languages';
    });
</script>
