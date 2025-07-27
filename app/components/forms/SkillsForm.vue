<template>
    <FormContainer
        :is-empty="resumeStore.resumeData.skills.length === 0"
        :title="resumeStore.resumeData.sectionHeaders.skills"
        add-button-label="Add Skill"
        empty-message="No skills added yet. Click 'Add Skill' to get started."
        @add="resumeStore.addSkill"
        @edit-title="(value) => resumeStore.updateSectionHeader('skills', value)"
    >
        <!-- Column Placement Control -->
        <template #header-actions>
            <div
                v-if="templateConfig.canMoveSection('skills')"
                class="flex items-center gap-2"
            >
                <span class="text-sm text-gray-600">Column:</span>
                <select
                    :value="resumeStore.resumeData.sectionPlacement.skills"
                    class="px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    @change="(e) => resumeStore.updateSectionPlacement('skills', (e.target as HTMLSelectElement).value as 'left' | 'right')"
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
            v-for="(skill, index) in resumeStore.resumeData.skills"
            :key="index"
            :can-move-down="index < resumeStore.resumeData.skills.length - 1"
            :can-move-up="index > 0"
            :confirm-message="`Are you sure you want to delete this skill entry? This action cannot be undone.`"
            :confirm-title="'Delete Skill'"
            :title="`Skill ${index + 1}`"
            @remove="resumeStore.removeSkill(index)"
            @move-up="resumeStore.moveSkill(index, index - 1)"
            @move-down="resumeStore.moveSkill(index, index + 1)"
        >
            <div class="space-y-4">
                <div class="space-y-2">
                    <Label>Skill Category</Label>
                    <Input
                        :model-value="skill.title"
                        placeholder="e.g., Programming Languages, Design Tools, etc."
                        @update:model-value="(value) => resumeStore.updateSkill(index, 'title', value)"
                    />
                </div>

                <div class="space-y-2">
                    <Label>Skills</Label>
                    <Textarea
                        :model-value="skill.description"
                        placeholder="List your skills in this category, separated by commas"
                        rows="3"
                        @update:model-value="(value) => resumeStore.updateSkill(index, 'description', value)"
                    />
                </div>
            </div>
        </FormCard>
    </FormContainer>
</template>

<script lang="ts" setup>
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import FormCard from '~/components/elements/FormCard.vue';
import FormContainer from '~/components/elements/FormContainer.vue';

// Use the store directly instead of props
const resumeStore = useResumeStore();
const templateConfig = useTemplate();
</script>
