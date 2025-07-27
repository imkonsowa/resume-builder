<template>
    <FormContainer
        :is-empty="resumeStore.resumeData.experiences.length === 0"
        :title="resumeStore.resumeData.sectionHeaders.experience"
        add-button-label="Add Experience"
        empty-message="No experience entries added yet. Click 'Add Experience' to get started."
        @add="resumeStore.addExperience"
        @edit-title="(value) => resumeStore.updateSectionHeader('experience', value)"
    >
        <FormCard
            v-for="(experience, index) in resumeStore.resumeData.experiences"
            :key="index"
            :confirm-message="`Are you sure you want to delete this experience entry? This action cannot be undone.`"
            :confirm-title="'Delete Experience'"
            :title="`Experience ${index + 1}`"
            @remove="resumeStore.removeExperience(index)"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <Label>Position</Label>
                    <Input
                        :model-value="experience.position"
                        placeholder="Job Title"
                        @update:model-value="(value) => resumeStore.updateExperience(index, 'position', value)"
                    />
                </div>
                <div class="space-y-2">
                    <Label>Company</Label>
                    <Input
                        :model-value="experience.company"
                        placeholder="Company Name"
                        @update:model-value="(value) => resumeStore.updateExperience(index, 'company', value)"
                    />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <Label>Location</Label>
                    <Input
                        :model-value="experience.location"
                        placeholder="City, Country"
                        @update:model-value="(value) => resumeStore.updateExperience(index, 'location', value)"
                    />
                </div>
                <div class="space-y-2">
                    <Label>Company Website URL</Label>
                    <Input
                        :model-value="experience.companyUrl || ''"
                        placeholder="https://company.com"
                        @update:model-value="(value) => resumeStore.updateExperience(index, 'companyUrl', value)"
                    />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <MonthYearPicker
                        :model-value="experience.startDate"
                        label="Start Date"
                        @update:model-value="(value) => resumeStore.updateExperience(index, 'startDate', value)"
                    />
                </div>
                <div class="space-y-2">
                    <MonthYearPicker
                        :disabled="experience.isPresent"
                        :model-value="experience.endDate"
                        label="End Date"
                        @update:model-value="(value) => resumeStore.updateExperience(index, 'endDate', value)"
                    />
                    <div class="flex items-center space-x-2 mt-2">
                        <Checkbox
                            :id="`present-${index}`"
                            :model-value="experience.isPresent"
                            @update:model-value="(value) => {
                                resumeStore.updateExperience(index, 'isPresent', value);
                                if (value) resumeStore.updateExperience(index, 'endDate', '');
                            }"
                        />
                        <Label
                            :for="`present-${index}`"
                            class="text-sm"
                        >Present</Label>
                    </div>
                </div>
            </div>

            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <Label>Achievements</Label>
                    <Button
                        size="sm"
                        variant="outline"
                        @click="resumeStore.addExperienceAchievement(index)"
                    >
                        <Plus class="w-4 h-4 mr-2"/>
                        Add Achievement
                    </Button>
                </div>

                <div class="space-y-2">
                    <div
                        v-for="(_, achievementIndex) in experience.achievements"
                        :key="achievementIndex"
                        class="space-y-2"
                    >
                        <div class="flex items-center space-x-2 md:space-x-2">
                            <Input
                                :model-value="experience.achievements[achievementIndex].text"
                                class="flex-1"
                                placeholder="Describe your key achievements and impact"
                                @update:model-value="(value) => resumeStore.updateExperienceAchievement(index, achievementIndex, value)"
                                @keydown.enter="resumeStore.addExperienceAchievement(index)"
                            />
                            <div class="hidden md:flex items-center space-x-1">
                                <Button
                                    :disabled="achievementIndex === 0"
                                    size="sm"
                                    variant="outline"
                                    @click="resumeStore.moveExperienceAchievement(index, achievementIndex, achievementIndex - 1)"
                                >
                                    <ChevronUp class="w-4 h-4"/>
                                </Button>
                                <Button
                                    :disabled="achievementIndex === experience.achievements.length - 1"
                                    size="sm"
                                    variant="outline"
                                    @click="resumeStore.moveExperienceAchievement(index, achievementIndex, achievementIndex + 1)"
                                >
                                    <ChevronDown class="w-4 h-4"/>
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    @click="resumeStore.removeExperienceAchievement(index, achievementIndex)"
                                >
                                    <Trash2 class="w-4 h-4"/>
                                </Button>
                            </div>
                        </div>
                        <div class="flex md:hidden items-center justify-center space-x-2">
                            <Button
                                :disabled="achievementIndex === 0"
                                size="sm"
                                variant="outline"
                                @click="resumeStore.moveExperienceAchievement(index, achievementIndex, achievementIndex - 1)"
                            >
                                <ChevronUp class="w-4 h-4"/>
                            </Button>
                            <Button
                                :disabled="achievementIndex === experience.achievements.length - 1"
                                size="sm"
                                variant="outline"
                                @click="resumeStore.moveExperienceAchievement(index, achievementIndex, achievementIndex + 1)"
                            >
                                <ChevronDown class="w-4 h-4"/>
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                @click="resumeStore.removeExperienceAchievement(index, achievementIndex)"
                            >
                                <Trash2 class="w-4 h-4"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </FormCard>
    </FormContainer>
</template>

<script lang="ts" setup>
    import {Button} from '~/components/ui/button';
    import {Input} from '~/components/ui/input';
    import {Label} from '~/components/ui/label';
    import {Checkbox} from '~/components/ui/checkbox';
    import {ChevronDown, ChevronUp, Plus, Trash2} from 'lucide-vue-next';
    import MonthYearPicker from '~/components/elements/MonthYearPicker.vue';
    import FormCard from '~/components/elements/FormCard.vue';
    import FormContainer from '~/components/elements/FormContainer.vue';

    // Use the store directly instead of prop drilling
    const resumeStore = useResumeStore();
</script>
