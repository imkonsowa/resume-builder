import type {ResumeData, SectionOrder, TemplateLayoutConfig} from '~/types/resume';
import {escapeTypstText} from '~/utils/stringUtils';
import {
    convertDateRange,
    convertEmail,
    convertLink,
    convertList,
    renderTemplateDate,
    renderTemplateDateWithLink,
    renderTemplateHeader,
    renderTemplateSubHeader,
    HEADER_SPACING,
    SECTION_SPACING,
    ITEMS_SPACING,
} from '~/utils/typstUtils';
import {useSettingsStore} from '~/stores/settings';

export interface Template {
    id: string;
    name: string;
    description: string;
    layoutConfig: TemplateLayoutConfig;
    parse: (data: ResumeData, font: string) => string;
}

export interface TemplateSettings {
    font: string;
}

const renderHeaderLeftColumn = (data: ResumeData, fontSize: number): string[] => {
    const rows: string[] = [];

    const fullName = `${escapeTypstText(data?.firstName || '')} ${escapeTypstText(data?.lastName || '')}`.trim();
    const position = escapeTypstText(data?.position || '');
    const location = escapeTypstText(data?.location || '');

    rows.push(`#text(size: ${fontSize + 12}pt, weight: "bold")[${fullName}]`);

    if (position) {
        rows.push(`#block(above: 0.8em)[#text(size: ${fontSize + 2}pt)[${position}]]`);
    }

    if (location) {
        rows.push(`#block(above: 0.6em)[#text(size: ${fontSize - 1}pt)[${location}]]`);
    }

    return rows;
};

const renderHeaderRightColumn = (data: ResumeData, fontSize: number): string[] => {
    const rows: string[] = [];

    if (data?.email) {
        const email = convertEmail(data.email);
        rows.push(`#block(above: 0em)[#text(size: ${fontSize - 1}pt)[${email}]]`);
    }

    if (data?.phone) {
        const phone = escapeTypstText(data.phone);
        const phoneSpacing = rows.length > 0 ? '0.8em' : '0em';
        rows.push(`#block(above: ${phoneSpacing})[#text(size: ${fontSize - 1}pt)[${phone}]]`);
    }

    const socialLinks = (data?.socialLinks || [])
        .filter(link => link.platform && link.url && link.url.trim() !== '')
        .map((link) => {
            let linkText = '';
            if (link.platform === 'other' && link.customLabel) {
                linkText = link.customLabel;
            } else {
                const platformLabels = {
                    linkedin: 'LinkedIn',
                    github: 'GitHub',
                    twitter: 'Twitter',
                    portfolio: 'Portfolio',
                    dribbble: 'Dribbble',
                    medium: 'Medium',
                    devto: 'Dev.to',
                    personal: 'Personal',
                };
                linkText = platformLabels[link.platform as keyof typeof platformLabels] || link.platform;
            }
            return convertLink(link.url, linkText);
        });

    if (socialLinks.length > 0) {
        const linksSpacing = rows.length > 0 ? '0.8em' : '0em';
        const linksContent = socialLinks.join(' • ');
        rows.push(`#block(above: ${linksSpacing})[#text(size: ${fontSize - 1}pt)[${linksContent}]]`);
    }

    return rows;
};

const convertResumeHeader = (data: ResumeData, fontSize: number) => {
    const leftColumnRows = renderHeaderLeftColumn(data, fontSize);
    const rightColumnRows = renderHeaderRightColumn(data, fontSize);

    const headerParts: string[] = [];

    headerParts.push('#grid(');
    headerParts.push('    columns: (6fr, 4fr),');
    headerParts.push('    column-gutter: 20pt,');
    headerParts.push('    align: (left, left),');

    headerParts.push('    [');
    leftColumnRows.forEach((row) => {
        headerParts.push(`        ${row}`);
    });
    headerParts.push('    ],');

    headerParts.push('    [');
    rightColumnRows.forEach((row) => {
        headerParts.push(`        ${row}`);
    });
    headerParts.push('    ]');
    headerParts.push(')');

    headerParts.push('#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 1pt + black)]');

    if (data?.summary) {
        headerParts.push(`#block(above: 0em, below: ${SECTION_SPACING})[`
            + `#text(size: ${fontSize}pt)[${escapeTypstText(data.summary)}]`
            + ']');
    }

    return headerParts.join('\n');
};

const renderEducationCompact = (data: ResumeData, fontSize: number) => {
    if (!data?.education || data.education.length === 0) {
        return '';
    }

    const educationItems = data.education.map((education) => {
        const title = `${education.degree}${education.institution ? ' at ' + education.institution : ''}${education.location ? ', ' + education.location : ''}`;
        const dateRange = convertDateRange(education.startDate, education.endDate, education.isPresent || false);

        let content = `${renderTemplateSubHeader(title, fontSize)}\n${renderTemplateDate(dateRange, fontSize)}`;

        if (education.graduationScore && education.graduationScore.trim()) {
            content += `\n*Grade:* ${escapeTypstText(education.graduationScore)}`;
        }

        if (education.description && education.description.trim()) {
            content += `\n\n${escapeTypstText(education.description)}`;
        }

        return content;
    }).join('\n\n');

    const headerText = data?.sectionHeaders?.education || 'Education';
    return `#block(above: 0em, below: ${SECTION_SPACING})[
${renderTemplateHeader(headerText, fontSize)}\n\n${educationItems}
]`;
};

const renderEmploymentHistoryCompact = (data: ResumeData, fontSize: number) => {
    if (!data?.experiences || data.experiences.length === 0) {
        return '';
    }

    const experienceItems = data.experiences.map((experience) => {
        const title = `${experience.position}${experience.company ? ' at ' + experience.company : ''}${experience.location ? ', ' + experience.location : ''}`;
        const dateRange = convertDateRange(experience.startDate, experience.endDate, experience.isPresent);

        const companyLink = experience.companyUrl && experience.companyUrl.trim()
            ? convertLink(experience.companyUrl, 'Website')
            : '';

        const dateAndLinkSection = renderTemplateDateWithLink(dateRange, companyLink, fontSize);

        const achievements = experience.achievements
            .filter(achievement => achievement.text && achievement.text.trim() !== '')
            .map(achievement => achievement.text);

        return `${renderTemplateSubHeader(title, fontSize)}\n${dateAndLinkSection}\n${convertList(achievements)}`;
    }).join('\n\n');

    const headerText = data?.sectionHeaders?.experience || 'Employment Experience';
    return `#block(above: 0em, below: ${SECTION_SPACING})[
${renderTemplateHeader(headerText, fontSize)}\n\n${experienceItems}
]`;
};

const renderSkillsCompact = (data: ResumeData, fontSize: number) => {
    if (data?.skills && data.skills.length > 0) {
        const skillItems = data.skills
            .filter(skill => skill.title.trim() || skill.description.trim())
            .map((skill) => {
                if (!skill.title.trim()) return escapeTypstText(skill.description);
                if (!skill.description.trim()) return `*${escapeTypstText(skill.title)}*`;
                return `*${escapeTypstText(skill.title)}:* ${escapeTypstText(skill.description)}`;
            })
            .map(content => `#block(above: 0em, below: ${ITEMS_SPACING})[${content}]`)
            .join('');

        if (!skillItems) return '';

        const headerText = data?.sectionHeaders?.skills || 'Skills';
        return `#block(above: 0em, below: ${SECTION_SPACING})[
${renderTemplateHeader(headerText, fontSize)}\n\n${skillItems}
]`;
    }

    if (!data?.technicalSkills || data.technicalSkills.trim() === '') {
        return '';
    }

    return `#block(above: 0em, below: ${SECTION_SPACING})[
${renderTemplateHeader('Technical Skills', fontSize)}\n\n${escapeTypstText(data.technicalSkills)}
]`;
};

const renderProjectsCompact = (data: ResumeData, fontSize: number) => {
    if (!data?.projects || data.projects.length === 0) {
        return '';
    }

    const projectItems = data.projects
        .filter(project => project.title.trim() || project.description.trim())
        .map((project) => {
            let content = '';

            if (project.title.trim()) {
                content += `*${escapeTypstText(project.title)}*`;
                if (project.url.trim()) {
                    content += ` • ${convertLink(project.url, 'Website')}`;
                }
            }

            if (project.description.trim()) {
                if (content) content += '\n\n';
                content += escapeTypstText(project.description);
            }

            return content;
        })
        .filter(content => content.trim())
        .join('\n\n');

    if (!projectItems) return '';

    const headerText = data?.sectionHeaders?.projects || 'Projects';
    return `#block(above: 0em, below: ${SECTION_SPACING})[
${renderTemplateHeader(headerText, fontSize)}\n\n${projectItems}
]`;
};

const renderVolunteeringCompact = (data: ResumeData, fontSize: number) => {
    if (!data?.volunteering || data.volunteering.length === 0) {
        return '';
    }

    const volunteeringItems = data.volunteering.map((volunteering) => {
        const title = `${volunteering.position}${volunteering.organization ? ' at ' + volunteering.organization : ''}${volunteering.location ? ', ' + volunteering.location : ''}`;
        const dateRange = convertDateRange(volunteering.startDate, volunteering.endDate, volunteering.isPresent);
        const achievements = volunteering.achievements
            .filter(achievement => achievement.text && achievement.text.trim() !== '')
            .map(achievement => achievement.text);

        return `${renderTemplateSubHeader(title, fontSize)}\n${renderTemplateDate(dateRange, fontSize)}\n${convertList(achievements)}`;
    }).join('\n\n');

    const headerText = data?.sectionHeaders?.volunteering || 'Volunteering';
    return `#block(above: 0em, below: ${SECTION_SPACING})[
${renderTemplateHeader(headerText, fontSize)}\n\n${volunteeringItems}
]`;
};

const renderLanguagesCompact = (data: ResumeData, fontSize: number) => {
    if (!data?.languages || data.languages.length === 0) {
        return '';
    }

    const languageItems = data.languages
        .filter(language => language.name.trim())
        .map((language) => {
            let content = `*${escapeTypstText(language.name)}*`;

            if (language.proficiency.trim()) {
                content += ` - ${escapeTypstText(language.proficiency)}`;
            }

            return content;
        })
        .filter(content => content.trim())
        .map(content => `#block(above: 0em, below: ${ITEMS_SPACING})[${content}]`)
        .join('');

    if (!languageItems) return '';

    const headerText = data?.sectionHeaders?.languages || 'Languages';
    return `#block(above: 0em, below: ${SECTION_SPACING})[
${renderTemplateHeader(headerText, fontSize)}\n\n${languageItems}
]`;
};

const parse = (data: ResumeData, font: string): string => {
    const settings: TemplateSettings = {font};
    const settingsStore = useSettingsStore();
    const fontSize = settingsStore.fontSize;

    const sectionRenderers: Record<string, () => string> = {
        education: () => renderEducationCompact(data, fontSize),
        experience: () => renderEmploymentHistoryCompact(data, fontSize),
        skills: () => renderSkillsCompact(data, fontSize),
        projects: () => renderProjectsCompact(data, fontSize),
        volunteering: () => renderVolunteeringCompact(data, fontSize),
        languages: () => renderLanguagesCompact(data, fontSize),
    };

    const sectionsToRender = Object.keys(sectionRenderers);

    const sortedSections = sectionsToRender.sort((a, b) => {
        const orderA = data.sectionOrder?.[a as keyof SectionOrder] ?? 999;
        const orderB = data.sectionOrder?.[b as keyof SectionOrder] ?? 999;
        return orderA - orderB;
    });

    const sections = sortedSections
        .map(section => sectionRenderers[section]())
        .filter(content => content.trim() !== '');

    const sectionsContent = sections.join('');

    const fullContent = `${convertResumeHeader(data, fontSize)}${sectionsContent ? `\n\n${sectionsContent}` : ''}`;

    return `#set page(margin: 1cm)
#set text(font: ("${settings.font}"), size: ${fontSize}pt)
#set par(leading: 0.4em)

${fullContent}

#pagebreak(weak: true)`;
};

export const compactTemplate: Template = {
    id: 'compact',
    name: 'Compact',
    description: 'Single column template for comprehensive resumes with more information',
    layoutConfig: {
        isTwoColumn: false,
        movableSections: [],
    },
    parse,
};
