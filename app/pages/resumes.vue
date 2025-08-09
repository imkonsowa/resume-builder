<script lang="ts" setup>
import ConfirmationModal from '~/components/elements/ConfirmationModal.vue';
import CreateResumeModal from '~/components/elements/CreateResumeModal.vue';
import CopyResumeModal from '~/components/elements/CopyResumeModal.vue';
import ExportModal from '~/components/elements/ExportModal.vue';
import ImportConfirmationModal from '~/components/elements/ImportConfirmationModal.vue';
import ResumesHeader from '~/components/resumes/ResumesHeader.vue';
import ResumesGrid from '~/components/resumes/ResumesGrid.vue';
import ResumesEmptyState from '~/components/resumes/ResumesEmptyState.vue';
import type { ImportResumePreview } from '~/components/elements/ImportConfirmationModal.vue';
import type { Resume } from '~/types/resume';

const resumeStore = useResumeStore();
const router = useRouter();
const confirmation = useConfirmation();
const { exportResumes, exportSingleResume, parseImportFile, importSelectedResumes } = useResumeImportExport();

// Search functionality
const searchQuery = ref('');

// Get all resumes with search filtering
const resumes = computed(() => {
    const allResumes = resumeStore.resumesList;
    if (!searchQuery.value.trim()) {
        return allResumes;
    }

    const query = searchQuery.value.toLowerCase().trim();
    return allResumes.filter(resume =>
        resume.name.toLowerCase().includes(query),
    );
});

const resumeCount = computed(() => resumeStore.resumeCount);
const filteredCount = computed(() => resumes.value.length);

// Create modal state
const showCreateModal = ref(false);

// Copy modal state
const showCopyModal = ref(false);
const resumeToCopy = ref<Resume | null>(null);

// Export modal state
const showExportModal = ref(false);

// Import modal state
const showImportModal = ref(false);
const importPreviews = ref<ImportResumePreview[]>([]);

// Import file input ref
const importInputRef = ref<HTMLInputElement>();

const createNewResume = () => {
    showCreateModal.value = true;
};

// Handle create resume confirmation
const handleCreateResume = (name: string, navigateToBuilder: boolean) => {
    const resumeName = name.trim() || 'Untitled Resume';
    const newResumeId = resumeStore.createResume(resumeName);
    resumeStore.setActiveResume(newResumeId);
    showCreateModal.value = false;

    if (navigateToBuilder) {
        router.push('/builder');
    }
};

// Edit resume
const editResume = (id: string) => {
    resumeStore.setActiveResume(id);
    router.push('/builder');
};

// Show copy modal
const showCopyResumeModal = (id: string) => {
    const resume = resumeStore.resumesList.find(r => r.id === id);
    if (resume) {
        resumeToCopy.value = resume;
        showCopyModal.value = true;
    }
};

// Handle copy resume confirmation
const handleCopyResume = (name: string, navigateToBuilder: boolean) => {
    if (resumeToCopy.value) {
        const resumeName = name.trim() || 'Untitled Resume';
        const newResumeId = resumeStore.duplicateResume(resumeToCopy.value.id, resumeName);
        if (newResumeId) {
            resumeStore.setActiveResume(newResumeId);
            showCopyModal.value = false;
            resumeToCopy.value = null;

            if (navigateToBuilder) {
                router.push('/builder');
            }
        }
    }
};

// Delete resume
const deleteResume = async (id: string) => {
    const resume = resumeStore.resumesList.find(r => r.id === id);
    const resumeName = resume?.name || 'this resume';

    const confirmed = await confirmation.confirm({
        title: 'Delete Resume',
        message: `Are you sure you want to delete "${resumeName}"? This action cannot be undone.`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
    });

    if (confirmed) {
        resumeStore.deleteResume(id);
    }
};

// Clear search
const clearSearch = () => {
    searchQuery.value = '';
};

// Trigger import file dialog
const triggerImport = () => {
    importInputRef.value?.click();
};

// Handle export modal
const handleExportModal = () => {
    showExportModal.value = true;
};

// Handle export
const handleExport = (resumeIds: string[]) => {
    exportResumes(resumeIds);
    showExportModal.value = false;
};

// Handle file selection
const handleFileSelect = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const result = await parseImportFile(file);

    if (result.success && result.previews) {
        importPreviews.value = result.previews;
        showImportModal.value = true;
    }
    else {
        // Show error message
        console.error('Failed to parse file:', result.error);
    }

    // Clear the input
    input.value = '';
};

// Handle import confirmation
const handleImportConfirm = (selectedIndexes: number[]) => {
    const importedCount = importSelectedResumes(importPreviews.value, selectedIndexes);
    console.log(`Successfully imported ${importedCount} resume${importedCount !== 1 ? 's' : ''}`);
    showImportModal.value = false;
    importPreviews.value = [];
};

useHead({
    title: 'Your Resumes - Manage Multiple Professional Resumes | Free Resume Builder',
    meta: [
        {
            name: 'description',
            content: 'Manage unlimited resumes in one place. Create, edit, duplicate, and organize professional resumes for free. No storage limits, complete privacy.',
        },
        {
            name: 'keywords',
            content: 'resume management, multiple resumes, organize resumes, duplicate resume, resume dashboard, free resume storage',
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
            content: 'Your Resumes - Manage Multiple Professional Resumes',
        },
        {
            property: 'og:description',
            content: 'Manage unlimited resumes in one place. Create, edit, duplicate, and organize professional resumes for free.',
        },
        {
            property: 'og:url',
            content: 'https://resumeforfree.com/resumes',
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
            content: 'Your Resumes - Manage Multiple Professional Resumes',
        },
        {
            name: 'twitter:description',
            content: 'Manage unlimited resumes in one place. Create, edit, duplicate, and organize professional resumes for free.',
        },
        {
            name: 'twitter:image',
            content: 'https://resumeforfree.com/og-image.png',
        },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://resumeforfree.com/resumes',
        },
    ],
});
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Header Component -->
        <ResumesHeader
            v-model:search-query="searchQuery"
            :resume-count="resumeCount"
            :filtered-count="filteredCount"
            @import="triggerImport"
            @export="handleExportModal"
            @create="createNewResume"
        />

        <ClientOnly>
            <!-- Empty States -->
            <ResumesEmptyState
                v-if="resumeCount === 0"
                type="no-resumes"
                @create="createNewResume"
            />

            <ResumesEmptyState
                v-else-if="filteredCount === 0 && searchQuery"
                type="no-search-results"
                :search-query="searchQuery"
                @create="createNewResume"
                @clear-search="clearSearch"
            />

            <!-- Resumes Grid -->
            <ResumesGrid
                v-else
                :resumes="resumes"
                :active-resume-id="resumeStore.activeResumeId"
                @edit="editResume"
                @copy="showCopyResumeModal"
                @export="exportSingleResume"
                @delete="deleteResume"
            />

            <CreateResumeModal
                :is-open="showCreateModal"
                @close="showCreateModal = false"
                @confirm="handleCreateResume"
            />

            <CopyResumeModal
                :is-open="showCopyModal"
                :resume-name="resumeToCopy ? `${resumeToCopy.name} (Copy)` : ''"
                @close="showCopyModal = false; resumeToCopy = null"
                @confirm="handleCopyResume"
            />

            <ExportModal
                :is-open="showExportModal"
                :resumes="resumes"
                @close="showExportModal = false"
                @export="handleExport"
            />

            <ImportConfirmationModal
                :is-open="showImportModal"
                :resumes-to-import="importPreviews"
                @close="showImportModal = false; importPreviews = []"
                @import="handleImportConfirm"
            />

            <ConfirmationModal
                :cancel-text="confirmation.cancelText.value"
                :confirm-text="confirmation.confirmText.value"
                :is-open="confirmation.isOpen.value"
                :message="confirmation.message.value"
                :title="confirmation.title.value"
                @cancel="confirmation.handleCancel"
                @confirm="confirmation.handleConfirm"
            />

            <input
                ref="importInputRef"
                accept=".json"
                class="hidden"
                type="file"
                @change="handleFileSelect"
            >
        </ClientOnly>
    </div>
</template>
