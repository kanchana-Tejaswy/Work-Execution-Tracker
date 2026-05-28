# Work Execution Tracker (WET.enterprise)

WET is a production-ready, B2B AI-powered execution accountability platform. Designed for high-performance delivery teams, it transforms vague project updates into structured execution signals, detects behavioral risks (like freelancer ghosting), and provides real-time operational intelligence.

## 🚀 Key Features

- **Execution Intelligence:** Automated risk scoring and behavioral pattern detection powered by a local Ollama AI engine.
- **Audit-Ready Activity Trails:** Immutable logs of every project execution signal with dynamic heatmaps.
- **Operational Dashboard:** Executive-level metrics, global reliability gauges, and predictive delay probabilities.
- **Frictionless Demo Mode:** An isolated, zero-credential guest mode populated with high-fidelity, realistic operational data.
- **Enterprise-Grade UI/UX:** A refined Dark Slate and Indigo design system inspired by industry leaders like Linear and Stripe.

## 🛠 Tech Stack

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, Lucide Icons.
- **Backend:** Supabase (PostgreSQL, Auth, Row Level Security).
- **AI Engine:** Ollama (Llama 3 / Mistral) for secure, local, multi-module execution analysis.

## 🏁 Getting Started

### Prerequisites

- Node.js 18+
- [Supabase](https://supabase.com/) Account & Project
- [Ollama](https://ollama.ai/) installed locally (for AI execution analysis)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd work-execution-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `.env.example` to `.env.local` and populate your Supabase and Ollama configurations:
   ```bash
   cp .env.example .env.local
   ```

4. **Initialize the Database**
   Execute the schema located in `supabase/schema.sql` within your Supabase project's SQL editor to create the necessary tables, triggers, and Row Level Security (RLS) policies.

5. **Pull the AI model**
   Ensure Ollama is running and pull the required model (default is Llama 3):
   ```bash
   ollama pull llama3
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗 Architecture & Project Structure

The codebase is organized following modern SaaS engineering principles:

- `/src/app`: Next.js App Router (Pages, Layouts, API Routes, Global Error/Loading states).
- `/src/components`: Reusable, accessible UI components (Dashboard grids, Modals, Status Badges).
- `/src/services`: Core business logic separated by domain:
  - `ai`: Multi-module analysis (Risk Detector, Reliability Scorer, Update Analyzer).
  - `auth`: Supabase authentication and Guest Mode session handling.
  - `projects`: Project CRUD operations and activity logging.
  - `demo`: High-fidelity mock data generators for Guest Mode.
- `/src/types`: Strict TypeScript definitions matching the database schema.
- `/supabase`: SQL initialization and RLS security policies.

## 🔐 Security & Operations

- **Row Level Security (RLS):** Enforced at the database layer. Users can only read/write data for projects they are explicitly assigned to.
- **Graceful Degradation:** The AI engine and dashboard components handle network timeouts or missing data safely via Suspense boundaries and fallback UI states.
- **Guest Isolation:** The `wet_demo` cookie ensures that demo users interact with a read-only, mocked data environment, preventing database pollution.

## 📈 Deployment (Vercel)

This project is fully optimized for Vercel deployment.
1. Connect your GitHub repository to Vercel.
2. Add the environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) in the Vercel dashboard.
3. Note: The Ollama AI engine requires a hosted endpoint (e.g., AWS, GCP, or a hosted API like OpenAI/Anthropic) for production use. Update `OLLAMA_BASE_URL` accordingly.

## 📄 License

MIT
