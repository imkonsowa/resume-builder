<template>
    <FormContainer
        title="Personal Information"
        :is-empty="false"
        empty-message=""
        add-button-label=""
        :show-add-button="false"
        :editable="false"
    >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
                <Label for="firstName">First Name</Label>
                <Input
                    id="firstName"
                    :model-value="resumeStore.resumeData.firstName"
                    placeholder="John"
                    @update:model-value="(value) => resumeStore.updateField('firstName', value)"
                />
            </div>
            <div class="space-y-2">
                <Label for="lastName">Last Name</Label>
                <Input
                    id="lastName"
                    :model-value="resumeStore.resumeData.lastName"
                    placeholder="Doe"
                    @update:model-value="(value) => resumeStore.updateField('lastName', value)"
                />
            </div>
            <div class="space-y-2">
                <Label for="position">Position</Label>
                <Input
                    id="position"
                    :model-value="resumeStore.resumeData.position"
                    placeholder="Software Engineer"
                    @update:model-value="(value) => resumeStore.updateField('position', value)"
                />
            </div>
            <div class="space-y-2">
                <Label for="location">Location</Label>
                <Input
                    id="location"
                    :model-value="resumeStore.resumeData.location"
                    placeholder="City, Country"
                    @update:model-value="(value) => resumeStore.updateField('location', value)"
                />
            </div>
        </div>

        <!-- Contact Information Section -->
        <div class="mt-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        :model-value="resumeStore.resumeData.email"
                        type="email"
                        placeholder="john@example.com"
                        @update:model-value="(value) => resumeStore.updateField('email', value)"
                    />
                </div>
                <div class="space-y-2">
                    <Label for="phone">Phone</Label>
                    <Input
                        id="phone"
                        :model-value="resumeStore.resumeData.phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        @update:model-value="(value) => resumeStore.updateField('phone', value)"
                    />
                </div>
            </div>
        </div>

        <!-- Profile/Summary Section -->
        <div class="mt-6 space-y-4">
            <EditableHeader
                :value="resumeStore.resumeData.sectionHeaders?.profile || 'Profile'"
                @update="(value) => resumeStore.updateSectionHeader('profile', value)"
            />
            <div class="space-y-2">
                <Textarea
                    id="summary"
                    :model-value="resumeStore.resumeData.summary"
                    rows="4"
                    placeholder="Brief summary of your experience and skills..."
                    @update:model-value="(value) => resumeStore.updateField('summary', value)"
                />
            </div>
        </div>

        <!-- Social Links Section -->
        <div class="mt-6 space-y-4">
            <div class="flex justify-between items-center">
                <EditableHeader
                    :value="resumeStore.resumeData.sectionHeaders.socialLinks"
                    @update="(value) => resumeStore.updateSectionHeader('socialLinks', value)"
                />
                <Button
                    variant="outline"
                    size="sm"
                    @click="resumeStore.addSocialLink"
                >
                    <Plus class="w-4 h-4 mr-2"/>
                    Add Link
                </Button>
            </div>

            <div class="space-y-3">
                <div
                    v-for="(link, linkIndex) in resumeStore.resumeData.socialLinks"
                    :key="linkIndex"
                    class="flex items-center gap-2"
                >
                    <!-- Platform Icon -->
                    <div class="flex-none">
                        <component :is="getPlatformIcon(link.platform)" class="w-5 h-5 text-gray-600"/>
                    </div>

                    <!-- Platform Dropdown -->
                    <div class="w-40">
                        <select
                            :value="link.platform"
                            class="w-full px-3 py-2 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                            @change="(e) => resumeStore.updateSocialLink(linkIndex, 'platform', (e.target as HTMLSelectElement).value)"
                        >
                            <option v-for="platform in SOCIAL_PLATFORMS" :key="platform.value" :value="platform.value">
                                {{ platform.label }}
                            </option>
                        </select>
                    </div>

                    <!-- URL Input -->
                    <div class="flex-1">
                        <Input
                            type="url"
                            :model-value="link.url"
                            placeholder="https://"
                            @update:model-value="(value) => resumeStore.updateSocialLink(linkIndex, 'url', value)"
                        />
                    </div>

                    <!-- Custom Label (only for 'other' platform) -->
                    <div v-if="link.platform === 'other'" class="w-32">
                        <Input
                            :model-value="link.customLabel || ''"
                            placeholder="Label"
                            @update:model-value="(value) => resumeStore.updateSocialLink(linkIndex, 'customLabel', value)"
                        />
                    </div>

                    <!-- Order Controls -->
                    <div class="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="sm"
                            :disabled="linkIndex === 0"
                            @click="resumeStore.moveSocialLink(linkIndex, linkIndex - 1)"
                        >
                            <ChevronUp class="w-4 h-4"/>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            :disabled="linkIndex === resumeStore.resumeData.socialLinks.length - 1"
                            @click="resumeStore.moveSocialLink(linkIndex, linkIndex + 1)"
                        >
                            <ChevronDown class="w-4 h-4"/>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            @click="handleRemoveSocialLink(linkIndex)"
                        >
                            <Trash2 class="w-4 h-4"/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
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
    import {Input} from './ui/input';
    import {Label} from './ui/label';
    import {Textarea} from './ui/textarea';
    import {Button} from './ui/button';
    import {
        BookOpen,
        ChevronDown,
        ChevronUp,
        Dribbble,
        Edit3,
        Github,
        Globe,
        Link,
        Linkedin,
        Plus,
        Trash2,
        Twitter
    } from 'lucide-vue-next';
    import FormContainer from './FormContainer.vue';
    import ConfirmationModal from './ConfirmationModal.vue';
    import EditableHeader from './EditableHeader.vue';

    const SOCIAL_PLATFORMS = [
        {value: 'linkedin', label: 'LinkedIn', icon: Linkedin},
        {value: 'github', label: 'GitHub', icon: Github},
        {value: 'twitter', label: 'Twitter', icon: Twitter},
        {value: 'portfolio', label: 'Portfolio', icon: Globe},
        {value: 'dribbble', label: 'Dribbble', icon: Dribbble},
        {value: 'medium', label: 'Medium', icon: BookOpen},
        {value: 'devto', label: 'Dev.to', icon: Edit3},
        {value: 'personal', label: 'Personal', icon: Globe},
        {value: 'other', label: 'Other', icon: Link}
    ];

    const resumeStore = useResumeStore();
    const confirmation = useConfirmation();

    const getPlatformIcon = (platform: string) => {
        const found = SOCIAL_PLATFORMS.find(p => p.value === platform);
        return found?.icon || Link;
    };

    const handleRemoveSocialLink = async (index: number) => {
        const confirmed = await confirmation.confirm({
            title: 'Delete Social Link',
            message: 'Are you sure you want to delete this social link? This action cannot be undone.',
            confirmText: 'Delete',
            cancelText: 'Cancel'
        });

        if (confirmed) {
            resumeStore.removeSocialLink(index);
        }
    };
</script>
