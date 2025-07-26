import type {ResumeData, TemplateLayoutConfig} from '~/types/resume';
import {escapeTypstText} from '~/utils/stringUtils';
import {
    convertDateRange,
    convertEmail,
    convertGrid,
    convertLink,
    convertList,
    renderTemplateDate,
    renderTemplateDateWithLink,
    renderTemplateHeader,
    renderTemplateSubHeader
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

const convertResumeHeader = (data: ResumeData, fontSize: number) => {
    const fullName = `${escapeTypstText(data?.firstName || '')} ${escapeTypstText(data?.lastName || '')}`.trim();
    const position = escapeTypstText(data?.position || '');
    const summary = data?.summary ? `

${renderTemplateHeader(data?.sectionHeaders?.profile || 'Profile', fontSize)}

${escapeTypstText(data.summary)}` : '';

    return `= ${fullName}

${position}${summary}`;
};

const convertContactInfo = (data: ResumeData, fontSize: number) => {
    const contactInfo = [];
    if (data?.email) contactInfo.push(convertEmail(data.email));
    if (data?.phone) contactInfo.push(escapeTypstText(data.phone));
    if (data?.location) contactInfo.push(escapeTypstText(data.location));

    if (contactInfo.length === 0) return '';

    const headerText = data?.sectionHeaders?.info || 'Info';
    return `${renderTemplateHeader(headerText, fontSize)}

${contactInfo.map(item => `#block(above: 0.9em, below: 0.9em)[${item}]`).join('')}`;
};

const renderSocialLinks = (data: ResumeData, fontSize: number) => {
    const socialLinks = (data?.socialLinks || []).filter(link => link.platform && link.url && link.url.trim() !== '');

    if (socialLinks.length === 0) return '';

    const linkItems = socialLinks.map(link => {
        let linkText = '';
        if (link.platform === 'other' && link.customLabel) {
            linkText = link.customLabel;
        } else {
            const platformLabels = {
                'linkedin': 'LinkedIn',
                'github': 'GitHub',
                'twitter': 'Twitter',
                'portfolio': 'Portfolio',
                'dribbble': 'Dribbble',
                'medium': 'Medium',
                'devto': 'Dev.to',
                'personal': 'Personal'
            };
            linkText = platformLabels[link.platform as keyof typeof platformLabels] || link.platform;
        }

        return convertLink(link.url, linkText);
    });

    const headerText = data?.sectionHeaders?.socialLinks || 'Links';
    return `${renderTemplateHeader(headerText, fontSize)}

${linkItems.map(item => `#block(above: 0.9em, below: 0.9em)[${item}]`).join('')}`;
};


const renderEmploymentHistory = (data: ResumeData, fontSize: number) => {
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

        return `${renderTemplateSubHeader(title, fontSize)}

${dateAndLinkSection}

${convertList(achievements)}`;
    }).join('\n\n');

    const headerText = data?.sectionHeaders?.experience || 'Employment History';
    return `${renderTemplateHeader(headerText, fontSize)}

${experienceItems}`;
};

const renderEducation = (data: ResumeData, fontSize: number) => {
    if (!data?.education || data.education.length === 0) {
        return '';
    }

    const educationItems = data.education.map((education) => {
        const title = `${education.degree}${education.institution ? ' at ' + education.institution : ''}`;
        const dateRange = convertDateRange(education.startDate, education.endDate, education.isPresent || false);
        const location = education.location && education.location.trim() ? escapeTypstText(education.location) : '';

        let content = `${renderTemplateSubHeader(title, fontSize)}

${renderTemplateDate(dateRange, fontSize)}`;

        if (location) {
            content += `\n\n*Location:* ${location}`;
        }

        if (education.graduationScore && education.graduationScore.trim()) {
            content += `\n\n*Grade:* ${escapeTypstText(education.graduationScore)}`;
        }

        if (education.description && education.description.trim()) {
            content += `\n\n${escapeTypstText(education.description)}`;
        }

        return content;
    }).join('\n\n');

    const headerText = data?.sectionHeaders?.education || 'Education';
    return `${renderTemplateHeader(headerText, fontSize)}

${educationItems}`;
};

const renderTechnicalSkills = (data: ResumeData, fontSize: number) => {
    if (data?.skills && data.skills.length > 0) {
        const skillItems = data.skills
            .filter(skill => skill.title.trim() || skill.description.trim())
            .map(skill => {
                if (!skill.title.trim()) return escapeTypstText(skill.description);
                if (!skill.description.trim()) return `*${escapeTypstText(skill.title)}*`;
                return `*${escapeTypstText(skill.title)}:* ${escapeTypstText(skill.description)}`;
            })
            .map(content => `#block(below: 0.6em)[${content}]`)
            .join('');

        if (!skillItems) return '';

        const headerText = data?.sectionHeaders?.skills || 'Skills';
        return `${renderTemplateHeader(headerText, fontSize)}

${skillItems}`;
    }

    if (!data?.technicalSkills || data.technicalSkills.trim() === '') {
        return '';
    }

    return `${renderTemplateHeader('Technical Skills', fontSize)}

${escapeTypstText(data.technicalSkills)}`;
};

const renderVolunteering = (data: ResumeData, fontSize: number) => {
    if (!data?.volunteering || data.volunteering.length === 0) {
        return '';
    }

    const volunteeringItems = data.volunteering.map((volunteering) => {
        const title = `${volunteering.position}${volunteering.organization ? ' at ' + volunteering.organization : ''}${volunteering.location ? ', ' + volunteering.location : ''}`;
        const dateRange = convertDateRange(volunteering.startDate, volunteering.endDate, volunteering.isPresent);
        const achievements = volunteering.achievements
            .filter(achievement => achievement.text && achievement.text.trim() !== '')
            .map(achievement => achievement.text);

        return `${renderTemplateSubHeader(title, fontSize)}

${renderTemplateDate(dateRange, fontSize)}

${convertList(achievements)}`;
    }).join('\n\n');

    const headerText = data?.sectionHeaders?.volunteering || 'Volunteering';
    return `${renderTemplateHeader(headerText, fontSize)}

${volunteeringItems}`;
};

const renderProjects = (data: ResumeData, fontSize: number) => {
    if (!data?.projects || data.projects.length === 0) {
        return '';
    }

    const projectItems = data.projects
        .filter(project => project.title.trim() || project.description.trim())
        .map(project => {
            let content = '';

            if (project.title.trim()) {
                if (project.url.trim()) {
                    content += convertLink(project.url, project.title);
                } else {
                    content += `*${escapeTypstText(project.title)}*`;
                }
            }

            if (project.description.trim()) {
                if (content) content += '\n\n';
                content += escapeTypstText(project.description);
            }

            return content;
        })
        .filter(content => content.trim())
        .map(content => `#block(above: 0.9em, below: 0.9em)[${content}]`)
        .join('');

    if (!projectItems) return '';

    const headerText = data?.sectionHeaders?.projects || 'Projects';
    return `${renderTemplateHeader(headerText, fontSize)}

${projectItems}`;
};

const renderLanguages = (data: ResumeData, fontSize: number) => {
    if (!data?.languages || data.languages.length === 0) {
        return '';
    }

    const languageItems = data.languages
        .filter(language => language.name.trim())
        .map(language => {
            let content = `*${escapeTypstText(language.name)}*`;

            if (language.proficiency.trim()) {
                content += ` - ${escapeTypstText(language.proficiency)}`;
            }

            return content;
        })
        .filter(content => content.trim())
        .map(content => `#block(above: 0.9em, below: 0.9em)[${content}]`)
        .join('');

    if (!languageItems) return '';

    const headerText = data?.sectionHeaders?.languages || 'Languages';
    return `${renderTemplateHeader(headerText, fontSize)}

${languageItems}`;
};

const parse = (data: ResumeData, font: string): string => {
    const settings: TemplateSettings = {font};
    const settingsStore = useSettingsStore();
    const fontSize = settingsStore.fontSize;

    const allSections = {
        'experiences': () => renderEmploymentHistory(data, fontSize),
        'education': () => renderEducation(data, fontSize),
        'contact': () => convertContactInfo(data, fontSize),
        'socialLinks': () => renderSocialLinks(data, fontSize),
        'projects': () => renderProjects(data, fontSize),
        'languages': () => renderLanguages(data, fontSize),
        'technicalSkills': () => renderTechnicalSkills(data, fontSize),
        'volunteering': () => renderVolunteering(data, fontSize)
    };

    const fixedLeftSections = ['experiences', 'education'];

    const movableSections = ['projects', 'languages', 'technicalSkills', 'volunteering'];

    const leftSections = [...fixedLeftSections];
    const rightSections = [];

    movableSections.forEach(section => {
        if (section === 'technicalSkills') {
            const placement = data.sectionPlacement?.skills || 'right';
            if (placement === 'left') {
                leftSections.push(section);
            } else {
                rightSections.push(section);
            }
        } else {
            const placement = data.sectionPlacement?.[section as keyof typeof data.sectionPlacement] || 'right';
            if (placement === 'left') {
                leftSections.push(section);
            } else {
                rightSections.push(section);
            }
        }
    });

    const leftSectionOrder = {
        'experiences': data.sectionOrder?.experience || 1,
        'education': data.sectionOrder?.education || 2,
        'technicalSkills': data.sectionOrder?.skills || 3,
        'projects': data.sectionOrder?.projects || 4,
        'languages': data.sectionOrder?.languages || 5,
        'volunteering': data.sectionOrder?.volunteering || 6
    };

    const rightSectionOrder = {
        'technicalSkills': data.sectionOrder?.skills || 1,
        'projects': data.sectionOrder?.projects || 2,
        'languages': data.sectionOrder?.languages || 3,
        'volunteering': data.sectionOrder?.volunteering || 4
    };

    const leftContent = leftSections
        .sort((a, b) => (leftSectionOrder[a] || 999) - (leftSectionOrder[b] || 999))
        .map(section => allSections[section]())
        .filter(content => content.trim() !== '')
        .join('\n\n');

    const dynamicRightContent = rightSections
        .sort((a, b) => (rightSectionOrder[a] || 999) - (rightSectionOrder[b] || 999))
        .map(section => allSections[section]())
        .filter(content => content.trim() !== '');

    const staticRightContent = [
        allSections['contact'](),
        allSections['socialLinks']()
    ].filter(content => content.trim() !== '');

    const rightContent = [...staticRightContent, ...dynamicRightContent].join('\n\n');

    const headerAndLeftContent = `${convertResumeHeader(data, fontSize)}

#v(1em)

${leftContent}`;

    const twoColumnLayout = convertGrid([headerAndLeftContent, rightContent], '(7fr, 3fr)');

    return `#set page(margin: 1.2cm)
#set text(font: ("${settings.font}"), size: ${fontSize}pt)

${twoColumnLayout}

#pagebreak(weak: true)`;
};

export const defaultTemplate: Template = {
    id: 'default',
    name: 'Default',
    description: 'A clean and professional resume template',
    layoutConfig: {
        isTwoColumn: true,
        leftColumnRatio: '7fr',
        rightColumnRatio: '3fr',
        movableSections: ['skills', 'projects', 'languages', 'volunteering']
    },
    parse
};
