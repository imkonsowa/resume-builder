<script lang="ts" setup>
    import {Button} from '~/components/ui/button';
    import {Input} from '~/components/ui/input';
    import {Label} from '~/components/ui/label';
    import {Checkbox} from '~/components/ui/checkbox';

    interface Props {
        isOpen: boolean;
    }

    interface Emits {
        (e: 'close'): void;

        (e: 'confirm', name: string, navigateToBuilder: boolean): void;
    }

    const props = defineProps<Props>();
    const emit = defineEmits<Emits>();

    const newResumeName = ref('');
    const navigateToBuilder = ref(true);

    // Reset form when modal opens
    watch(() => props.isOpen, (isOpen) => {
        if (isOpen) {
            newResumeName.value = '';
            navigateToBuilder.value = true;
        }
    });

    const handleConfirm = () => {
        emit('confirm', newResumeName.value, navigateToBuilder.value);
    };

    const handleCancel = () => {
        emit('close');
    };

    const handleEnter = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleConfirm();
        }
    };
</script>

<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
        @click="handleCancel"
    >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50"/>

        <!-- Modal Content -->
        <div
            class="relative bg-white border rounded-lg shadow-xl p-6 w-96 max-w-[90vw]"
            @click.stop
        >
            <div class="space-y-4">
                <h3 class="text-lg font-semibold text-gray-900">
                    Create New Resume
                </h3>

                <div class="space-y-2">
                    <Label for="resume-name">Resume Name</Label>
                    <Input
                        id="resume-name"
                        v-model="newResumeName"
                        autofocus
                        placeholder="Enter resume name"
                        @keydown="handleEnter"
                    />
                </div>

                <div class="flex items-center space-x-2 pt-2">
                    <Checkbox
                        id="navigate-to-builder"
                        v-model="navigateToBuilder"
                    />
                    <Label
                        class="text-sm font-normal"
                        for="navigate-to-builder"
                    >
                        Navigate to the builder after creating
                    </Label>
                </div>

                <div class="flex gap-3 pt-4">
                    <Button
                        class="flex-1"
                        @click="handleConfirm"
                    >
                        Create Resume
                    </Button>
                    <Button
                        class="flex-1"
                        variant="outline"
                        @click="handleCancel"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>
