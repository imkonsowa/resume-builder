<template>
    <Card class="w-full">
        <CardHeader class="px-4 md:px-6">
            <div class="flex items-center justify-between">
                <div class="flex-1">
                    <EditableHeader
                        v-if="props.editable"
                        :value="props.title"
                        @update="$emit('edit-title', $event)"
                    />
                    <CardTitle v-else>
                        {{ props.title }}
                    </CardTitle>
                </div>
                <div
                    v-if="$slots['header-actions']"
                    class="ml-4"
                >
                    <slot name="header-actions" />
                </div>
            </div>
        </CardHeader>
        <CardContent class="px-4 md:px-6">
            <div
                v-if="props.isEmpty"
                class="text-center py-8 text-muted-foreground"
            >
                {{ props.emptyMessage }}
            </div>

            <div v-else>
                <slot />
            </div>

            <!-- Add Button at Bottom -->
            <div
                v-if="props.showAddButton"
                class="mt-6"
            >
                <AddButton
                    :label="props.addButtonLabel"
                    @click="$emit('add')"
                />
            </div>
        </CardContent>
    </Card>
</template>

<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import AddButton from '~/components/elements/AddButton.vue';
import EditableHeader from '~/components/elements/EditableHeader.vue';

interface Props {
    title: string;
    isEmpty: boolean;
    emptyMessage: string;
    addButtonLabel: string;
    showAddButton?: boolean;
    editable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showAddButton: true,
    editable: true,
});

const _emit = defineEmits<{
    'add': [];
    'edit-title': [value: string];
}>();
</script>
