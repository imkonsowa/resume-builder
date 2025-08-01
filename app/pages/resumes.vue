<script lang="ts" setup>
    import {Button} from '~/components/ui/button';
    import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/card';
    import {Badge} from '~/components/ui/badge';
    import {Input} from '~/components/ui/input';
    import {
        Calendar,
        Check,
        Copy,
        Download,
        Edit,
        FileText,
        PencilIcon,
        Plus,
        Search,
        Trash2,
        Upload,
        X
    } from 'lucide-vue-next';
    import ConfirmationModal from '~/components/elements/ConfirmationModal.vue';
    import CreateResumeModal from '~/components/elements/CreateResumeModal.vue';
    import CopyResumeModal from '~/components/elements/CopyResumeModal.vue';
    import ExportModal from '~/components/elements/ExportModal.vue';
    import type {ImportResumePreview} from '~/components/elements/ImportConfirmationModal.vue';
    import ImportConfirmationModal from '~/components/elements/ImportConfirmationModal.vue';
    import type {Resume} from '~/types/resume';

    const resumeStore = useResumeStore();
    const router = useRouter();
    const confirmation = useConfirmation();
    const {exportResumes, exportSingleResume, parseImportFile, importSelectedResumes} = useResumeImportExport();

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

    // Resume name editing
    const editingResumeId = ref<string | null>(null);
    const editingResumeName = ref('');

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

    // Start editing resume name
    const startEditingName = (resume: Resume) => {
        editingResumeId.value = resume.id;
        editingResumeName.value = resume.name;
    };

    // Save resume name
    const saveResumeName = () => {
        if (editingResumeId.value && editingResumeName.value.trim()) {
            resumeStore.renameResume(editingResumeId.value, editingResumeName.value.trim());
        }
        editingResumeId.value = null;
        editingResumeName.value = '';
    };

    // Cancel editing
    const cancelEditing = () => {
        editingResumeId.value = null;
        editingResumeName.value = '';
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
        } else {
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

    // Trigger import file dialog
    const triggerImport = () => {
        importInputRef.value?.click();
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Get resume preview info
    const getResumePreview = (resume: Resume) => {
        const data = resume.data;
        const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ');
        const position = data.position || 'No position specified';
        const sections = [];

        if (data.experiences?.length) sections.push(`${data.experiences.length} experience${data.experiences.length > 1 ? 's' : ''}`);
        if (data.education?.length) sections.push(`${data.education.length} education${data.education.length > 1 ? 's' : ''}`);
        if (data.skills?.length) sections.push(`${data.skills.length} skill${data.skills.length > 1 ? 's' : ''}`);

        return {
            fullName: fullName || 'No name specified',
            position,
            sections: sections.join(', ') || 'No sections added',
        };
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
        <!-- Header -->
        <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">
                    Your Resumes
                </h1>
                <p class="text-gray-600 mt-2">
                    <span v-if="searchQuery && filteredCount !== resumeCount">
                        {{ filteredCount }} of {{ resumeCount }} resume{{ resumeCount !== 1 ? 's' : '' }}
                    </span>
                    <span v-else>
                        {{ resumeCount }} resume{{ resumeCount !== 1 ? 's' : '' }} total
                    </span>
                </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
                <!-- Search Box -->
                <div class="relative">
                    <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"/>
                    <Input
                        v-model="searchQuery"
                        class="pl-10 w-full sm:w-64"
                        placeholder="Search resumes..."
                    />
                </div>

                <div class="flex gap-2">
                    <Button
                        class="flex items-center gap-2"
                        variant="outline"
                        @click="triggerImport"
                    >
                        <Upload class="w-4 h-4"/>
                        Import
                    </Button>
                    <Button
                        v-if="resumeCount > 0"
                        class="flex items-center gap-2"
                        variant="outline"
                        @click="showExportModal = true"
                    >
                        <Download class="w-4 h-4"/>
                        Export
                    </Button>
                    <Button
                        class="flex items-center gap-2"
                        @click="createNewResume"
                    >
                        <Plus class="w-4 h-4"/>
                        Create New Resume
                    </Button>
                </div>
            </div>
        </div>

        <ClientOnly>
            <!-- Empty State -->
            <div
                v-if="resumeCount === 0"
                class="text-center py-16"
            >
                <FileText class="w-24 h-24 text-gray-300 mx-auto mb-4"/>
                <h2 class="text-2xl font-semibold text-gray-900 mb-2">
                    No resumes yet
                </h2>
                <p class="text-gray-600 mb-6">
                    Create your first resume to get started
                </p>
                <Button
                    size="lg"
                    @click="createNewResume"
                >
                    Create Your First Resume
                </Button>
            </div>

            <!-- No Search Results -->
            <div
                v-else-if="filteredCount === 0 && searchQuery"
                class="text-center py-16"
            >
                <Search class="w-24 h-24 text-gray-300 mx-auto mb-4"/>
                <h2 class="text-2xl font-semibold text-gray-900 mb-2">
                    No resumes found
                </h2>
                <p class="text-gray-600 mb-6">
                    No resumes match your search for "{{ searchQuery }}"
                </p>
                <div class="flex gap-3 justify-center">
                    <Button
                        variant="outline"
                        @click="searchQuery = ''"
                    >
                        Clear Search
                    </Button>
                    <Button @click="createNewResume">
                        Create New Resume
                    </Button>
                </div>
            </div>

            <!-- Resumes Grid -->
            <div
                v-else
                class="resumes-grid"
            >
                <Card
                    v-for="resume in resumes"
                    :key="resume.id"
                    :class="{ 'ring-2 ring-blue-500': resumeStore.activeResumeId === resume.id }"
                    class="hover:shadow-lg transition-shadow relative"
                >
                    <!-- Active Resume Badge -->
                    <Badge
                        v-if="resumeStore.activeResumeId === resume.id"
                        class="absolute top-4 right-4 bg-blue-500 text-white"
                    >
                        Active
                    </Badge>

                    <CardHeader class="pb-4">
                        <div
                            v-if="editingResumeId === resume.id"
                            class="flex items-center gap-2 pr-16"
                        >
                            <input
                                v-model="editingResumeName"
                                autofocus
                                class="flex-1 px-2 py-1 border rounded text-xl font-semibold"
                                @keyup.enter="saveResumeName"
                                @keyup.escape="cancelEditing"
                            >
                            <button
                                class="p-1 text-green-600 hover:text-green-700"
                                @click="saveResumeName"
                            >
                                <Check class="w-4 h-4"/>
                            </button>
                            <button
                                class="p-1 text-red-600 hover:text-red-700"
                                @click="cancelEditing"
                            >
                                <X class="w-4 h-4"/>
                            </button>
                        </div>
                        <div
                            v-else
                            class="flex items-center gap-2 pr-16"
                        >
                            <CardTitle class="text-xl font-semibold truncate flex-1">
                                {{ resume.name }}
                            </CardTitle>
                            <button
                                class="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                                title="Edit resume name"
                                @click="startEditingName(resume)"
                            >
                                <PencilIcon class="w-4 h-4"/>
                            </button>
                        </div>
                        <div class="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar class="w-4 h-4"/>
                            <span>Updated {{ formatDate(resume.updatedAt) }}</span>
                        </div>
                    </CardHeader>

                    <CardContent class="pt-0">
                        <div class="space-y-2 mb-4">
                            <p class="font-medium text-gray-900">
                                {{ getResumePreview(resume).fullName }}
                            </p>
                            <p class="text-sm text-gray-600">
                                {{ getResumePreview(resume).position }}
                            </p>
                            <p class="text-xs text-gray-500">
                                {{ getResumePreview(resume).sections }}
                            </p>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-2 mt-4">
                            <Button
                                class="flex items-center gap-1"
                                size="sm"
                                variant="outline"
                                @click="editResume(resume.id)"
                            >
                                <Edit class="w-3 h-3"/>
                                Build
                            </Button>
                            <Button
                                class="flex items-center gap-1"
                                size="sm"
                                variant="outline"
                                @click.stop="showCopyResumeModal(resume.id)"
                            >
                                <Copy class="w-3 h-3"/>
                                Copy
                            </Button>
                            <Button
                                class="flex items-center gap-1"
                                size="sm"
                                title="Export resume"
                                variant="outline"
                                @click.stop="exportSingleResume(resume.id)"
                            >
                                <Download class="w-3 h-3"/>
                                Export
                            </Button>
                            <Button
                                class="flex items-center gap-1 text-red-600 hover:text-red-700"
                                size="sm"
                                variant="outline"
                                @click.stop="deleteResume(resume.id)"
                            >
                                <Trash2 class="w-3 h-3"/>
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <!-- Create Resume Modal -->
            <CreateResumeModal
                :is-open="showCreateModal"
                @close="showCreateModal = false"
                @confirm="handleCreateResume"
            />

            <!-- Copy Resume Modal -->
            <CopyResumeModal
                :is-open="showCopyModal"
                :resume-name="resumeToCopy ? `${resumeToCopy.name} (Copy)` : ''"
                @close="showCopyModal = false; resumeToCopy = null"
                @confirm="handleCopyResume"
            />

            <!-- Export Modal -->
            <ExportModal
                :is-open="showExportModal"
                :resumes="resumes"
                @close="showExportModal = false"
                @export="handleExport"
            />

            <!-- Import Confirmation Modal -->
            <ImportConfirmationModal
                :is-open="showImportModal"
                :resumes-to-import="importPreviews"
                @close="showImportModal = false; importPreviews = []"
                @import="handleImportConfirm"
            />

            <!-- Confirmation Modal -->
            <ConfirmationModal
                :cancel-text="confirmation.cancelText.value"
                :confirm-text="confirmation.confirmText.value"
                :is-open="confirmation.isOpen.value"
                :message="confirmation.message.value"
                :title="confirmation.title.value"
                @cancel="confirmation.handleCancel"
                @confirm="confirmation.handleConfirm"
            />

            <!-- Hidden file input for import -->
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

<style scoped>
    .resumes-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    @media (min-width: 768px) {
        .resumes-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1024px) {
        .resumes-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }
</style>
