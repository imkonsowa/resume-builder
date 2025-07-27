<script lang="ts" setup>
    import type {StepperDescriptionProps} from 'reka-ui';
    import {StepperDescription, useForwardProps} from 'reka-ui';
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {cn} from '@/lib/utils';

    const props = defineProps<StepperDescriptionProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = reactiveOmit(props, 'class');

    const forwarded = useForwardProps(delegatedProps);
</script>

<template>
    <StepperDescription v-slot="slotProps" :class="cn('text-xs text-muted-foreground', props.class)" v-bind="forwarded">
        <slot v-bind="slotProps"/>
    </StepperDescription>
</template>
