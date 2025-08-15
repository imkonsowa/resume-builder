<script lang="ts" setup>
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { ArrowRight, CheckCircle, HelpCircle } from 'lucide-vue-next';
import { createFAQStructuredData } from '~/composables/useSEO';

const { t } = useI18n();

// Build FAQ data from translations
const faqs = [
    {
        question: t('qa.questions.isFree.question'),
        answer: t('qa.questions.isFree.answer'),
    },
    {
        question: t('qa.questions.signUp.question'),
        answer: t('qa.questions.signUp.answer'),
    },
    {
        question: t('qa.questions.pdfExport.question'),
        answer: t('qa.questions.pdfExport.answer'),
    },
    {
        question: t('qa.questions.privacy.question'),
        answer: t('qa.questions.privacy.answer'),
    },
    {
        question: t('qa.questions.mobile.question'),
        answer: t('qa.questions.mobile.answer'),
    },
    {
        question: t('qa.questions.rawMode.question'),
        answer: t('qa.questions.rawMode.answer'),
    },
    {
        question: t('qa.questions.importExport.question'),
        answer: t('qa.questions.importExport.answer'),
    },
    {
        question: t('qa.questions.sections.question'),
        answer: t('qa.questions.sections.answer'),
    },
    {
        question: t('qa.questions.reorder.question'),
        answer: t('qa.questions.reorder.answer'),
    },
    {
        question: t('qa.questions.customize.question'),
        answer: t('qa.questions.customize.answer'),
    },
    {
        question: t('qa.questions.browsers.question'),
        answer: t('qa.questions.browsers.answer'),
    },
    {
        question: t('qa.questions.support.question'),
        answer: t('qa.questions.support.answer'),
    },
];

const faqCategories = [
    {
        title: t('qa.categories.gettingStarted'),
        icon: HelpCircle,
        faqs: faqs.slice(0, 4),
    },
    {
        title: t('qa.categories.features'),
        icon: CheckCircle,
        faqs: faqs.slice(4, 8),
    },
    {
        title: t('qa.categories.technical'),
        icon: HelpCircle,
        faqs: faqs.slice(8),
    },
];

useHead({
    title: `${t('qa.title')} ${t('qa.titleHighlight')} - ${t('navigation.qa')}`,
    meta: [
        {
            name: 'description',
            content: t('qa.subtitle'),
        },
        {
            name: 'keywords',
            content: 'resume builder FAQ, free resume questions, PDF export help, Typst resume, privacy resume builder, resume builder help',
        },
        {
            name: 'robots',
            content: 'index, follow',
        },
        // Open Graph tags
        {
            property: 'og:type',
            content: 'website',
        },
        {
            property: 'og:site_name',
            content: 'Free Resume Builder',
        },
        {
            property: 'og:title',
            content: `${t('qa.title')} ${t('qa.titleHighlight')} - ${t('navigation.qa')}`,
        },
        {
            property: 'og:description',
            content: t('qa.subtitle'),
        },
        {
            property: 'og:url',
            content: 'https://resumeforfree.com/qa',
        },
        {
            property: 'og:image',
            content: 'https://resumeforfree.com/og-image.png',
        },
        // Twitter Card tags
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: `${t('qa.title')} ${t('qa.titleHighlight')} - ${t('navigation.qa')}`,
        },
        {
            name: 'twitter:description',
            content: t('qa.subtitle'),
        },
        {
            name: 'twitter:image',
            content: 'https://resumeforfree.com/og-image.png',
        },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://resumeforfree.com/qa',
        },
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify(createFAQStructuredData(faqs)),
        },
    ],
});
</script>

<template>
    <div class="min-h-screen bg-background">
        <!-- Hero Section -->
        <div class="border-b bg-muted/40">
            <div class="container mx-auto px-4 py-16 text-center">
                <Badge
                    class="mb-4"
                    variant="secondary"
                >
                    {{ t('qa.badge') }}
                </Badge>
                <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                    {{ t('qa.title') }}
                    <span class="text-primary"> {{ t('qa.titleHighlight') }}</span>
                </h1>
                <p class="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    {{ t('qa.subtitle') }}
                </p>
            </div>
        </div>

        <!-- FAQ Section -->
        <div class="container mx-auto px-4 py-16">
            <div class="space-y-12">
                <div
                    v-for="category in faqCategories"
                    :key="category.title"
                >
                    <div class="flex items-center gap-3 mb-6">
                        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <component
                                :is="category.icon"
                                class="h-5 w-5 text-primary"
                            />
                        </div>
                        <h2 class="text-2xl font-semibold tracking-tight">
                            {{ category.title }}
                        </h2>
                    </div>

                    <Card>
                        <CardContent class="p-6">
                            <Accordion
                                class="w-full"
                                collapsible
                                type="single"
                            >
                                <AccordionItem
                                    v-for="(faq, index) in category.faqs"
                                    :key="index"
                                    :value="`item-${category.title}-${index}`"
                                    class="border-b last:border-b-0"
                                >
                                    <AccordionTrigger class="text-left hover:no-underline">
                                        <span class="font-medium">{{ faq.question }}</span>
                                    </AccordionTrigger>
                                    <AccordionContent class="text-muted-foreground leading-relaxed">
                                        {{ faq.answer }}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

        <!-- CTA Section -->
        <div class="border-t bg-muted/40">
            <div class="container mx-auto px-4 py-16 text-center">
                <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    {{ t('qa.ctaTitle') }}
                </h2>
                <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    {{ t('qa.ctaSubtitle') }}
                </p>
                <Button
                    as-child
                    class="h-12 px-8"
                    size="lg"
                >
                    <NuxtLink
                        class="inline-flex items-center gap-2"
                        to="/builder"
                    >
                        {{ t('common.startBuilding') }}
                        <ArrowRight class="h-4 w-4" />
                    </NuxtLink>
                </Button>
            </div>
        </div>
    </div>
</template>
