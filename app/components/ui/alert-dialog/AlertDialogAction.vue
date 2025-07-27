<script lang="ts" setup>
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {AlertDialogAction, type AlertDialogActionProps} from 'reka-ui';
    import {cn} from '~/lib/utils';
    import {buttonVariants} from '@/components/ui/button';

    const props = defineProps<AlertDialogActionProps & { class?: HTMLAttributes['class'] }>();

    const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
    <AlertDialogAction :class="cn(buttonVariants(), props.class)" v-bind="delegatedProps">
        <slot/>
    </AlertDialogAction>
</template>
