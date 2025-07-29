<template>
    <div class="mb-4">
        <label
            v-if="label"
            class="block text-sm font-medium text-gray-700 mb-1"
        >{{ label }}</label>
        <div class="relative">
            <VueDatePicker
                v-model="selectedDate"
                :disabled="disabled"
                :placeholder="placeholder"
                class="month-year-picker"
                format="MMMM yyyy"
                month-picker
                @update:model-value="handleDateChange"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

interface Props {
    modelValue: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    label: '',
    placeholder: 'Select',
});

const emit = defineEmits<{
    'update:modelValue': [value: string];
}>();

// Convert modelValue to format expected by VueDatePicker month-picker mode
const selectedDate = ref<{ month: number; year: number } | null>(null);

// Watch for prop changes
watch(() => props.modelValue, (newValue) => {
    if (newValue) {
        const [year, month] = newValue.split('-');
        // VueDatePicker month-picker expects { month: 0-11, year: number }
        selectedDate.value = {
            month: parseInt(month) - 1, // Convert to 0-based month
            year: parseInt(year),
        };
    }
    else {
        selectedDate.value = null;
    }
}, { immediate: true });

// Handle date change
const handleDateChange = (date: { month: number; year: number } | null | undefined) => {
    if (!date) {
        emit('update:modelValue', '');
        return;
    }

    // VueDatePicker month-picker returns { month: number, year: number }
    if (typeof date === 'object' && 'month' in date && 'year' in date) {
        const year = date.year;
        const month = String(date.month + 1).padStart(2, '0'); // Convert from 0-based to 1-based
        emit('update:modelValue', `${year}-${month}`);
    }
    else {
        emit('update:modelValue', '');
    }
};
</script>

<style scoped>
</style>
