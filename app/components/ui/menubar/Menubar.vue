<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {MenubarRoot, type MenubarRootEmits, type MenubarRootProps, useForwardPropsEmits} from 'reka-ui';
    import {cn} from '~/lib/utils';

    const props = defineProps<MenubarRootProps & { class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<MenubarRootEmits>();

    const delegatedProps = reactiveOmit(props, 'class');

    const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <MenubarRoot
        :class="
            cn(
                'bg-background flex h-9 items-center gap-1 rounded-md border p-1',
                props.class,
            )
        "
        data-slot="menubar"
        v-bind="forwarded"
    >
        <slot/>
    </MenubarRoot>
</template>
