<script lang="ts" setup>
    import {MenubarSub, type MenubarSubEmits, useForwardPropsEmits} from 'reka-ui';

    interface MenubarSubRootProps {
        defaultOpen?: boolean
        open?: boolean
    }

    const props = defineProps<MenubarSubRootProps>();
    const emits = defineEmits<MenubarSubEmits>();

    const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
    <MenubarSub
        data-slot="menubar-sub"
        v-bind="forwarded"
    >
        <slot/>
    </MenubarSub>
</template>
