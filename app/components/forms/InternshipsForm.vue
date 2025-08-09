<template>
    <FormContainer
        :is-empty="resumeStore.resumeData.internships.length === 0"
        :title="resumeStore.resumeData.sectionHeaders.internships"
        add-button-label="Add Internship"
        empty-message="No internship entries added yet. Click 'Add Internship' to get started."
        section-key="internships"
        @add="resumeStore.addInternship"
        @edit-title="(value) => resumeStore.updateSectionHeader('internships', value)"
    >
        <FormCard
            v-for="(internship, index) in resumeStore.resumeData.internships"
            :key="index"
            :can-move-down="index < resumeStore.resumeData.internships.length - 1"
            :can-move-up="index > 0"
            :confirm-message="`Are you sure you want to delete this internship entry? This action cannot be undone.`"
            :confirm-title="'Delete Internship'"
            :title="`Internship ${index + 1}`"
            @remove="resumeStore.removeInternship(index)"
            @move-up="resumeStore.moveInternship(index, index - 1)"
            @move-down="resumeStore.moveInternship(index, index + 1)"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <Label>Position</Label>
                    <Input
                        :model-value="internship.position"
                        placeholder="Intern Position"
                        @update:model-value="(value) => resumeStore.updateInternship(index, 'position', value)"
                    />
                </div>
                <div class="space-y-2">
                    <Label>Company</Label>
                    <Input
                        :model-value="internship.company"
                        placeholder="Company Name"
                        @update:model-value="(value) => resumeStore.updateInternship(index, 'company', value)"
                    />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <Label>Location</Label>
                    <Input
                        :model-value="internship.location"
                        placeholder="City, Country"
                        @update:model-value="(value) => resumeStore.updateInternship(index, 'location', value)"
                    />
                </div>
                <div class="space-y-2">
                    <Label>Company Website URL</Label>
                    <Input
                        :model-value="internship.companyUrl || ''"
                        placeholder="https://company.com"
                        @update:model-value="(value) => resumeStore.updateInternship(index, 'companyUrl', value)"
                    />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <MonthYearPicker
                        :model-value="internship.startDate"
                        label="Start Date"
                        @update:model-value="(value) => resumeStore.updateInternship(index, 'startDate', value)"
                    />
                </div>
                <div class="space-y-2">
                    <MonthYearPicker
                        :disabled="internship.isPresent"
                        :model-value="internship.endDate"
                        label="End Date"
                        @update:model-value="(value) => resumeStore.updateInternship(index, 'endDate', value)"
                    />
                    <div class="flex items-center space-x-2 mt-2">
                        <Checkbox
                            :id="`present-${index}`"
                            :model-value="internship.isPresent"
                            @update:model-value="(value) => {
                                resumeStore.updateInternship(index, 'isPresent', value);
                                if (value) resumeStore.updateInternship(index, 'endDate', '');
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
                        @click="resumeStore.addInternshipAchievement(index)"
                    >
                        <Plus class="w-4 h-4 mr-2" />
                        Add Achievement
                    </Button>
                </div>

                <div class="space-y-2">
                    <div
                        v-for="(_, achievementIndex) in internship.achievements"
                        :key="achievementIndex"
                        class="space-y-2"
                    >
                        <div class="flex items-center space-x-2 md:space-x-2">
                            <Input
                                :model-value="internship.achievements[achievementIndex].text"
                                class="flex-1"
                                placeholder="Describe your key achievements and impact"
                                @update:model-value="(value) => resumeStore.updateInternshipAchievement(index, achievementIndex, value)"
                                @keydown.enter="resumeStore.addInternshipAchievement(index)"
                            />
                            <div class="hidden md:flex items-center space-x-1">
                                <Button
                                    :disabled="achievementIndex === 0"
                                    size="sm"
                                    variant="outline"
                                    @click="resumeStore.moveInternshipAchievement(index, achievementIndex, achievementIndex - 1)"
                                >
                                    <ChevronUp class="w-4 h-4" />
                                </Button>
                                <Button
                                    :disabled="achievementIndex === internship.achievements.length - 1"
                                    size="sm"
                                    variant="outline"
                                    @click="resumeStore.moveInternshipAchievement(index, achievementIndex, achievementIndex + 1)"
                                >
                                    <ChevronDown class="w-4 h-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    @click="resumeStore.removeInternshipAchievement(index, achievementIndex)"
                                >
                                    <Trash2 class="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <div class="flex md:hidden items-center justify-center space-x-2">
                            <Button
                                :disabled="achievementIndex === 0"
                                size="sm"
                                variant="outline"
                                @click="resumeStore.moveInternshipAchievement(index, achievementIndex, achievementIndex - 1)"
                            >
                                <ChevronUp class="w-4 h-4" />
                            </Button>
                            <Button
                                :disabled="achievementIndex === internship.achievements.length - 1"
                                size="sm"
                                variant="outline"
                                @click="resumeStore.moveInternshipAchievement(index, achievementIndex, achievementIndex + 1)"
                            >
                                <ChevronDown class="w-4 h-4" />
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                @click="resumeStore.removeInternshipAchievement(index, achievementIndex)"
                            >
                                <Trash2 class="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </FormCard>
    </FormContainer>
</template>

<script lang="ts" setup>
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Checkbox } from '~/components/ui/checkbox';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-vue-next';
import MonthYearPicker from '~/components/elements/MonthYearPicker.vue';
import FormCard from '~/components/elements/FormCard.vue';
import FormContainer from '~/components/elements/FormContainer.vue';

// Use the store directly instead of prop drilling
const resumeStore = useResumeStore();
</script>
