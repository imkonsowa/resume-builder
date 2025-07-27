<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {PaginationRoot, type PaginationRootEmits, type PaginationRootProps, useForwardPropsEmits} from 'reka-ui';
    import {cn} from '~/lib/utils';

    const props = defineProps<PaginationRootProps & {
        class?: HTMLAttributes['class']
    }>();
    const emits = defineEmits<PaginationRootEmits>();

    const delegatedProps = reactiveOmit(props, 'class');
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <PaginationRoot
        v-slot="slotProps"
        :class="cn('mx-auto flex w-full justify-center', props.class)"
        data-slot="pagination"
        v-bind="forwarded"
    >
        <slot v-bind="slotProps"/>
    </PaginationRoot>
</template>
