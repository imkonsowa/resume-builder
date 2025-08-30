<script lang="ts" setup>
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Card, CardContent } from '~/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { ArrowRight, CheckCircle, HelpCircle } from 'lucide-vue-next';
import { createFAQStructuredData } from '~/composables/useSEO';

const faqs = [
    {
        question: 'Is the resume builder really free?',
        answer: 'Yes! Our resume builder is completely free with no hidden costs, no premium features, and no subscription fees. You can create unlimited resumes, download them as PDFs, and use all features without any charges. We believe creating a professional resume should always be accessible to everyone.',
    },
    {
        question: 'Do I need to create an account or sign up?',
        answer: 'No account creation is required! You can start building your resume immediately without any registration. All your data is stored locally in your browser by default. However, creating an account is only needed if you want to save your resumes in the cloud and access them from multiple browsers or devices.',
    },
    {
        question: 'How does the PDF export work?',
        answer: 'Our resume builder uses Typst, a modern typesetting system, to generate high-quality PDF documents. When you click "Download PDF," the system compiles your resume data into a professionally formatted PDF that\'s ready for printing or digital sharing.',
    },
    {
        question: 'Is my data secure and private?',
        answer: 'Absolutely! All your resume data is stored locally in your browser\'s storage. We don\'t collect, store, or transmit any of your personal information to external servers. Your data stays on your device and is completely under your control.',
    },
    {
        question: 'Can I use this on mobile devices?',
        answer: 'Yes! Our resume builder is fully responsive and works on all devices including smartphones and tablets. On mobile, you can access the preview through a floating button that opens a full-screen preview modal.',
    },
    {
        question: 'What is Raw Typst mode?',
        answer: 'Raw Typst mode allows advanced users to write Typst markup directly, giving you complete control over formatting and layout. This is perfect for users who want to customize their resume beyond what the form interface provides.',
    },
    {
        question: 'Can I import and export my resume data?',
        answer: 'Yes! You can export your resume data as a JSON file for backup purposes or to transfer between devices. You can also import previously exported data to restore your resume or work on it from another device.',
    },
    {
        question: 'What sections can I add to my resume?',
        answer: 'You can add multiple sections including Personal Information, Work Experience, Education, Skills, Volunteering, and Social Links. Each section supports multiple entries, and you can reorder sections to match your preferences.',
    },
    {
        question: 'How do I reorder sections or experiences?',
        answer: 'Use the Section Ordering panel to drag and drop sections into your preferred order. Within each section, you can also reorder individual entries and bullet points using the move up/down buttons.',
    },
    {
        question: 'Can I customize fonts and templates?',
        answer: 'Yes! You can choose from multiple font options including Roboto and Calibri. Template selection is also available to change the overall layout and styling of your resume.',
    },
    {
        question: 'What browsers are supported?',
        answer: 'Our resume builder works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser for the best experience.',
    },
    {
        question: 'How do I get help or report issues?',
        answer: 'You can visit our GitHub repository to report issues, request features, or contribute to the project. We also provide comprehensive documentation and examples to help you get started.',
    },
];
const faqCategories = [
    {
        title: 'Getting Started',
        icon: HelpCircle,
        faqs: faqs.slice(0, 4),
    },
    {
        title: 'Features & Functionality',
        icon: CheckCircle,
        faqs: faqs.slice(4, 8),
    },
    {
        title: 'Technical & Support',
        icon: HelpCircle,
        faqs: faqs.slice(8),
    },
];
useHead({
    title: 'Q&A - Free Resume Builder | Frequently Asked Questions & Help',
    meta: [
        {
            name: 'description',
            content: 'Get answers to common questions about our free resume builder. Learn about features, PDF export, privacy, Typst formatting, and how to create professional resumes online.',
        },
        {
            name: 'keywords',
            content: 'resume builder FAQ, free resume questions, PDF export help, Typst resume, privacy resume builder, resume builder help',
        },
        {
            name: 'robots',
            content: 'index, follow',
        },
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
            content: 'Q&A - Free Resume Builder | Frequently Asked Questions',
        },
        {
            property: 'og:description',
            content: 'Get answers to common questions about our free resume builder. Learn about features, PDF export, privacy, and more.',
        },
        {
            property: 'og:url',
            content: 'https://resumeforfree.com/qa',
        },
        {
            property: 'og:image',
            content: 'https://resumeforfree.com/og-image.png',
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: 'Q&A - Free Resume Builder | Frequently Asked Questions',
        },
        {
            name: 'twitter:description',
            content: 'Get answers to common questions about our free resume builder. Learn about features, PDF export, and privacy.',
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
        <div class="border-b bg-muted/40">
            <div class="container mx-auto px-4 py-16 text-center">
                <Badge
                    class="mb-4"
                    variant="secondary"
                >
                    Frequently Asked Questions
                </Badge>
                <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                    Get Your Questions
                    <span class="text-primary"> Answered</span>
                </h1>
                <p class="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Everything you need to know about our free resume builder.
                    From getting started to advanced features.
                </p>
            </div>
        </div>
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
        <div class="border-t bg-muted/40">
            <div class="container mx-auto px-4 py-16 text-center">
                <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Ready to Create Your Resume?
                </h2>
                <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Start building your professional resume now - it's completely free and takes just minutes!
                </p>
                <Button
                    as-child
                    class="h-12 px-8"
                    size="lg"
                >
                    <NuxtLink
                        class="inline-flex items-center gap-2"
                        to="/resumes"
                    >
                        Start Building
                        <ArrowRight class="h-4 w-4" />
                    </NuxtLink>
                </Button>
            </div>
        </div>
    </div>
</template>
