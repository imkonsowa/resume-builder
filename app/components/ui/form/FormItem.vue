<script lang="ts" setup>
    import {useId} from 'reka-ui';
    import {type HTMLAttributes, provide} from 'vue';
    import {cn} from '~/lib/utils';
    import {FORM_ITEM_INJECTION_KEY} from './injectionKeys';

    const props = defineProps<{
        class?: HTMLAttributes['class']
    }>();

    const id = useId();
    provide(FORM_ITEM_INJECTION_KEY, id);
</script>

<template>
    <div
        :class="cn('grid gap-2', props.class)"
        data-slot="form-item"
    >
        <slot/>
    </div>
</template>
