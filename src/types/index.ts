export type UserRole = 'ADMIN' | 'MANAGER' | 'FREELANCER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  ownerId: string;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMember {
  id: string;
  projectId: string;
  userId: string;
  role: UserRole;
  joinedAt: Date;
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  authorId: string;
  content: string;
  externalLinks?: string[]; // e.g., GitHub PRs, Figma links
  createdAt: Date;
}

export type ActivityType = 'COMMIT' | 'FILE_UPLOAD' | 'COMMENT' | 'STATUS_CHANGE' | 'MILESTONE_REACHED';

export interface ActivityLog {
  id: string;
  projectId: string;
  userId: string;
  type: ActivityType;
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface AIReport {
  id: string;
  projectId: string;
  summary: string;
  riskLevel: 'GREEN' | 'YELLOW' | 'RED';
  sentimentScore: number;
  detectedInactivity: boolean;
  generatedAt: Date;
}
