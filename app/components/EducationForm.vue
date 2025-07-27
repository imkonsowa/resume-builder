<template>
    <FormContainer
        :title="resumeStore.resumeData.sectionHeaders.education"
        :is-empty="resumeStore.resumeData.education.length === 0"
        empty-message="No education entries added yet. Click 'Add Education' to get started."
        add-button-label="Add Education"
        @add="resumeStore.addEducation"
        @edit-title="(value) => resumeStore.updateSectionHeader('education', value)"
    >
        <FormCard
            v-for="(education, index) in resumeStore.resumeData.education"
            :key="index"
            :title="`Education ${index + 1}`"
            :confirm-title="'Delete Education'"
            :confirm-message="`Are you sure you want to delete this education entry? This action cannot be undone.`"
            @remove="resumeStore.removeEducation(index)"
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
                        :model-value="education.endDate"
                        label="End Date"
                        :disabled="education.isPresent"
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
                        <Label :for="`present-${index}`" class="text-sm">Present</Label>
                    </div>
                </div>
            </div>

            <div class="space-y-2">
                <Label>Description</Label>
                <Textarea
                    :model-value="education.description"
                    rows="3"
                    placeholder="Relevant coursework, achievements, honors, etc."
                    @update:model-value="(value) => resumeStore.updateEducation(index, 'description', value)"
                />
            </div>
        </FormCard>
    </FormContainer>
</template>

<script setup lang="ts">
    import {Input} from './ui/input';
    import {Label} from './ui/label';
    import {Textarea} from './ui/textarea';
    import {Checkbox} from './ui/checkbox';
    import MonthYearPicker from './MonthYearPicker.vue';
    import FormCard from './FormCard.vue';
    import FormContainer from './FormContainer.vue';

    // Use the store directly instead of props
    const resumeStore = useResumeStore();
</script>
