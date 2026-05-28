import { getCurrentUser } from "@/services/users/user.service";
import { UserCircle, ShieldCheck, Mail, Briefcase, Bell } from "lucide-react";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  const profile = (user?.profile || {}) as any;

  return (
    <div className="flex flex-col gap-10 max-w-4xl mx-auto animate-fade-in">
      <div className="border-b border-surface-border pb-10">
        <h1 className="text-4xl font-black tracking-tighter text-text-primary">System Settings</h1>
        <p className="text-text-secondary text-sm font-medium">Manage your professional identity and operational preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="enterprise-card !p-8 flex flex-col items-center text-center gap-4">
            <div className="w-24 h-24 rounded-2xl bg-background-main border-2 border-surface-border flex items-center justify-center text-text-muted">
              <UserCircle size={64} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-text-primary">{profile.full_name || 'Guest User'}</h3>
              <p className="text-xs text-text-secondary font-medium uppercase tracking-widest">{profile.role || 'Contributor'}</p>
            </div>
            {profile.is_demo && (
              <span className="demo-badge">Demo Access</span>
            )}
          </div>

          <div className="enterprise-card bg-background-main border-dashed">
            <h4 className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-4">Security Level</h4>
            <div className="flex items-center gap-2 text-status-success">
              <ShieldCheck size={16} />
              <span className="text-xs font-bold uppercase">Audited Session</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-8">
          <div className="enterprise-card flex flex-col gap-8">
            <h3 className="font-extrabold text-xl tracking-tight text-text-primary">Profile Credentials</h3>
            
            <div className="grid grid-cols-1 gap-6">
              <SettingsField 
                label="Full Identity" 
                value={profile.full_name || 'Guest User'} 
                icon={UserCircle}
              />
              <SettingsField 
                label="Primary Email" 
                value={user?.email || 'demo@wet.enterprise'} 
                icon={Mail}
              />
              <SettingsField 
                label="System Role" 
                value={profile.role || 'manager'} 
                icon={Briefcase}
              />
            </div>

            <div className="pt-6 border-t border-surface-border flex justify-end">
              <button className="btn-accent px-6 py-2.5 text-xs" disabled>
                Update Profile
              </button>
            </div>
          </div>

          <div className="enterprise-card flex flex-col gap-6">
            <h3 className="font-extrabold text-xl tracking-tight text-text-primary">Notification Signals</h3>
            <div className="space-y-4">
              <ToggleField label="AI Risk Alerts" checked={true} />
              <ToggleField label="Project Activity Summaries" checked={true} />
              <ToggleField label="New Delivery Signals" checked={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsField({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">{label}</label>
      <div className="flex items-center gap-3 p-3 bg-background-main border border-surface-border rounded-lg group focus-within:border-primary-accent transition-all">
        <Icon size={16} className="text-text-muted group-focus-within:text-primary-accent" />
        <span className="text-sm font-medium text-text-primary">{value}</span>
      </div>
    </div>
  )
}

function ToggleField({ label, checked }: { label: string, checked: boolean }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div className={`p-1.5 rounded bg-background-main border border-surface-border ${checked ? 'text-primary-accent' : 'text-text-muted'}`}>
          <Bell size={14} />
        </div>
        <span className="text-sm font-semibold text-text-primary">{label}</span>
      </div>
      <div className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${checked ? 'bg-primary-accent' : 'bg-surface-border'}`}>
        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${checked ? 'right-1' : 'left-1'}`}></div>
      </div>
    </div>
  )
}
