<script lang="ts" setup>
    import type {AvatarImageProps} from 'reka-ui';
    import {AvatarImage} from 'reka-ui';

    const props = defineProps<AvatarImageProps>();
</script>

<template>
    <AvatarImage
        class="aspect-square size-full"
        data-slot="avatar-image"
        v-bind="props"
    >
        <slot/>
    </AvatarImage>
</template>
