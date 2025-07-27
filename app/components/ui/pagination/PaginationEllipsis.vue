<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {MoreHorizontal} from 'lucide-vue-next';
    import {PaginationEllipsis, type PaginationEllipsisProps} from 'reka-ui';
    import {cn} from '~/lib/utils';

    const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <PaginationEllipsis
        :class="cn('flex size-9 items-center justify-center', props.class)"
        data-slot="pagination-ellipsis"
        v-bind="delegatedProps"
    >
        <slot>
            <MoreHorizontal class="size-4"/>
            <span class="sr-only">More pages</span>
        </slot>
    </PaginationEllipsis>
</template>
