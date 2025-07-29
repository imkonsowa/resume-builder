import type { SectionContent, TemplateLayoutConfig } from '~/types/templateConfig';
import {
    convertList,
    ITEMS_SPACING,
    renderTemplateDate,
    renderTemplateDateWithLink,
    renderTemplateSubHeader,
    SECTION_SPACING,
} from './typstUtils';

/**
 * Format section items based on layout configuration
 */
export const formatSectionItems = (
    items: string[],
    config: TemplateLayoutConfig['sections'],
): string => {
    if (config.spacing === 'block' && config.itemSpacing) {
        return items
            .map(item => `#block(above: 0em, below: ${config.itemSpacing})[${item}]`)
            .join('');
    }
    return items.join(config.joinSeparator);
};

/**
 * Format social links based on layout configuration
 */
export const formatSocialLinks = (
    sectionContent: SectionContent[],
    config: TemplateLayoutConfig['socialLinks'],
): string => {
    const linkItems = sectionContent.map(item => item.content || '').filter(Boolean);

    if (config.orientation === 'horizontal') {
        return linkItems.join(config.separator);
    }

    // Vertical layout - use block formatting
    return formatSectionItems(linkItems, {
        spacing: 'block',
        itemSpacing: config.placement === 'sidebar' ? ITEMS_SPACING : '',
        joinSeparator: '',
    });
};

/**
 * Format experience/volunteering items with achievements
 */
export const formatExperienceItems = (
    sectionContent: SectionContent[],
    config: TemplateLayoutConfig,
    fontSize: number,
): string => {
    const formattedItems = sectionContent.map((item) => {
        let content = renderTemplateSubHeader(item.title, fontSize);

        if (item.date || item.content) {
            content += '\n\n';
            const dateAndLinkSection = renderTemplateDateWithLink(
                item.date || '',
                item.content || null,
                fontSize,
            );
            content += dateAndLinkSection;
        }

        if (item.achievements && item.achievements.length > 0) {
            content += '\n\n';
            content += convertList(item.achievements);
        }

        return content;
    });

    // Experience items always join with \n\n for proper spacing (default template style)
    if (config.layout === 'two-column') {
        return formattedItems.join('\n\n');
    }
    return formattedItems.join(config.sections.joinSeparator);
};

/**
 * Format education items with additional info
 */
export const formatEducationItems = (
    sectionContent: SectionContent[],
    config: TemplateLayoutConfig,
    fontSize: number,
): string => {
    const formattedItems = sectionContent.map((item) => {
        let content = renderTemplateSubHeader(item.title, fontSize);

        if (item.date) {
            content += '\n\n';
            content += renderTemplateDate(item.date, fontSize);
        }

        if (item.additionalInfo) {
            content += '\n\n';
            content += item.additionalInfo;
        }

        return content;
    });

    // Education items always join with \n\n for proper spacing (default template style)
    if (config.layout === 'two-column') {
        return formattedItems.join('\n\n');
    }
    return formattedItems.join(config.sections.joinSeparator);
};

/**
 * Format projects items
 */
export const formatProjectsItems = (
    sectionContent: SectionContent[],
    config: TemplateLayoutConfig,
    _fontSize: number,
): string => {
    const formattedItems = sectionContent.map((item) => {
        let content = '';

        if (item.title) {
            content += item.title;
        }

        if (item.content) {
            if (content) content += '\n\n';
            content += item.content;
        }

        return content;
    }).filter(content => content.trim());

    if (config.sections.spacing === 'block' && config.projects.itemSpacing) {
        return formattedItems
            .map(content => `#block(above: 0em, below: ${config.projects.itemSpacing})[${content}]`)
            .join('');
    }

    return formattedItems.join(config.sections.joinSeparator);
};

/**
 * Format certificates items
 */
export const formatCertificatesItems = (
    sectionContent: SectionContent[],
    config: TemplateLayoutConfig,
    _fontSize: number,
): string => {
    const formattedItems = sectionContent.map((item) => {
        let content = '';

        if (item.title) {
            content += item.title;
        }

        if (item.date) {
            const spacing = content ? ' ' : '';
            content += `${spacing}${item.date}`;
        }

        if (item.content) {
            const spacing = content ? `\n${ITEMS_SPACING}` : '';
            content += `${spacing}${item.content}`;
        }

        return content;
    }).filter(content => content.trim() !== '');

    return formattedItems.join(config.sections.joinSeparator);
};

/**
 * Format simple content items (skills, languages)
 */
export const formatSimpleItems = (
    sectionContent: SectionContent[],
    config: TemplateLayoutConfig,
): string => {
    const contentItems = sectionContent.map(item => item.content || '').filter(Boolean);
    return formatSectionItems(contentItems, config.sections);
};

/**
 * Wrap content in section block with header
 */
export const wrapInSectionBlock = (
    headerText: string,
    content: string,
    fontSize: number,
    renderTemplateHeader: (text: string, fontSize: number) => string,
): string => {
    if (!content.trim()) return '';

    return `#block(above: 0em, below: ${SECTION_SPACING})[
${renderTemplateHeader(headerText, fontSize)}

${content}
]`;
};
