<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {SelectSeparator, type SelectSeparatorProps} from 'reka-ui';
    import {cn} from '~/lib/utils';

    const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <SelectSeparator
        :class="cn('bg-border pointer-events-none -mx-1 my-1 h-px', props.class)"
        data-slot="select-separator"
        v-bind="delegatedProps"
    />
</template>
