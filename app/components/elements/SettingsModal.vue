<template>
    <Dialog v-model:open="isOpen">
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>{{ t('settings.title') }}</DialogTitle>
                <DialogDescription>
                    {{ t('settings.description') }}
                </DialogDescription>
            </DialogHeader>

            <div class="space-y-6 py-4">
                <!-- Language Selection -->
                <div class="space-y-2">
                    <Label for="language">{{ t('common.language') }}</Label>
                    <Select
                        v-model="selectedLanguage"
                        @update:model-value="updateLanguage"
                    >
                        <SelectTrigger id="language">
                            <SelectValue :placeholder="t('common.language')" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="lang in availableLanguages"
                                :key="lang.code"
                                :value="lang.code"
                            >
                                {{ lang.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <p class="text-sm text-muted-foreground">
                        {{ t('common.language') }}
                    </p>
                </div>

                <!-- Template Selection -->
                <div class="space-y-2">
                    <Label for="template">{{ t('settings.template.label') }}</Label>
                    <Select
                        v-model="selectedTemplate"
                        @update:model-value="updateTemplate"
                    >
                        <SelectTrigger id="template">
                            <SelectValue :placeholder="t('settings.template.placeholder')">
                                {{ selectedTemplateName }}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="template in availableTemplates"
                                :key="template.id"
                                :value="template.id"
                            >
                                <div class="flex flex-col space-y-1">
                                    <div class="font-medium">
                                        {{ template.name }}
                                    </div>
                                    <div class="text-xs text-muted-foreground">
                                        {{ template.description }}
                                    </div>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <p class="text-sm text-muted-foreground">
                        {{ t('settings.template.description') }}
                    </p>
                </div>

                <!-- Font Selection -->
                <div class="space-y-2">
                    <Label for="font-family">{{ t('settings.font.label') }}</Label>
                    <Select
                        v-model="selectedFont"
                        @update:model-value="updateFont"
                    >
                        <SelectTrigger id="font-family">
                            <SelectValue :placeholder="t('settings.font.placeholder')" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="font in availableFonts"
                                :key="font.family"
                                :value="font.family"
                            >
                                {{ font.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <p class="text-sm text-muted-foreground">
                        {{ t('settings.font.description') }}
                    </p>
                </div>

                <!-- Font Size Control -->
                <div class="space-y-2">
                    <Label for="font-size">{{ t('settings.fontSize.label') }}</Label>
                    <div class="flex items-center space-x-4">
                        <Slider
                            id="font-size"
                            v-model="fontSize"
                            :max="16"
                            :min="10"
                            :step="1"
                            class="flex-1"
                            @update:model-value="updateFontSize"
                        />
                        <span class="w-12 text-center font-medium">{{ fontSize[0] }}pt</span>
                    </div>
                    <p class="text-sm text-muted-foreground">
                        {{ t('settings.fontSize.description') }}
                    </p>
                </div>
            </div>

            <DialogFooter>
                <Button
                    variant="outline"
                    @click="resetToDefaults"
                >
                    {{ t('common.resetToDefaults') }}
                </Button>
                <Button @click="close">
                    {{ t('common.done') }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Slider } from '~/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { useSettingsStore } from '~/stores/settings';
import { availableTemplates } from '~/types/resume';

// Props
const props = defineProps<{
    modelValue: boolean;
}>();

// Emits
const emit = defineEmits<{
    'update:modelValue': [value: boolean];
}>();

// i18n
const { t } = useI18n();

// Store
const settingsStore = useSettingsStore();

// Local state
const fontSize = ref([settingsStore.fontSize]);
const selectedFont = ref(settingsStore.selectedFont);
const selectedTemplate = ref(settingsStore.selectedTemplate);
const selectedLanguage = ref(settingsStore.selectedLanguage);

// Computed
const isOpen = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const selectedTemplateName = computed(() => {
    const template = availableTemplates.find(t => t.id === selectedTemplate.value);
    return template ? template.name : '';
});

const availableFonts = computed(() => {
    return settingsStore.availableFontsForCurrentLanguage;
});

const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
];

// Watch for external changes
watch(() => settingsStore.fontSize, (newSize) => {
    fontSize.value = [newSize];
});

watch(() => settingsStore.selectedFont, (newFont) => {
    selectedFont.value = newFont;
});

watch(() => settingsStore.selectedTemplate, (newTemplate) => {
    selectedTemplate.value = newTemplate;
});

watch(() => settingsStore.selectedLanguage, (newLanguage) => {
    selectedLanguage.value = newLanguage;
});

// Watch for language changes to update font
watch(selectedLanguage, () => {
    selectedFont.value = settingsStore.selectedFont;
});

// Methods
const updateFontSize = (value: number[]) => {
    settingsStore.setFontSize(value[0]);
};

const updateFont = (value: string) => {
    settingsStore.setSelectedFont(value);
};

const updateTemplate = (value: string) => {
    settingsStore.setSelectedTemplate(value);
};

const updateLanguage = (value: string) => {
    settingsStore.setSelectedLanguage(value);
};

const resetToDefaults = () => {
    fontSize.value = [14];
    selectedFont.value = 'Calibri';
    selectedTemplate.value = 'default';
    selectedLanguage.value = 'en';
    settingsStore.setFontSize(14);
    settingsStore.setSelectedLanguage('en');
    settingsStore.setSelectedTemplate('default');
};

const close = () => {
    isOpen.value = false;
};
</script>
