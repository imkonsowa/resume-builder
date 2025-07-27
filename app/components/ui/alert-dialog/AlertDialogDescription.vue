<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {AlertDialogDescription, type AlertDialogDescriptionProps} from 'reka-ui';
    import {cn} from '~/lib/utils';

    const props = defineProps<AlertDialogDescriptionProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <AlertDialogDescription
        :class="cn('text-muted-foreground text-sm', props.class)"
        data-slot="alert-dialog-description"
        v-bind="delegatedProps"
    >
        <slot/>
    </AlertDialogDescription>
</template>
