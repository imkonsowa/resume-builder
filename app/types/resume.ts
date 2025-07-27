export interface Experience {
    company: string;
    position: string;
    location: string;
    companyUrl?: string;
    startDate: string;
    endDate: string;
    isPresent?: boolean;
    achievements: Array<{ text: string }>;
}

export interface Education {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    location: string;
    startDate: string;
    endDate: string;
    isPresent?: boolean;
    description: string;
    graduationScore?: string;
}

export interface Volunteering {
    organization: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    isPresent?: boolean;
    achievements: Array<{ text: string }>;
}

export interface SkillItem {
    title: string;
    description: string;
}

export interface SocialLink {
    platform: string;
    url: string;
    customLabel?: string;
}

export interface Project {
    title: string;
    url: string;
    description: string;
}

export interface Language {
    name: string;
    proficiency: string;
}

export interface SectionOrder {
    summary: number;
    experience: number;
    education: number;
    skills: number;
    volunteering: number;
    socialLinks: number;
    projects: number;
    languages: number;
}

export interface TemplateLayoutConfig {
    isTwoColumn: boolean;
    leftColumnRatio?: string;
    rightColumnRatio?: string;
    movableSections?: string[];
}

export interface SectionPlacement {
    skills: 'left' | 'right';
    projects: 'left' | 'right';
    volunteering: 'left' | 'right';
    languages: 'left' | 'right';
}

export interface SectionHeaders {
    personalInfo: string;
    profile: string;
    info: string;
    socialLinks: string;
    projects: string;
    languages: string;
    experience: string;
    education: string;
    skills: string;
    volunteering: string;
}

export interface ResumeData {
    version: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    location: string;
    summary: string;

    experiences: Experience[];
    education: Education[];
    volunteering: Volunteering[];
    skills: SkillItem[];
    socialLinks: SocialLink[];
    projects: Project[];
    languages: Language[];

    technicalSkills: string;
    softSkills: string;

    sectionOrder: SectionOrder;
    sectionHeaders: SectionHeaders;
    sectionPlacement: SectionPlacement;
}

export interface Resume {
    id: string;
    name: string;
    data: ResumeData;
    createdAt: string;
    updatedAt: string;
}

export interface MultiResumeState {
    resumes: Record<string, Resume>;
    activeResumeId: string | null;
    nextId: number;
}

export interface AppSettings {
    selectedFont: string;
    selectedTemplate: string;
    isRawMode: boolean;
    showDownloadMenu: boolean;
    showFontMenu: boolean;
    showTemplateMenu: boolean;
    fontSize: number;
}

export const defaultResumeData: ResumeData = {
    version: 'v1',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    location: '',
    summary: '',
    experiences: [],
    education: [],
    volunteering: [],
    skills: [],
    socialLinks: [],
    projects: [],
    languages: [],
    technicalSkills: '',
    softSkills: '',
    sectionOrder: {
        summary: 0,
        education: 1,
        experience: 2,
        skills: 3,
        volunteering: 4,
        socialLinks: 5,
        projects: 6,
        languages: 7
    },
    sectionHeaders: {
        personalInfo: 'Personal Information',
        profile: 'Profile',
        info: 'Info',
        socialLinks: 'Links',
        projects: 'Projects',
        languages: 'Languages',
        experience: 'Employment History',
        education: 'Education',
        skills: 'Skills',
        volunteering: 'Volunteering'
    },
    sectionPlacement: {
        skills: 'right',
        projects: 'right',
        volunteering: 'right',
        languages: 'right'
    }
};

export const defaultAppSettings: AppSettings = {
    selectedFont: 'Calibri',
    selectedTemplate: 'default',
    isRawMode: false,
    showDownloadMenu: false,
    showFontMenu: false,
    showTemplateMenu: false,
    fontSize: 14
};

export const availableFonts = [
    {name: 'Calibri', family: 'Calibri'},
    {name: 'Geist', family: 'Geist'},
    {name: 'Roboto', family: 'Roboto'}
];

export const availableTemplates = [
    {
        id: 'default',
        name: 'Default',
        description: 'Optimal for one or two pages resumes'
    },
    {
        id: 'compact',
        name: 'Compact',
        description: 'Single column template for longer resumes'
    }
];
