<script lang="ts" setup>
    import type {PaginationFirstProps} from 'reka-ui';
    import {PaginationFirst, useForwardProps} from 'reka-ui';
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {ChevronLeftIcon} from 'lucide-vue-next';
    import {cn} from '~/lib/utils';
    import {buttonVariants, type ButtonVariants} from '@/components/ui/button';

    const props = withDefaults(defineProps<PaginationFirstProps & {
        size?: ButtonVariants['size']
        class?: HTMLAttributes['class']
    }>(), {
        size: 'default'
    });

    const delegatedProps = reactiveOmit(props, 'class', 'size');
    const forwarded = useForwardProps(delegatedProps);
</script>

<template>
    <PaginationFirst
        :class="cn(buttonVariants({ variant: 'ghost', size }), 'gap-1 px-2.5 sm:pr-2.5', props.class)"
        data-slot="pagination-first"
        v-bind="forwarded"
    >
        <slot>
            <ChevronLeftIcon/>
            <span class="hidden sm:block">First</span>
        </slot>
    </PaginationFirst>
</template>
