import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6 animate-fade-in">
      <div className="w-20 h-20 bg-status-warning/10 rounded-2xl flex items-center justify-center mb-8 shadow-subtle border border-status-warning/20">
        <ShieldAlert className="text-status-warning w-10 h-10" />
      </div>
      
      <h1 className="text-4xl font-extrabold text-text-primary tracking-tight mb-3">
        404 - Page Not Found
      </h1>
      
      <p className="text-text-secondary text-base max-w-md mx-auto mb-10 leading-relaxed">
        The execution pathway you are looking for does not exist or has been archived. 
        Please verify the URL or return to your operational dashboard.
      </p>

      <Link href="/dashboard" className="btn-accent px-8 py-3">
        <ArrowLeft size={18} />
        Return to Dashboard
      </Link>
    </div>
  );
}
