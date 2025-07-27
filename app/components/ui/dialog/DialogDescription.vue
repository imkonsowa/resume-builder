<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {DialogDescription, type DialogDescriptionProps, useForwardProps} from 'reka-ui';
    import {cn} from '@/lib/utils';

    const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = reactiveOmit(props, 'class');

    const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <DialogDescription
        :class="cn('text-muted-foreground text-sm', props.class)"
        data-slot="dialog-description"
        v-bind="forwardedProps"
    >
        <slot/>
    </DialogDescription>
</template>
