<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {DialogTitle, type DialogTitleProps, useForwardProps} from 'reka-ui';
    import {cn} from '@/lib/utils';

    const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = reactiveOmit(props, 'class');

    const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <DialogTitle
        :class="cn('text-lg leading-none font-semibold', props.class)"
        data-slot="dialog-title"
        v-bind="forwardedProps"
    >
        <slot/>
    </DialogTitle>
</template>
