<script lang="ts" setup>
    import {ErrorMessage} from 'vee-validate';
    import {type HTMLAttributes, toValue} from 'vue';
    import {cn} from '~/lib/utils';
    import {useFormField} from './useFormField';

    const props = defineProps<{
        class?: HTMLAttributes['class']
    }>();

    const {name, formMessageId} = useFormField();
</script>

<template>
    <ErrorMessage
        :id="formMessageId"
        :class="cn('text-destructive-foreground text-sm', props.class)"
        :name="toValue(name)"
        as="p"
        data-slot="form-message"
    />
</template>
