<script lang="ts" setup>
    import type {SliderRootEmits, SliderRootProps} from 'reka-ui';
    import {SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits} from 'reka-ui';
    import type {HTMLAttributes} from 'vue';
    import {reactiveOmit} from '@vueuse/core';
    import {cn} from '@/lib/utils';

    const props = defineProps<SliderRootProps & { class?: HTMLAttributes['class'] }>();
    const emits = defineEmits<SliderRootEmits>();

    const delegatedProps = reactiveOmit(props, 'class');

    const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <SliderRoot
        v-slot="{ modelValue }"
        :class="cn(
            'relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
            props.class,
        )"
        data-slot="slider"
        v-bind="forwarded"
    >
        <SliderTrack
            class="bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            data-slot="slider-track"
        >
            <SliderRange
                class="bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                data-slot="slider-range"
            />
        </SliderTrack>

        <SliderThumb
            v-for="(_, key) in modelValue"
            :key="key"
            class="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
            data-slot="slider-thumb"
        />
    </SliderRoot>
</template>
