/**
 * DATABASE SCHEMA DESIGN (Conceptual)
 * 
 * Users
 * - id: uuid (PK)
 * - email: string (unique)
 * - name: string
 * - role: enum (ADMIN, MANAGER, FREELANCER)
 * - created_at: timestamp
 * 
 * Projects
 * - id: uuid (PK)
 * - name: string
 * - description: text
 * - status: enum (PLANNING, ACTIVE, ON_HOLD, COMPLETED, CANCELLED)
 * - owner_id: uuid (FK -> Users.id)
 * - start_date: timestamp
 * - end_date: timestamp
 * - created_at: timestamp
 * 
 * Project_Members
 * - id: uuid (PK)
 * - project_id: uuid (FK -> Projects.id)
 * - user_id: uuid (FK -> Users.id)
 * - role: enum (MANAGER, FREELANCER)
 * - joined_at: timestamp
 * 
 * Project_Updates
 * - id: uuid (PK)
 * - project_id: uuid (FK -> Projects.id)
 * - author_id: uuid (FK -> Users.id)
 * - content: text
 * - external_links: jsonb (array of strings)
 * - created_at: timestamp
 * 
 * Activity_Logs
 * - id: uuid (PK)
 * - project_id: uuid (FK -> Projects.id)
 * - user_id: uuid (FK -> Users.id)
 * - type: enum (COMMIT, FILE_UPLOAD, COMMENT, STATUS_CHANGE, MILESTONE_REACHED)
 * - description: text
 * - metadata: jsonb
 * - created_at: timestamp
 * 
 * AI_Reports
 * - id: uuid (PK)
 * - project_id: uuid (FK -> Projects.id)
 * - summary: text
 * - risk_level: enum (GREEN, YELLOW, RED)
 * - sentiment_score: float
 * - detected_inactivity: boolean
 * - generated_at: timestamp
 */
