<script lang="ts" setup>
    import type {LabelProps} from 'reka-ui';
    import type {HTMLAttributes} from 'vue';
    import {cn} from '~/lib/utils';
    import {Label} from '@/components/ui/label';
    import {useFormField} from './useFormField';

    const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>();

    const {error, formItemId} = useFormField();
</script>

<template>
    <Label
        :class="cn(
            'data-[error=true]:text-destructive-foreground',
            props.class,
        )"
        :data-error="!!error"
        :for="formItemId"
        data-slot="form-label"
    >
        <slot/>
    </Label>
</template>
