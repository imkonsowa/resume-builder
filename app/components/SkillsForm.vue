<template>
    <FormContainer
        :title="resumeStore.resumeData.sectionHeaders.skills"
        :is-empty="resumeStore.resumeData.skills.length === 0"
        empty-message="No skills added yet. Click 'Add Skill' to get started."
        add-button-label="Add Skill"
        @add="resumeStore.addSkill"
        @edit-title="(value) => resumeStore.updateSectionHeader('skills', value)"
    >
        <!-- Column Placement Control -->
        <template #header-actions>
            <div v-if="templateConfig.canMoveSection('skills')" class="flex items-center gap-2">
                <span class="text-sm text-gray-600">Column:</span>
                <select
                    :value="resumeStore.resumeData.sectionPlacement.skills"
                    class="px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    @change="(e) => resumeStore.updateSectionPlacement('skills', (e.target as HTMLSelectElement).value as 'left' | 'right')"
                >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>
            </div>
        </template>
        <FormCard
            v-for="(skill, index) in resumeStore.resumeData.skills"
            :key="index"
            :title="`Skill ${index + 1}`"
            :confirm-title="'Delete Skill'"
            :confirm-message="`Are you sure you want to delete this skill entry? This action cannot be undone.`"
            @remove="resumeStore.removeSkill(index)"
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
                        rows="3"
                        placeholder="List your skills in this category, separated by commas"
                        @update:model-value="(value) => resumeStore.updateSkill(index, 'description', value)"
                    />
                </div>
            </div>
        </FormCard>
    </FormContainer>
</template>

<script setup lang="ts">
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import FormCard from './FormCard.vue';
import FormContainer from './FormContainer.vue';

// Use the store directly instead of props
const resumeStore = useResumeStore();
const templateConfig = useTemplate();
</script>
