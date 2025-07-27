<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {AccordionItem, type AccordionItemProps, useForwardProps} from 'reka-ui';
    import {cn} from '~/lib/utils';

    const props = defineProps<AccordionItemProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = reactiveOmit(props, 'class');

    const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <AccordionItem
        :class="cn('border-b last:border-b-0', props.class)"
        data-slot="accordion-item"
        v-bind="forwardedProps"
    >
        <slot/>
    </AccordionItem>
</template>
