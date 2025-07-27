<script lang="ts" setup>
    import type {FieldProps} from './interface';
    import {FormControl, FormDescription, FormField, FormItem, FormMessage} from '@/components/ui/form';
    import {Input} from '@/components/ui/input';
    import AutoFormLabel from './AutoFormLabel.vue';
    import {beautifyObjectName} from './utils';

    defineProps<FieldProps>();

    defineOptions({
        inheritAttrs: false
    });

</script>

<template>
    <FormField v-slot="slotProps" :name="fieldName">
        <FormItem>
            <AutoFormLabel v-if="!config?.hideLabel" :required="required">
                {{ config?.label || beautifyObjectName(label ?? fieldName) }}
            </AutoFormLabel>
            <FormControl>
                <slot v-bind="slotProps">
                    <Input
                        :disabled="config?.inputProps?.disabled ?? disabled" type="number"
                        v-bind="{ ...slotProps.componentField, ...config?.inputProps }"/>
                </slot>
            </FormControl>
            <FormDescription v-if="config?.description">
                {{ config.description }}
            </FormDescription>
            <FormMessage/>
        </FormItem>
    </FormField>
</template>
