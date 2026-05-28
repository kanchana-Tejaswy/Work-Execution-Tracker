import Link from "next/link";
import { 
  Activity, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Eye, 
  AlertCircle, 
  Clock, 
  BarChart3, 
  CheckCircle2,
  Users,
  BrainCircuit,
  Zap,
  MessageSquare
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background-main selection:bg-primary-accent/30">
      {/* --- NAV BAR --- */}
      <nav className="h-20 glass-panel sticky top-0 z-50 px-8 sm:px-16 flex items-center justify-between border-b-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-accent rounded-xl flex items-center justify-center shadow-soft-glow rotate-3">
            <ShieldCheck className="text-white w-5 h-5" />
          </div>
          <span className="font-black text-2xl tracking-tighter text-text-primary">WET<span className="text-primary-accent">.</span></span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/login" className="text-xs font-black uppercase tracking-[0.2em] text-text-secondary hover:text-primary-accent transition-colors">Audit Login</Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-32 pb-48 px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center animate-fade-in relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel mb-12 shadow-sm border-white/60">
            <Sparkles size={16} className="text-primary-accent animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-accent">Operational Intelligence v1.0</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-text-primary mb-8 leading-[0.95]">
            Track Real Execution.<br/>
            <span className="text-glow">Eliminate Ghosting.</span>
          </h1>
          
          <p className="text-text-secondary text-xl md:text-2xl mb-12 leading-relaxed max-w-2xl mx-auto font-medium opacity-80">
            A human-centric intelligence platform that transforms project updates 
            into calm, verifiable execution signals.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/register" className="btn-accent px-12 py-5 text-base w-full sm:w-auto shadow-2xl hover:scale-105 active:scale-95 transition-all">
              Initiate Workspace
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        
        {/* Abstract organic shapes in background */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-primary-accent/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-warm/5 rounded-full blur-[100px]"></div>
        </div>
      </header>

      {/* --- PROBLEM SECTION --- */}
      <section className="py-32 bg-surface/30 border-y border-surface-border backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-black text-primary-accent uppercase tracking-[0.4em] mb-4">The Execution Crisis</h2>
            <h3 className="text-4xl font-black text-text-primary tracking-tight">Why high-stakes projects fail in silence.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ProblemCard 
              icon={<Eye className="text-primary-warm" size={28} />}
              title="The Visibility Vacuum"
              description="Traditional updates are performative. You're flying blind until a milestone is missed."
            />
            <ProblemCard 
              icon={<AlertCircle className="text-status-error" size={28} />}
              title="Freelancer Ghosting"
              description="Talent disappears without warning, leaving management in reactive chaos. Every hour counts."
            />
            <ProblemCard 
              icon={<Clock className="text-primary-accent" size={28} />}
              title="Communication Fatigue"
              description="Manual check-ins drain energy and create friction. You need signals, not meetings."
            />
          </div>
        </div>
      </section>

      {/* --- EXTRACTION EXAMPLE --- */}
      <section className="py-32 bg-background-main">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-[11px] font-black text-primary-accent uppercase tracking-[0.4em] mb-4">Signal Processing</h2>
            <h3 className="text-4xl font-black text-text-primary tracking-tight">The Precision Extraction Engine</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-8">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-surface-border flex items-center justify-center text-primary-accent shadow-sm">
                  <MessageSquare size={24} />
                </div>
                <h4 className="text-2xl font-black text-text-primary tracking-tight">From Raw Update...</h4>
                <p className="text-text-secondary leading-relaxed font-medium">
                  Traditional updates are messy and performative. We ingest the noise 
                  and find the hard signals buried within.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-2xl border-2 border-dashed border-surface-border italic text-text-secondary text-sm leading-relaxed shadow-sm">
                &quot;Just finished the API refactor for the auth module. Still waiting on the 
                new design specs for the login page, so that&apos;s a bit of a blocker. 
                Everything else looks good, should be 80% done by Friday.&quot;
              </div>
            </div>

            <div className="lg:col-span-2 flex justify-center lg:rotate-0 rotate-90">
              <div className="w-12 h-12 rounded-full bg-primary-accent flex items-center justify-center text-white shadow-soft-glow animate-pulse">
                <ArrowRight size={24} />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="enterprise-card border-primary-accent/20 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <Sparkles size={16} className="text-primary-accent opacity-20" />
                </div>
                
                <div className="space-y-6">
                  <div className="pb-4 border-b border-surface-border">
                    <h4 className="text-sm font-black text-text-primary uppercase tracking-tight flex items-center gap-2">
                      <BrainCircuit size={16} className="text-primary-accent" />
                      Extracted Evidence
                    </h4>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-status-success" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Completed Work</span>
                      </div>
                      <p className="text-xs font-bold text-text-primary pl-6">API Refactor (Auth Module)</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-primary-warm" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Pending / Blockers</span>
                      </div>
                      <p className="text-xs font-bold text-text-primary pl-6">New Design Specs (Login Page)</p>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex items-center gap-2">
                        <Zap size={14} className="text-primary-accent" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Confidence Level</span>
                      </div>
                      <div className="pl-6 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-surface-border rounded-full overflow-hidden">
                          <div className="h-full bg-primary-accent w-[92%]"></div>
                        </div>
                        <span className="text-xs font-black text-primary-accent">92%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-16">Simple execution flow.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <Step 
              number="01"
              title="Create Project"
              description="Define goals, deadlines, and assign your delivery team."
            />
            <Step 
              number="02"
              title="Team Submits"
              description="Freelancers provide brief updates. We track the meta-signals."
            />
            <Step 
              number="03"
              title="AI Analyzes"
              description="The engine generates risk reports and performance scores."
            />
            {/* Connector lines (Desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-[33%] w-[10%] h-px bg-white/20"></div>
            <div className="hidden md:block absolute top-1/2 left-[66%] w-[10%] h-px bg-white/20"></div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="enterprise-card !p-12 bg-background-main border-2 border-primary-accent/10 relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="text-4xl font-extrabold text-text-primary mb-6">Ready to see it in action?</h2>
              <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
                Join agencies and teams using WET to maintain absolute visibility 
                on their most critical projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register" className="btn-accent px-12 py-4 text-base">
                  Create Workspace
                </Link>
              </div>
            </div>
            <Activity className="absolute -bottom-10 -right-10 text-primary-accent opacity-5 w-64 h-64 group-hover:rotate-12 transition-transform duration-1000" />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-surface-border bg-background-main px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 grayscale opacity-50">
            <ShieldCheck size={20} />
            <span className="font-bold text-lg tracking-tight">WET.enterprise</span>
          </div>
          <p className="text-text-muted text-xs font-medium">© 2026 Work Execution Tracker. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">Privacy</Link>
            <Link href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">Terms</Link>
            <Link href="#" className="text-xs text-text-secondary hover:text-text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function IntelligenceMetric({ icon, label, description }: { icon: React.ReactNode, label: string, description: string }) {
  return (
    <div className="flex flex-col gap-3 p-4 bg-background-main rounded-2xl border border-surface-border transition-all hover:border-primary-accent/30 hover:shadow-sm group">
      <div className="p-2 bg-background-white rounded-lg w-fit shadow-sm group-hover:scale-110 transition-transform">{icon}</div>
      <div className="flex flex-col gap-1">
        <h4 className="text-xs font-black uppercase tracking-wider text-text-primary">{label}</h4>
        <p className="text-[10px] text-text-secondary leading-tight font-medium">{description}</p>
      </div>
    </div>
  );
}

function ProblemCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-background-white p-8 rounded-xl border border-surface-border shadow-subtle hover:border-text-muted/30 transition-all group">
      <div className="mb-6 p-3 bg-background-main rounded-lg w-fit group-hover:scale-110 transition-transform">{icon}</div>
      <h4 className="text-lg font-bold text-text-primary mb-3">{title}</h4>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureItem({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 mt-1">
        <CheckCircle2 className="text-status-success" size={20} />
      </div>
      <div>
        <h4 className="text-base font-bold text-text-primary">{title}</h4>
        <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function Step({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-black text-white/10 select-none">{number}</div>
      <h4 className="text-lg font-bold">{title}</h4>
      <p className="text-white/60 text-sm leading-relaxed max-w-[200px]">{description}</p>
    </div>
  );
}
