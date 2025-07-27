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
                :format="formatDate"
                :placeholder="placeholder"
                class="month-year-picker"
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

    // Convert modelValue to Date object
    const selectedDate = ref<Date | null>(null);

    // Watch for prop changes
    watch(() => props.modelValue, (newValue) => {
        if (newValue) {
            const [year, month] = newValue.split('-');
            selectedDate.value = new Date(parseInt(year), parseInt(month) - 1);
        } else {
            selectedDate.value = null;
        }
    }, {immediate: true});

    // Handle date change
    const handleDateChange = (date: Date | string | null | undefined) => {
        if (!date) {
            emit('update:modelValue', '');
            return;
        }

        // Handle different possible formats from VueDatePicker
        let dateObj: Date | null = null;

        if (date instanceof Date) {
            dateObj = date;
        } else if (typeof date === 'object' && date.month !== undefined && date.year !== undefined) {
            // VueDatePicker month picker can return { month: number, year: number }
            dateObj = new Date(date.year, date.month);
        } else if (typeof date === 'string') {
            // Try to parse string date
            dateObj = new Date(date);
        }

        if (dateObj && !isNaN(dateObj.getTime())) {
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            emit('update:modelValue', `${year}-${month}`);
        } else {
            emit('update:modelValue', '');
        }
    };

    // Format date for display
    const formatDate = (date: Date) => {
        if (!date) return '';
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
        };
        return date.toLocaleDateString('en-US', options);
    };
</script>

<style scoped>
</style>
