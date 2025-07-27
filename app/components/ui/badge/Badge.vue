<script lang="ts" setup>
    import type {PrimitiveProps} from 'reka-ui';
    import {Primitive} from 'reka-ui';
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {cn} from '~/lib/utils';
    import {type BadgeVariants, badgeVariants} from './index';

    const props = defineProps<PrimitiveProps & {
        variant?: BadgeVariants['variant']
        class?: HTMLAttributes['class']
    }>();

    const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <Primitive
        :class="cn(badgeVariants({ variant }), props.class)"
        data-slot="badge"
        v-bind="delegatedProps"
    >
        <slot/>
    </Primitive>
</template>
