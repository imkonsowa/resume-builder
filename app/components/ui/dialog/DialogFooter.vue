<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {cn} from '@/lib/utils';

    const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>

<template>
    <div
        :class="cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', props.class)"
        data-slot="dialog-footer"
    >
        <slot/>
    </div>
</template>
