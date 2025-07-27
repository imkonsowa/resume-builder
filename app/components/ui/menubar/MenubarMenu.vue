<script lang="ts" setup>
    import {MenubarMenu, type MenubarMenuProps} from 'reka-ui';

    const props = defineProps<MenubarMenuProps>();
</script>

<template>
    <MenubarMenu
        data-slot="menubar-menu"
        v-bind="props"
    >
        <slot/>
    </MenubarMenu>
</template>
