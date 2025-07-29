<template>
    <FormContainer
        :is-empty="resumeStore.resumeData.education.length === 0"
        :title="resumeStore.resumeData.sectionHeaders.education"
        add-button-label="Add Education"
        empty-message="No education entries added yet. Click 'Add Education' to get started."
        section-key="education"
        @add="resumeStore.addEducation"
        @edit-title="(value) => resumeStore.updateSectionHeader('education', value)"
    >
        <FormCard
            v-for="(education, index) in resumeStore.resumeData.education"
            :key="index"
            :can-move-down="index < resumeStore.resumeData.education.length - 1"
            :can-move-up="index > 0"
            :confirm-message="`Are you sure you want to delete this education entry? This action cannot be undone.`"
            :confirm-title="'Delete Education'"
            :title="`Education ${index + 1}`"
            @remove="resumeStore.removeEducation(index)"
            @move-up="resumeStore.moveEducation(index, index - 1)"
            @move-down="resumeStore.moveEducation(index, index + 1)"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <Label>Institution</Label>
                    <Input
                        :model-value="education.institution"
                        placeholder="University of Example"
                        @update:model-value="(value) => resumeStore.updateEducation(index, 'institution', value)"
                    />
                </div>
                <div class="space-y-2">
                    <Label>Degree</Label>
                    <Input
                        :model-value="education.degree"
                        placeholder="Bachelor of Science"
                        @update:model-value="(value) => resumeStore.updateEducation(index, 'degree', value)"
                    />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <Label>Location</Label>
                    <Input
                        :model-value="education.location"
                        placeholder="City, Country"
                        @update:model-value="(value) => resumeStore.updateEducation(index, 'location', value)"
                    />
                </div>
                <div class="space-y-2">
                    <Label>Graduation Score</Label>
                    <Input
                        :model-value="education.graduationScore"
                        placeholder="GPA, Grade, etc."
                        @update:model-value="(value) => resumeStore.updateEducation(index, 'graduationScore', value)"
                    />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <MonthYearPicker
                        :model-value="education.startDate"
                        label="Start Date"
                        @update:model-value="(value) => resumeStore.updateEducation(index, 'startDate', value)"
                    />
                </div>
                <div class="space-y-2">
                    <MonthYearPicker
                        :disabled="education.isPresent"
                        :model-value="education.endDate"
                        label="End Date"
                        @update:model-value="(value) => resumeStore.updateEducation(index, 'endDate', value)"
                    />
                    <div class="flex items-center space-x-2 mt-2">
                        <Checkbox
                            :id="`present-${index}`"
                            :model-value="education.isPresent"
                            @update:model-value="(value) => {
                                resumeStore.updateEducation(index, 'isPresent', value);
                                if (value) resumeStore.updateEducation(index, 'endDate', '');
                            }"
                        />
                        <Label
                            :for="`present-${index}`"
                            class="text-sm"
                        >Present</Label>
                    </div>
                </div>
            </div>

            <div class="space-y-2">
                <Label>Description</Label>
                <Textarea
                    :model-value="education.description"
                    placeholder="Relevant coursework, achievements, honors, etc."
                    rows="3"
                    @update:model-value="(value) => resumeStore.updateEducation(index, 'description', value)"
                />
            </div>
        </FormCard>
    </FormContainer>
</template>

<script lang="ts" setup>
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Checkbox } from '~/components/ui/checkbox';
import MonthYearPicker from '~/components/elements/MonthYearPicker.vue';
import FormCard from '~/components/elements/FormCard.vue';
import FormContainer from '~/components/elements/FormContainer.vue';

// Use the store directly instead of props
const resumeStore = useResumeStore();
</script>
