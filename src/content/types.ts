export type Locale = "pt" | "en";
export type L = Record<Locale, string>;
export const l = (pt: string, en: string): L => ({ pt, en });

export type ProjectCategoryId =
  | "producao"
  | "pesquisa"
  | "infraestrutura"
  | "embedded-iot"
  | "robotica"
  | "software";

export interface ProjectCategory {
  id: ProjectCategoryId;
  number: string;
  label: L;
}

export interface DiagramNode {
  id: string;
  label: string;
  sublabel?: string;
}

export interface DiagramEdge {
  from: string;
  to: string;
}

export interface ProjectDiagram {
  layers: DiagramNode[][];
  edges: DiagramEdge[];
}

export interface Project {
  id: string;
  title: L;
  tagline: L;
  description: L;
  stack: string[];
  role: L;
  status: "production" | "active" | "archived";
  category: ProjectCategoryId;
  highlight?: boolean;
  port?: number;
  githubUrl?: string;
  liveUrl?: string;
  color: string;
  diagram?: ProjectDiagram;
}

export interface SkillItem {
  name: string;
  projectId: string;
}

export interface SkillGroup {
  id: string;
  label: L;
  items: SkillItem[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: L;
  period: L;
  description: L[];
}

export interface InfraNode {
  id: string;
  label: string;
  type: "entry" | "proxy" | "service" | "db" | "monitor" | "security";
  port?: number;
  network?: string;
  children?: string[];
}

export interface Content {
  meta: {
    name: string;
    tagline: L;
    bio: L;
    githubUsername: string;
    linkedinUrl: string;
    whatsapp: string;
    email: string;
    university: L;
  };
  nav: {
    about: L;
    skills: L;
    portfolio: L;
    infra: L;
    contact: L;
  };
  hero: {
    scrollHint: L;
  };
  about: {
    manifesto: L;
    researchTitle: L;
    researchDescription: L;
    downloadCv: L;
  };
  skills: {
    sectionTitle: L;
    sectionSubtitle: L;
    groups: SkillGroup[];
  };
  portfolio: {
    sectionTitle: L;
    sectionSubtitle: L;
    categories: ProjectCategory[];
    projects: Project[];
    viewProject: L;
    techStack: L;
    close: L;
  };
  infra: {
    sectionTitle: L;
    sectionSubtitle: L;
    description: L;
  };
  experience: {
    sectionTitle: L;
    entries: ExperienceEntry[];
  };
  contact: {
    sectionTitle: L;
    cta: L;
    whatsappMsg: L;
    copyEmail: L;
    copied: L;
    footer: L;
    builtWith: L;
  };
}
