<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {PaginationListItem, type PaginationListItemProps} from 'reka-ui';
    import {cn} from '~/lib/utils';
    import {buttonVariants, type ButtonVariants} from '@/components/ui/button';

    const props = withDefaults(defineProps<PaginationListItemProps & {
        size?: ButtonVariants['size']
        class?: HTMLAttributes['class']
        isActive?: boolean
    }>(), {
        size: 'icon'
    });

    const delegatedProps = reactiveOmit(props, 'class', 'size', 'isActive');
</script>

<template>
    <PaginationListItem
        :class="cn(
            buttonVariants({
                variant: isActive ? 'outline' : 'ghost',
                size,
            }),
            props.class)"
        data-slot="pagination-item"
        v-bind="delegatedProps"
    >
        <slot/>
    </PaginationListItem>
</template>
