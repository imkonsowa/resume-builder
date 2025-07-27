<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {cn} from '~/lib/utils';

    const props = defineProps<{
        class?: HTMLAttributes['class']
    }>();
</script>

<template>
    <h3
        :class="cn('leading-none font-semibold', props.class)"
        data-slot="card-title"
    >
        <slot/>
    </h3>
</template>
