<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {cn} from '~/lib/utils';

    const props = defineProps<{
        class?: HTMLAttributes['class']
    }>();
</script>

<template>
    <div
        :class="cn('px-6', props.class)"
        data-slot="card-content"
    >
        <slot/>
    </div>
</template>
