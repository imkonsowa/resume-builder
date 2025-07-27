<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {PaginationList, type PaginationListProps} from 'reka-ui';
    import {cn} from '~/lib/utils';

    const props = defineProps<PaginationListProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <PaginationList
        v-slot="slotProps"
        :class="cn('flex flex-row items-center gap-1', props.class)"
        data-slot="pagination-content"
        v-bind="delegatedProps"
    >
        <slot v-bind="slotProps"/>
    </PaginationList>
</template>
