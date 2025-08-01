import type { Resume } from '~/types/resume';
import type { ImportResumePreview } from '~/components/elements/ImportConfirmationModal.vue';

export const useResumeImportExport = () => {
    const resumeStore = useResumeStore();

    // Export resumes
    const exportResumes = (resumeIds: string[]) => {
        const resumes = resumeStore.resumesList.filter(r => resumeIds.includes(r.id));
        
        if (resumes.length === 0) {
            console.error('No resumes to export');
            return;
        }

        // Create export data in array format
        const exportData = resumes.map(resume => ({
            name: resume.name,
            data: resume.data,
            createdAt: resume.createdAt,
            updatedAt: resume.updatedAt,
        }));

        // Create blob and download
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        
        // Generate filename with timestamp
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = resumes.length === 1 
            ? `resume-${resumes[0].name.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.json`
            : `resumes-export-${timestamp}.json`;
        
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Export single resume
    const exportSingleResume = (resumeId: string) => {
        exportResumes([resumeId]);
    };

    // Parse import file and check for duplicates
    const parseImportFile = (file: File): Promise<{ success: boolean; previews?: ImportResumePreview[]; error?: string }> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const content = e.target?.result as string;
                    const data = JSON.parse(content);
                    
                    // Validate data structure
                    if (!Array.isArray(data)) {
                        throw new Error('Invalid file format. Expected an array of resumes.');
                    }
                    
                    // Get existing resume names for duplicate detection
                    const existingNames = resumeStore.resumesList.map(r => r.name.toLowerCase());
                    
                    // Process each resume and check for duplicates
                    const previews: ImportResumePreview[] = data.map((resumeData: any) => {
                        if (!resumeData.name || !resumeData.data) {
                            return null;
                        }
                        
                        // Count items in the resume
                        const itemCount = 
                            (resumeData.data.experiences?.length || 0) +
                            (resumeData.data.education?.length || 0) +
                            (resumeData.data.skills?.length || 0) +
                            (resumeData.data.projects?.length || 0) +
                            (resumeData.data.languages?.length || 0) +
                            (resumeData.data.volunteering?.length || 0) +
                            (resumeData.data.certificates?.length || 0);
                        
                        return {
                            name: resumeData.name,
                            data: resumeData.data,
                            isDuplicate: existingNames.includes(resumeData.name.toLowerCase()),
                            itemCount,
                        };
                    }).filter(Boolean);
                    
                    resolve({ 
                        success: true, 
                        previews 
                    });
                } catch (error) {
                    console.error('Parse error:', error);
                    resolve({ 
                        success: false, 
                        error: error instanceof Error ? error.message : 'Failed to parse import file' 
                    });
                }
            };
            
            reader.onerror = () => {
                resolve({ 
                    success: false, 
                    error: 'Failed to read file' 
                });
            };
            
            reader.readAsText(file);
        });
    };

    // Import selected resumes
    const importSelectedResumes = (previews: ImportResumePreview[], selectedIndexes: number[]) => {
        let importedCount = 0;
        
        selectedIndexes.forEach(index => {
            const resumeData = previews[index];
            if (resumeData) {
                // Create new resume with imported data
                const newResumeId = resumeStore.createResume(resumeData.name);
                
                // Update the resume with imported data
                resumeStore.updateResumeData(newResumeId, resumeData.data);
                
                importedCount++;
            }
        });
        
        return importedCount;
    };

    return {
        exportResumes,
        exportSingleResume,
        parseImportFile,
        importSelectedResumes,
    };
};