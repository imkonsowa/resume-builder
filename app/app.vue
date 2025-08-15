<template>
    <div
        :dir="locale === 'ar' ? 'rtl' : 'ltr'"
        :class="{ 'rtl-mode': locale === 'ar' }"
    >
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();

// Watch for language changes to update document direction
watchEffect(() => {
    if (import.meta.client) {
        document.documentElement.dir = locale.value === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = locale.value;
    }
});
</script>
