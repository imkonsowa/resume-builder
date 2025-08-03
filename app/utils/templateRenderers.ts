import type { Certificate, Education, Experience, Internship, Language, Project, ResumeData, SkillItem, Volunteering } from '~/types/resume';
import type { SectionContent } from '~/types/templateConfig';
import { convertDateRange, convertEmail, convertExternalLinkIcon, convertLink } from './typstUtils';
import { escapeTypstText } from './stringUtils';

// Platform labels mapping (shared between templates)
export const SOCIAL_PLATFORM_LABELS = {
    linkedin: 'LinkedIn',
    github: 'GitHub',
    twitter: 'Twitter',
    portfolio: 'Portfolio',
    dribbble: 'Dribbble',
    medium: 'Medium',
    devto: 'Dev.to',
    personal: 'Personal',
} as const;

/**
 * Generate experience content (shared between templates)
 */
export const generateExperienceContent = (experiences: Experience[]): SectionContent[] => {
    return experiences.map((experience) => {
        const title = `${experience.position}${experience.company ? ' at ' + experience.company : ''}${experience.location ? ', ' + experience.location : ''}`;
        const dateRange = convertDateRange(experience.startDate, experience.endDate, experience.isPresent);
        const companyLink = experience.companyUrl?.trim() ? convertExternalLinkIcon(experience.companyUrl) : '';
        const achievements = experience.achievements
            .filter(achievement => achievement.text && achievement.text.trim() !== '')
            .map(achievement => achievement.text);

        return {
            title,
            date: dateRange,
            content: companyLink,
            achievements,
        };
    });
};

/**
 * Generate internships content (shared between templates)
 */
export const generateInternshipsContent = (internships: Internship[]): SectionContent[] => {
    return internships.map((internship) => {
        const title = `${internship.position}${internship.company ? ' at ' + internship.company : ''}${internship.location ? ', ' + internship.location : ''}`;
        const dateRange = convertDateRange(internship.startDate, internship.endDate, internship.isPresent);
        const companyLink = internship.companyUrl?.trim() ? convertExternalLinkIcon(internship.companyUrl) : '';
        const achievements = internship.achievements
            .filter(achievement => achievement.text && achievement.text.trim() !== '')
            .map(achievement => achievement.text);

        return {
            title,
            date: dateRange,
            content: companyLink,
            achievements,
        };
    });
};

/**
 * Generate education content (shared between templates)
 */
export const generateEducationContent = (education: Education[]): SectionContent[] => {
    return education.map((edu) => {
        const title = `${edu.degree}${edu.institution ? ' at ' + edu.institution : ''}${edu.location ? ', ' + edu.location : ''}`;
        const dateRange = convertDateRange(edu.startDate, edu.endDate, edu.isPresent || false);

        let additionalInfo = '';
        if (edu.graduationScore && edu.graduationScore.trim()) {
            additionalInfo += `*Grade:* ${escapeTypstText(edu.graduationScore)}`;
        }
        if (edu.description && edu.description.trim()) {
            if (additionalInfo) additionalInfo += '\n\n';
            additionalInfo += escapeTypstText(edu.description);
        }

        return {
            title,
            date: dateRange,
            additionalInfo: additionalInfo || undefined,
        };
    });
};

/**
 * Generate volunteering content (shared between templates)
 */
export const generateVolunteeringContent = (volunteering: Volunteering[]): SectionContent[] => {
    return volunteering.map((vol) => {
        const title = `${vol.position}${vol.organization ? ' at ' + vol.organization : ''}${vol.location ? ', ' + vol.location : ''}`;
        const dateRange = convertDateRange(vol.startDate, vol.endDate, vol.isPresent);
        const achievements = vol.achievements
            .filter(achievement => achievement.text && achievement.text.trim() !== '')
            .map(achievement => achievement.text);

        return {
            title,
            date: dateRange,
            achievements,
        };
    });
};

/**
 * Generate projects content (shared between templates)
 */
export const generateProjectsContent = (projects: Project[]): SectionContent[] => {
    return projects
        .filter(project => project.title.trim() || project.description.trim())
        .map((project) => {
            let title = '';
            if (project.title.trim()) {
                title = `#block(below: 0.6em)[#text("${escapeTypstText(project.title)}", weight: "bold")`;
                if (project.url.trim()) {
                    title += ` • ${convertExternalLinkIcon(project.url)}`;
                }
                title += `]`;
            }

            return {
                title,
                content: project.description.trim() ? escapeTypstText(project.description) : undefined,
            };
        });
};

/**
 * Generate skills content (shared between templates)
 */
export const generateSkillsContent = (skills: SkillItem[]): SectionContent[] => {
    return skills
        .filter(skill => skill.title.trim() || skill.description.trim())
        .map((skill) => {
            let content = '';
            if (!skill.title.trim()) {
                content = escapeTypstText(skill.description);
            }
            else if (!skill.description.trim()) {
                content = `*${escapeTypstText(skill.title)}*`;
            }
            else {
                content = `*${escapeTypstText(skill.title)}:* ${escapeTypstText(skill.description)}`;
            }

            return {
                title: '',
                content,
            };
        });
};

/**
 * Generate languages content (shared between templates)
 */
export const generateLanguagesContent = (languages: Language[]): SectionContent[] => {
    return languages
        .filter(language => language.name.trim())
        .map((language) => {
            let content = `*${escapeTypstText(language.name)}*`;
            if (language.proficiency.trim()) {
                content += ` - ${escapeTypstText(language.proficiency)}`;
            }

            return {
                title: '',
                content,
            };
        });
};

/**
 * Generate contact info content (shared between templates)
 */
export const generateContactContent = (data: ResumeData): SectionContent[] => {
    const contactInfo: SectionContent[] = [];

    if (data?.email) {
        contactInfo.push({
            title: '',
            content: convertEmail(data.email),
        });
    }

    if (data?.phone) {
        contactInfo.push({
            title: '',
            content: escapeTypstText(data.phone),
        });
    }

    if (data?.location) {
        contactInfo.push({
            title: '',
            content: escapeTypstText(data.location),
        });
    }

    return contactInfo;
};

/**
 * Generate social links content (shared between templates)
 */
export const generateSocialLinksContent = (data: ResumeData): SectionContent[] => {
    const socialLinks = (data?.socialLinks || [])
        .filter(link => link.platform && link.url && link.url.trim() !== '');

    return socialLinks.map((link) => {
        let linkText = '';
        if (link.platform === 'other' && link.customLabel) {
            linkText = link.customLabel;
        }
        else {
            linkText = SOCIAL_PLATFORM_LABELS[link.platform as keyof typeof SOCIAL_PLATFORM_LABELS] || link.platform;
        }

        return {
            title: '',
            content: convertLink(link.url, linkText),
        };
    });
};

/**
 * Generate certificates content (shared between templates)
 */
export const generateCertificatesContent = (certificates: Certificate[]): SectionContent[] => {
    return certificates
        .filter(cert => cert.title.trim() || cert.issuer.trim())
        .map((cert) => {
            const title = `${cert.title}${cert.issuer ? ' from ' + cert.issuer : ''}`;
            const dateRange = cert.date ? convertDateRange(cert.date) : '';
            const certLink = cert.url?.trim() ? convertExternalLinkIcon(cert.url) : '';
            
            const description = cert.description?.trim() ? escapeTypstText(cert.description) : '';

            return {
                title,
                date: dateRange,
                content: certLink,
                additionalInfo: description || undefined,
            };
        });
};
