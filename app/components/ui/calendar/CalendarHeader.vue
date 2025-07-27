<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {CalendarHeader, type CalendarHeaderProps, useForwardProps} from 'reka-ui';
    import {cn} from '~/lib/utils';

    const props = defineProps<CalendarHeaderProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = reactiveOmit(props, 'class');

    const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <CalendarHeader
        :class="cn('flex justify-center pt-1 relative items-center w-full', props.class)"
        data-slot="calendar-header"
        v-bind="forwardedProps"
    >
        <slot/>
    </CalendarHeader>
</template>
