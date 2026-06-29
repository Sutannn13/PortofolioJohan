// ─────────────────────────────────────────────
// Portfolio Data Types
// ─────────────────────────────────────────────

export interface PersonalInfo {
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    tagline: string;
    bio: string;
    shortBio: string;
    email: string;
    location: string;
    availableForWork: boolean;
    profileImage: string;
}

export interface SocialLink {
    id: string;
    label: string;
    url: string;
    icon: string;
}

export interface Skill {
    id: string;
    name: string;
    category: SkillCategory;
    proficiency: number; // 0-100
}

export type SkillCategory =
    | 'frontend'
    | 'backend'
    | 'networking'
    | 'tools'
    | 'database'
    | 'ai'
    | 'other';

export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    techStack: string[];
    imageUrl?: string;
    liveUrl?: string;
    repoUrl?: string;
    featured: boolean;
    category: string;
    award?: string;
    projectType?: 'Real Project' | 'Dummy Project' | 'Research' | 'Organization Website';
    status?: 'Live' | 'In Development' | 'Prototype' | 'Archived';
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string | 'Present';
    description: string;
    highlights: string[];
}

export interface Certificate {
    id: string;
    title: string;
    issuer: string;
    date: string;
    imageUrl?: string;
    credentialUrl?: string;
}


export interface Publication {
    id: string;
    title: string;
    authors: string;
    venue: string;       // journal/conference name
    details?: string;    // e.g. "Vol. 11, No. 3, pp. 661–668"
    year: string;
    indexing?: string;   // e.g. "SINTA 2"
    doi?: string;        // full DOI URL
}

export interface NavItem {
    id: string;
    label: string;
    href: string;
}

export interface PortfolioData {
    personal: PersonalInfo;
    socials: SocialLink[];
    skills: Skill[];
    projects: Project[];
    experiences: Experience[];
    certificates: Certificate[];
    publications?: Publication[];
    navigation: NavItem[];
}

export interface ContactMessage {
    name: string;
    username: string;
    body: string;
    img: string;
}
