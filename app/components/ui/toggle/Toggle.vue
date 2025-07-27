<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits} from 'reka-ui';
    import {cn} from '~/lib/utils';
    import {type ToggleVariants, toggleVariants} from './index';

    const props = withDefaults(defineProps<ToggleProps & {
        class?: HTMLAttributes['class']
        variant?: ToggleVariants['variant']
        size?: ToggleVariants['size']
    }>(), {
        variant: 'default',
        size: 'default',
        disabled: false
    });

    const emits = defineEmits<ToggleEmits>();

    const delegatedProps = reactiveOmit(props, 'class', 'size', 'variant');
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <Toggle
        v-slot="slotProps"
        :class="cn(toggleVariants({ variant, size }), props.class)"
        data-slot="toggle"
        v-bind="forwarded"
    >
        <slot v-bind="slotProps"/>
    </Toggle>
</template>
