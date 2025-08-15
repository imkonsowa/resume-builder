import type { ResumeData } from '~/types/resume';
import type { SectionRenderer, TemplateLayoutConfig } from '~/types/templateConfig';
import { ITEMS_SPACING, renderTemplateHeader } from './typstUtils';
import { escapeTypstText } from '~/utils/stringUtils';
import {
    generateCertificatesContent,
    generateContactContent,
    generateEducationContent,
    generateExperienceContent,
    generateInternshipsContent,
    generateLanguagesContent,
    generateProjectsContent,
    generateSkillsContent,
    generateSocialLinksContent,
    generateVolunteeringContent,
} from './templateRenderers';
import {
    formatCertificatesItems,
    formatEducationItems,
    formatExperienceItems,
    formatProjectsItems,
    formatSectionItems,
    formatSimpleItems,
    formatSocialLinks,
    wrapInSectionBlock,
} from './layoutFormatters';


/**
 * Render experience section using shared logic
 */
export const renderSharedExperience: SectionRenderer = (data: ResumeData, fontSize: number, config: TemplateLayoutConfig): string => {
    if (!data?.experiences || data.experiences.length === 0) {
        return '';
    }

    const { t } = useI18n();
    const sectionContent = generateExperienceContent(data.experiences);
    const formattedContent = formatExperienceItems(sectionContent, config, fontSize);
    const headerText = t('forms.experience.title');

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Render internships section using shared logic
 */
export const renderSharedInternships: SectionRenderer = (data: ResumeData, fontSize: number, config: TemplateLayoutConfig): string => {
    if (!data?.internships || data.internships.length === 0) {
        return '';
    }

    const { t } = useI18n();
    const sectionContent = generateInternshipsContent(data.internships);
    const formattedContent = formatExperienceItems(sectionContent, config, fontSize);
    const headerText = t('forms.internships.title');

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Render education section using shared logic
 */
export const renderSharedEducation: SectionRenderer = (data: ResumeData, fontSize: number, config: TemplateLayoutConfig): string => {
    if (!data?.education || data.education.length === 0) {
        return '';
    }

    const { t } = useI18n();
    const sectionContent = generateEducationContent(data.education);
    const formattedContent = formatEducationItems(sectionContent, config, fontSize);
    const headerText = t('forms.education.title');

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Render volunteering section using shared logic
 */
export const renderSharedVolunteering: SectionRenderer = (data: ResumeData, fontSize: number, config: TemplateLayoutConfig): string => {
    if (!data?.volunteering || data.volunteering.length === 0) {
        return '';
    }

    const { t } = useI18n();
    const sectionContent = generateVolunteeringContent(data.volunteering);
    const formattedContent = formatExperienceItems(sectionContent, config, fontSize); // Same format as experience
    const headerText = t('forms.volunteering.title');

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Render projects section using shared logic
 */
export const renderSharedProjects: SectionRenderer = (data: ResumeData, fontSize: number, config: TemplateLayoutConfig): string => {
    if (!data?.projects || data.projects.length === 0) {
        return '';
    }

    const { t } = useI18n();
    const sectionContent = generateProjectsContent(data.projects);
    if (sectionContent.length === 0) return '';

    const formattedContent = formatProjectsItems(sectionContent, config, fontSize);
    const headerText = t('forms.projects.title');

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Render skills section using shared logic
 */
export const renderSharedSkills: SectionRenderer = (data: ResumeData, fontSize: number, _config: TemplateLayoutConfig): string => {
    const { t } = useI18n();

    if (data?.skills && data.skills.length > 0) {
        const sectionContent = generateSkillsContent(data.skills);
        if (sectionContent.length === 0) return '';

        const formattedContent = formatSectionItems(sectionContent.map(item => item.content || ''), {
            spacing: 'block',
            itemSpacing: ITEMS_SPACING,
            joinSeparator: '',
        });
        const headerText = t('forms.skills.title');

        return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
    }

    // Handle legacy technicalSkills format
    if (!data?.technicalSkills || data.technicalSkills.trim() === '') {
        return '';
    }

    const content = data.technicalSkills.trim();
    const headerText = t('forms.skills.title');
    return wrapInSectionBlock(headerText, content, fontSize, renderTemplateHeader);
};

/**
 * Render languages section using shared logic
 */
export const renderSharedLanguages: SectionRenderer = (data: ResumeData, fontSize: number, _config: TemplateLayoutConfig): string => {
    if (!data?.languages || data.languages.length === 0) {
        return '';
    }

    const { t } = useI18n();
    const sectionContent = generateLanguagesContent(data.languages);
    if (sectionContent.length === 0) return '';

    const formattedContent = formatSectionItems(sectionContent.map(item => item.content || ''), {
        spacing: 'block',
        itemSpacing: ITEMS_SPACING,
        joinSeparator: '',
    });
    const headerText = t('forms.languages.title');

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Render contact info section using shared logic
 */
export const renderSharedContactInfo: SectionRenderer = (data: ResumeData, fontSize: number, config: TemplateLayoutConfig): string => {
    const sectionContent = generateContactContent(data);
    if (sectionContent.length === 0) return '';

    const { t } = useI18n();
    const formattedContent = formatSimpleItems(sectionContent, config);
    const headerText = t('forms.personalInfo.title');

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Render social links section using shared logic
 */
export const renderSharedSocialLinks: SectionRenderer = (data: ResumeData, fontSize: number, config: TemplateLayoutConfig): string => {
    const sectionContent = generateSocialLinksContent(data);
    if (sectionContent.length === 0) return '';

    const { t } = useI18n();
    const formattedContent = formatSocialLinks(sectionContent, config.socialLinks);
    const headerText = t('forms.personalInfo.socialLinks');

    // For horizontal links in header, don't wrap in section block
    if (config.socialLinks.placement === 'header' && config.socialLinks.orientation === 'horizontal') {
        return formattedContent;
    }

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Render profile/summary section using shared logic
 */
export const renderSharedProfile: SectionRenderer = (data: ResumeData, fontSize: number, _config: TemplateLayoutConfig): string => {
    if (!data?.summary || !data.summary.trim()) {
        return '';
    }

    const { t } = useI18n();
    const headerText = t('forms.personalInfo.summary');
    const content = escapeTypstText(data.summary.trim());

    return wrapInSectionBlock(headerText, content, fontSize, renderTemplateHeader);
};

/**
 * Render certificates section using shared logic
 */
export const renderSharedCertificates: SectionRenderer = (data: ResumeData, fontSize: number, config: TemplateLayoutConfig): string => {
    if (!data?.certificates || data.certificates.length === 0) {
        return '';
    }

    const { t } = useI18n();
    const sectionContent = generateCertificatesContent(data.certificates);
    if (sectionContent.length === 0) return '';

    const formattedContent = formatCertificatesItems(sectionContent, config, fontSize);
    const headerText = t('forms.certificates.title');

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Get all available shared section renderers
 */
export const getSharedSectionRenderers = () => ({
    experience: renderSharedExperience,
    internships: renderSharedInternships,
    education: renderSharedEducation,
    volunteering: renderSharedVolunteering,
    projects: renderSharedProjects,
    skills: renderSharedSkills,
    languages: renderSharedLanguages,
    contactInfo: renderSharedContactInfo,
    socialLinks: renderSharedSocialLinks,
    profile: renderSharedProfile,
    certificates: renderSharedCertificates,
});
