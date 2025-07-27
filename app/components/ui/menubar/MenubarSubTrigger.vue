<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {ChevronRight} from 'lucide-vue-next';
    import {MenubarSubTrigger, type MenubarSubTriggerProps, useForwardProps} from 'reka-ui';
    import {cn} from '~/lib/utils';

    const props = defineProps<MenubarSubTriggerProps & { class?: HTMLAttributes['class'], inset?: boolean }>();

    const delegatedProps = reactiveOmit(props, 'class', 'inset');
    const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <MenubarSubTrigger
        :class="cn(
            'focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[inset]:pl-8',
            props.class,
        )"
        :data-inset="inset ? '' : undefined"
        data-slot="menubar-sub-trigger"
        v-bind="forwardedProps"
    >
        <slot/>
        <ChevronRight class="ml-auto size-4"/>
    </MenubarSubTrigger>
</template>
