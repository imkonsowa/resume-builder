<script lang="ts" setup>
    import type {StepperItemProps} from 'reka-ui';
    import {StepperItem, useForwardProps} from 'reka-ui';
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {cn} from '@/lib/utils';

    const props = defineProps<StepperItemProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = reactiveOmit(props, 'class');

    const forwarded = useForwardProps(delegatedProps);
</script>

<template>
    <StepperItem
        v-slot="slotProps"
        :class="cn('flex items-center gap-2 group data-[disabled]:pointer-events-none', props.class)"
        v-bind="forwarded"
    >
        <slot v-bind="slotProps"/>
    </StepperItem>
</template>
