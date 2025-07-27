<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {ChevronUp} from 'lucide-vue-next';
    import {SelectScrollUpButton, type SelectScrollUpButtonProps, useForwardProps} from 'reka-ui';
    import {cn} from '~/lib/utils';

    const props = defineProps<SelectScrollUpButtonProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = reactiveOmit(props, 'class');

    const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <SelectScrollUpButton
        :class="cn('flex cursor-default items-center justify-center py-1', props.class)"
        data-slot="select-scroll-up-button"
        v-bind="forwardedProps"
    >
        <slot>
            <ChevronUp class="size-4"/>
        </slot>
    </SelectScrollUpButton>
</template>
