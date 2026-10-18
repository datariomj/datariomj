export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'IN_DEVELOPMENT';
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}
