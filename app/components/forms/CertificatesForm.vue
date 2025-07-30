<template>
    <FormContainer
        :is-empty="(resumeStore.resumeData.certificates?.length || 0) === 0"
        :title="resumeStore.resumeData.sectionHeaders.certificates"
        add-button-label="Add Certificate"
        empty-message="Add your professional certificates and achievements."
        section-key="certificates"
        @add="resumeStore.addCertificate"
        @edit-title="(value) => resumeStore.updateSectionHeader('certificates', value)"
    >

        <!-- Column Placement Control -->
        <template #header-actions>
            <div
                v-if="templateConfig.canMoveSection('certificates')"
                class="flex items-center gap-2"
            >
                <span class="text-sm text-gray-600">Column:</span>
                <select
                    :value="resumeStore.resumeData.sectionPlacement.certificates"
                    class="px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    @change="(e) => resumeStore.updateSectionPlacement('certificates', (e.target as HTMLSelectElement).value as 'left' | 'right')"
                >
                    <option value="left">
                        Left
                    </option>
                    <option value="right">
                        Right
                    </option>
                </select>
            </div>
        </template>

        <FormCard
            v-for="(certificate, index) in (resumeStore.resumeData.certificates || [])"
            :key="index"
            :can-move-down="index < (resumeStore.resumeData.certificates?.length || 0) - 1"
            :can-move-up="index > 0"
            :confirm-message="`Are you sure you want to delete this certificate? This action cannot be undone.`"
            :confirm-title="'Delete Certificate'"
            :title="`Certificate ${index + 1}`"
            @remove="resumeStore.removeCertificate(index)"
            @move-up="resumeStore.moveCertificate(index, index - 1)"
            @move-down="resumeStore.moveCertificate(index, index + 1)"
        >
            <div class="space-y-4">
                <div class="space-y-2">
                    <Label :for="`certificate-title-${index}`">Certificate Title</Label>
                    <Input
                        :id="`certificate-title-${index}`"
                        :model-value="certificate.title"
                        placeholder="AWS Certified Solutions Architect"
                        @update:model-value="(value) => resumeStore.updateCertificate(index, 'title', value)"
                    />
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <Label :for="`certificate-issuer-${index}`">Issuer</Label>
                        <Input
                            :id="`certificate-issuer-${index}`"
                            :model-value="certificate.issuer"
                            placeholder="Amazon Web Services"
                            @update:model-value="(value) => resumeStore.updateCertificate(index, 'issuer', value)"
                        />
                    </div>

                    <div class="space-y-2">
                        <MonthYearPicker
                            :model-value="certificate.date"
                            label="Date Obtained"
                            @update:model-value="(value) => resumeStore.updateCertificate(index, 'date', value)"
                        />
                    </div>
                </div>

                <div class="space-y-2">
                    <Label :for="`certificate-url-${index}`">Certificate URL</Label>
                    <Input
                        :id="`certificate-url-${index}`"
                        :model-value="certificate.url || ''"
                        placeholder="https://example.com/certificate"
                        type="url"
                        @update:model-value="(value) => resumeStore.updateCertificate(index, 'url', value)"
                    />
                </div>

                <div class="space-y-2">
                    <Label :for="`certificate-description-${index}`">Description</Label>
                    <Textarea
                        :id="`certificate-description-${index}`"
                        :model-value="certificate.description || ''"
                        placeholder="Brief description of the certificate or skills gained..."
                        rows="3"
                        @update:model-value="(value) => resumeStore.updateCertificate(index, 'description', value)"
                    />
                </div>
            </div>
        </FormCard>
    </FormContainer>

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
</template>

<script lang="ts" setup>
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import MonthYearPicker from '~/components/elements/MonthYearPicker.vue';
import FormContainer from '~/components/elements/FormContainer.vue';
import FormCard from '~/components/elements/FormCard.vue';
import ConfirmationModal from '~/components/elements/ConfirmationModal.vue';

const resumeStore = useResumeStore();
const confirmation = useConfirmation();
const templateConfig = useTemplate();

</script>
