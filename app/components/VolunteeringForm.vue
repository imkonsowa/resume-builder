<template>
    <FormContainer
        :title="resumeStore.resumeData.sectionHeaders.volunteering"
        :is-empty="resumeStore.resumeData.volunteering.length === 0"
        empty-message="No volunteering entries added yet. Click 'Add Volunteering' to get started."
        add-button-label="Add Volunteering"
        @add="resumeStore.addVolunteering"
        @edit-title="(value) => resumeStore.updateSectionHeader('volunteering', value)"
    >
        <!-- Column Placement Control -->
        <template #header-actions>
            <div v-if="templateConfig.canMoveSection('volunteering')" class="flex items-center gap-2">
                <span class="text-sm text-gray-600">Column:</span>
                <select
                    :value="resumeStore.resumeData.sectionPlacement.volunteering"
                    class="px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    @change="(e) => resumeStore.updateSectionPlacement('volunteering', (e.target as HTMLSelectElement).value as 'left' | 'right')"
                >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>
            </div>
        </template>
        <FormCard
            v-for="(volunteering, index) in resumeStore.resumeData.volunteering"
            :key="index"
            :title="`Volunteering ${index + 1}`"
            :confirm-title="'Delete Volunteering'"
            :confirm-message="`Are you sure you want to delete this volunteering entry? This action cannot be undone.`"
            @remove="resumeStore.removeVolunteering(index)"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <Label>Organization</Label>
                    <Input
                        :model-value="volunteering.organization"
                        placeholder="Organization Name"
                        @update:model-value="(value) => resumeStore.updateVolunteering(index, 'organization', value)"
                    />
                </div>
                <div class="space-y-2">
                    <Label>Position</Label>
                    <Input
                        :model-value="volunteering.position"
                        placeholder="Volunteer Position"
                        @update:model-value="(value) => resumeStore.updateVolunteering(index, 'position', value)"
                    />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div class="space-y-2">
                    <Label>Location</Label>
                    <Input
                        :model-value="volunteering.location"
                        placeholder="City, Country"
                        @update:model-value="(value) => resumeStore.updateVolunteering(index, 'location', value)"
                    />
                </div>
                <MonthYearPicker
                    :model-value="volunteering.startDate"
                    label="Start Date"
                    @update:model-value="(value) => resumeStore.updateVolunteering(index, 'startDate', value)"
                />
                <div class="space-y-2">
                    <MonthYearPicker
                        :model-value="volunteering.endDate"
                        label="End Date"
                        :disabled="volunteering.isPresent"
                        @update:model-value="(value) => resumeStore.updateVolunteering(index, 'endDate', value)"
                    />
                    <div class="flex items-center space-x-2">
                        <Checkbox
                            :id="`vol-present-${index}`"
                            :model-value="volunteering.isPresent"
                            @update:model-value="(value) => {
                                resumeStore.updateVolunteering(index, 'isPresent', value);
                                if (value) resumeStore.updateVolunteering(index, 'endDate', '');
                            }"
                        />
                        <Label :for="`vol-present-${index}`" class="text-sm">Present</Label>
                    </div>
                </div>
            </div>

            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <Label>Volunteer Achievements</Label>
                    <Button
                        variant="outline"
                        size="sm"
                        @click="resumeStore.addVolunteeringAchievement(index)"
                    >
                        <Plus class="w-4 h-4 mr-2" />
                        Add Achievement
                    </Button>
                </div>

                <div class="space-y-2">
                    <div
                        v-for="(_, achievementIndex) in volunteering.achievements"
                        :key="achievementIndex"
                        class="space-y-2"
                    >
                        <div class="flex items-center space-x-2 md:space-x-2">
                            <Input
                                :model-value="volunteering.achievements[achievementIndex].text"
                                placeholder="Describe your volunteer achievements and impact"
                                class="flex-1"
                                @update:model-value="(value) => resumeStore.updateVolunteeringAchievement(index, achievementIndex, value)"
                                @keydown.enter="resumeStore.addVolunteeringAchievement(index)"
                            />
                            <div class="hidden md:flex items-center space-x-1">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    :disabled="achievementIndex === 0"
                                    @click="resumeStore.moveVolunteeringAchievement(index, achievementIndex, achievementIndex - 1)"
                                >
                                    <ChevronUp class="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    :disabled="achievementIndex === volunteering.achievements.length - 1"
                                    @click="resumeStore.moveVolunteeringAchievement(index, achievementIndex, achievementIndex + 1)"
                                >
                                    <ChevronDown class="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    @click="resumeStore.removeVolunteeringAchievement(index, achievementIndex)"
                                >
                                    <Trash2 class="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <div class="flex md:hidden items-center justify-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                :disabled="achievementIndex === 0"
                                @click="resumeStore.moveVolunteeringAchievement(index, achievementIndex, achievementIndex - 1)"
                            >
                                <ChevronUp class="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                :disabled="achievementIndex === volunteering.achievements.length - 1"
                                @click="resumeStore.moveVolunteeringAchievement(index, achievementIndex, achievementIndex + 1)"
                            >
                                <ChevronDown class="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                @click="resumeStore.removeVolunteeringAchievement(index, achievementIndex)"
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

<script setup lang="ts">
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-vue-next';
import MonthYearPicker from './MonthYearPicker.vue';
import FormCard from './FormCard.vue';
import FormContainer from './FormContainer.vue';

// Use the store directly instead of props
const resumeStore = useResumeStore();
const templateConfig = useTemplate();
</script>
