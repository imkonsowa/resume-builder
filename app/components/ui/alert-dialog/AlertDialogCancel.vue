<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {AlertDialogCancel, type AlertDialogCancelProps} from 'reka-ui';
    import {cn} from '~/lib/utils';
    import {buttonVariants} from '@/components/ui/button';

    const props = defineProps<AlertDialogCancelProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <AlertDialogCancel
        :class="cn(
            buttonVariants({ variant: 'outline' }),
            'mt-2 sm:mt-0',
            props.class,
        )"
        v-bind="delegatedProps"
    >
        <slot/>
    </AlertDialogCancel>
</template>
