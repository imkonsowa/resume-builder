<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {ProgressIndicator, ProgressRoot, type ProgressRootProps} from 'reka-ui';
    import {cn} from '~/lib/utils';

    const props = withDefaults(
        defineProps<ProgressRootProps & { class?: HTMLAttributes['class'] }>(),
        {
            modelValue: 0
        }
    );

    const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <ProgressRoot
        :class="
            cn(
                'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
                props.class,
            )
        "
        data-slot="progress"
        v-bind="delegatedProps"
    >
        <ProgressIndicator
            :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
            class="bg-primary h-full w-full flex-1 transition-all"
            data-slot="progress-indicator"
        />
    </ProgressRoot>
</template>
