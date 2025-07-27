<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {cn} from '~/lib/utils';

    const props = defineProps<{
        class?: HTMLAttributes['class']
    }>();
</script>

<template>
    <div
        :class="
            cn(
                'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6',
                props.class,
            )
        "
        data-slot="card"
    >
        <slot/>
    </div>
</template>
