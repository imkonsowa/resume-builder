<script lang="ts" setup>
    import {MenubarGroup, type MenubarGroupProps} from 'reka-ui';

    const props = defineProps<MenubarGroupProps>();
</script>

<template>
    <MenubarGroup
        data-slot="menubar-group"
        v-bind="props"
    >
        <slot/>
    </MenubarGroup>
</template>
