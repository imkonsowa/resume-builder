import type { ResumeData } from '~/types/resume';
import type { SectionRenderer, TemplateLayoutConfig } from '~/types/templateConfig';
import { ITEMS_SPACING, renderTemplateHeader } from './typstUtils';
import { escapeTypstText } from '~/utils/stringUtils';
import {
    generateCertificatesContent,
    generateContactContent,
    generateEducationContent,
    generateExperienceContent,
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
 * Default section headers
 */
const DEFAULT_SECTION_HEADERS = {
    experience: 'Employment History',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    languages: 'Languages',
    volunteering: 'Volunteering',
    info: 'Info',
    socialLinks: 'Links',
    certificates: 'Certificates',
} as const;

/**
 * Render experience section using shared logic
 */
export const renderSharedExperience: SectionRenderer = (data: ResumeData, fontSize: number, config: TemplateLayoutConfig): string => {
    if (!data?.experiences || data.experiences.length === 0) {
        return '';
    }

    const sectionContent = generateExperienceContent(data.experiences);
    const formattedContent = formatExperienceItems(sectionContent, config, fontSize);
    const headerText = data?.sectionHeaders?.experience || DEFAULT_SECTION_HEADERS.experience;

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Render education section using shared logic
 */
export const renderSharedEducation: SectionRenderer = (data: ResumeData, fontSize: number, config: TemplateLayoutConfig): string => {
    if (!data?.education || data.education.length === 0) {
        return '';
    }

    const sectionContent = generateEducationContent(data.education);
    const formattedContent = formatEducationItems(sectionContent, config, fontSize);
    const headerText = data?.sectionHeaders?.education || DEFAULT_SECTION_HEADERS.education;

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Render volunteering section using shared logic
 */
export const renderSharedVolunteering: SectionRenderer = (data: ResumeData, fontSize: number, config: TemplateLayoutConfig): string => {
    if (!data?.volunteering || data.volunteering.length === 0) {
        return '';
    }

    const sectionContent = generateVolunteeringContent(data.volunteering);
    const formattedContent = formatExperienceItems(sectionContent, config, fontSize); // Same format as experience
    const headerText = data?.sectionHeaders?.volunteering || DEFAULT_SECTION_HEADERS.volunteering;

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Render projects section using shared logic
 */
export const renderSharedProjects: SectionRenderer = (data: ResumeData, fontSize: number, config: TemplateLayoutConfig): string => {
    if (!data?.projects || data.projects.length === 0) {
        return '';
    }

    const sectionContent = generateProjectsContent(data.projects);
    if (sectionContent.length === 0) return '';

    const formattedContent = formatProjectsItems(sectionContent, config, fontSize);
    const headerText = data?.sectionHeaders?.projects || DEFAULT_SECTION_HEADERS.projects;

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Render skills section using shared logic
 */
export const renderSharedSkills: SectionRenderer = (data: ResumeData, fontSize: number, _config: TemplateLayoutConfig): string => {
    if (data?.skills && data.skills.length > 0) {
        const sectionContent = generateSkillsContent(data.skills);
        if (sectionContent.length === 0) return '';

        const formattedContent = formatSectionItems(sectionContent.map(item => item.content || ''), {
            spacing: 'block',
            itemSpacing: ITEMS_SPACING,
            joinSeparator: '',
        });
        const headerText = data?.sectionHeaders?.skills || DEFAULT_SECTION_HEADERS.skills;

        return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
    }

    // Handle legacy technicalSkills format
    if (!data?.technicalSkills || data.technicalSkills.trim() === '') {
        return '';
    }

    const content = data.technicalSkills.trim();
    return wrapInSectionBlock('Technical Skills', content, fontSize, renderTemplateHeader);
};

/**
 * Render languages section using shared logic
 */
export const renderSharedLanguages: SectionRenderer = (data: ResumeData, fontSize: number, _config: TemplateLayoutConfig): string => {
    if (!data?.languages || data.languages.length === 0) {
        return '';
    }

    const sectionContent = generateLanguagesContent(data.languages);
    if (sectionContent.length === 0) return '';

    const formattedContent = formatSectionItems(sectionContent.map(item => item.content || ''), {
        spacing: 'block',
        itemSpacing: ITEMS_SPACING,
        joinSeparator: '',
    });
    const headerText = data?.sectionHeaders?.languages || DEFAULT_SECTION_HEADERS.languages;

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Render contact info section using shared logic
 */
export const renderSharedContactInfo: SectionRenderer = (data: ResumeData, fontSize: number, config: TemplateLayoutConfig): string => {
    const sectionContent = generateContactContent(data);
    if (sectionContent.length === 0) return '';

    const formattedContent = formatSimpleItems(sectionContent, config);
    const headerText = data?.sectionHeaders?.info || DEFAULT_SECTION_HEADERS.info;

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Render social links section using shared logic
 */
export const renderSharedSocialLinks: SectionRenderer = (data: ResumeData, fontSize: number, config: TemplateLayoutConfig): string => {
    const sectionContent = generateSocialLinksContent(data);
    if (sectionContent.length === 0) return '';

    const formattedContent = formatSocialLinks(sectionContent, config.socialLinks);
    const headerText = data?.sectionHeaders?.socialLinks || DEFAULT_SECTION_HEADERS.socialLinks;

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

    const headerText = data?.sectionHeaders?.profile || 'Profile';
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

    const sectionContent = generateCertificatesContent(data.certificates);
    if (sectionContent.length === 0) return '';

    const formattedContent = formatCertificatesItems(sectionContent, config, fontSize);
    const headerText = data?.sectionHeaders?.certificates || DEFAULT_SECTION_HEADERS.certificates;

    return wrapInSectionBlock(headerText, formattedContent, fontSize, renderTemplateHeader);
};

/**
 * Get all available shared section renderers
 */
export const getSharedSectionRenderers = () => ({
    experience: renderSharedExperience,
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
