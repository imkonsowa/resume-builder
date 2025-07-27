<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {AvatarFallback, type AvatarFallbackProps} from 'reka-ui';
    import {cn} from '~/lib/utils';

    const props = defineProps<AvatarFallbackProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <AvatarFallback
        :class="cn('bg-muted flex size-full items-center justify-center rounded-full', props.class)"
        data-slot="avatar-fallback"
        v-bind="delegatedProps"
    >
        <slot/>
    </AvatarFallback>
</template>
