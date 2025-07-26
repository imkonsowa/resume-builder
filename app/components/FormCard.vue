<template>
    <Card class="relative mb-6 form-card">
        <CardHeader>
            <CardTitle class="flex justify-between items-center">
                <span>{{ title }}</span>
                <Button
                    variant="outline"
                    size="sm"
                    @click="handleRemove"
                >
                    <Trash2 class="w-4 h-4" />
                </Button>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <slot />
        </CardContent>
    </Card>

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
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-vue-next';
import ConfirmationModal from './ConfirmationModal.vue';

interface Props {
    title: string;
    confirmTitle?: string;
    confirmMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
    confirmTitle: 'Delete Item',
    confirmMessage: 'Are you sure you want to delete this item? This action cannot be undone.'
});

const emit = defineEmits<{
    remove: [];
}>();

const confirmation = useConfirmation();

const handleRemove = async () => {
    const confirmed = await confirmation.confirm({
        title: props.confirmTitle,
        message: props.confirmMessage,
        confirmText: 'Delete',
        cancelText: 'Cancel'
    });

    if (confirmed) {
        emit('remove');
    }
};
</script>
